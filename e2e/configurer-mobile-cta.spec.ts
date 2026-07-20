import { test, expect, devices, Page } from "@playwright/test";

/**
 * Mobile (iPhone 12) — vérifie qu'à chaque changement d'étape du
 * configurateur, le bouton « Suivant » (puis « Vérifier ma demande » à
 * l'étape 7) reste atteignable et cliquable :
 *   - présent dans le DOM, enabled ;
 *   - non masqué par un overlay (hit-test au centre) ;
 *   - atteignable via scroll natif (scrollIntoViewIfNeeded).
 *
 * NB. Sur mobile, le CTA n'est PAS sticky : il vit en bas du panneau de
 * l'étape. À chaque transition d'étape on scrolle d'abord en haut pour
 * simuler l'arrivée d'un utilisateur, puis on s'assure qu'un scroll vers
 * le bas le ramène bien dans le viewport.
 */

test.use({ ...devices["iPhone 12"] });

type StepCase = {
  step: number;
  ctaName: RegExp;
  prepare: (page: Page) => Promise<void>;
};

const STEPS: StepCase[] = [
  { step: 1, ctaName: /^Suivant/i, prepare: async (page) => {
      const today = new Date();
      const dep = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const ret = new Date(today.getTime() + 40 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      await page.getByLabel(/Date d'aller/i).fill(dep);
      await page.getByLabel(/Date de retour/i).fill(ret);
    } },
  { step: 2, ctaName: /^Suivant/i, prepare: async () => { /* adults=2 par défaut */ } },
  { step: 3, ctaName: /^Suivant/i, prepare: async (page) => {
      await page.getByRole("button", { name: /Contemplatif/i }).click();
    } },
  { step: 4, ctaName: /^Suivant/i, prepare: async (page) => {
      await page.getByRole("button", { name: /^Marrakech$/ }).click();
    } },
  { step: 5, ctaName: /^Suivant/i, prepare: async () => { /* étape optionnelle */ } },
  { step: 6, ctaName: /^Suivant/i, prepare: async (page) => {
      await page.getByRole("button", { name: /Riad de charme/i }).click();
    } },
  { step: 7, ctaName: /Vérifier ma demande/i, prepare: async (page) => {
      await page.getByLabel("Nom complet").fill("Camille Dupont");
      await page.getByLabel("Email", { exact: true }).fill("c@example.com");
      await page.getByLabel("Confirmer l'email").fill("c@example.com");
    } },
];

test.describe("Mobile — CTA principal accessible à chaque étape", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("amanta:config");
      localStorage.removeItem("amanta:config:step");
      sessionStorage.removeItem("amanta:seed");
    });
    await page.goto("/configurer");
  });

  test("le CTA reste cliquable et non masqué jusqu'au récapitulatif", async ({ page }) => {
    for (const { step, ctaName, prepare } of STEPS) {
      // 1. Compteur d'étape correct
      const padded = String(step).padStart(2, "0");
      await expect(
        page.getByText(new RegExp(`Étape\\s+${padded}\\s*/\\s*07`, "i")).first()
      ).toBeVisible();

      // 2. Repart du haut pour simuler l'entrée dans une nouvelle étape
      await page.evaluate(() => window.scrollTo(0, 0));

      const cta = page.getByRole("button", { name: ctaName }).last();

      // 3. Présent dans le DOM, visible (display ≠ none) et enabled
      await expect(cta).toBeVisible();
      await expect(cta).toBeEnabled();

      // 4. Atteignable via un scroll natif (échoue si overflow:hidden parent
      //    bloque, ou si le bouton est hors page)
      await cta.scrollIntoViewIfNeeded();

      // 5. Une fois ramené dans le viewport : hit-test au centre — pas de
      //    sticky/footer/overlay qui le recouvre
      const isTopMost = await cta.evaluate((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const top = document.elementFromPoint(cx, cy);
        return el === top || (top != null && el.contains(top));
      });
      expect(isTopMost, "Le CTA ne doit pas être masqué par un overlay").toBe(true);

      // 6. Bbox dans les limites du viewport (vw × vh)
      const inBounds = await cta.evaluate((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        return r.top >= 0 && r.bottom <= window.innerHeight
          && r.left >= 0 && r.right <= window.innerWidth;
      });
      expect(inBounds, "Le CTA doit tenir dans le viewport après scroll").toBe(true);

      // 7. Prépare l'étape puis clique réellement (Playwright effectue ses
      //    propres actionability checks : visible, stable, receives events)
      await prepare(page);
      await cta.click();
    }

    // Récapitulatif atteint
    await expect(
      page.getByRole("heading", { name: /Vérifiez votre voyage avant l'envoi/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Envoyer ma demande/i })
    ).toBeVisible();
  });
});
