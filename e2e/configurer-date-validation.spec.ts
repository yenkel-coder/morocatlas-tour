import { test, expect, Page } from "@playwright/test";

/**
 * Validation des dates (étape 1 du configurateur).
 *
 * Vérifie chaque règle métier indépendamment :
 *   - dates vides → erreurs inline + CTA bloqué ;
 *   - "Date de retour" désactivée tant que l'aller n'est pas saisi ;
 *   - aller dans le passé → erreur inline + CTA bloqué ;
 *   - retour ≤ aller → erreur inline + CTA bloqué ;
 *   - attribut `min` du retour = J+1 par rapport à l'aller ;
 *   - changer l'aller pour une date ≥ retour réinitialise le retour ;
 *   - dates valides → CTA actif et avance à l'étape 2.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function nextButton(page: Page) {
  return page.getByRole("button", { name: /^Suivant/i });
}

function departureInput(page: Page) {
  return page.getByLabel(/Date d'aller/i);
}

function returnInput(page: Page) {
  return page.getByLabel(/Date de retour/i);
}

async function expectStepCounter(page: Page, n: number) {
  const padded = String(n).padStart(2, "0");
  await expect(
    page.getByText(new RegExp(`Étape\\s+${padded}\\s*/\\s*07`, "i")).first(),
  ).toBeVisible();
}

test.describe("Configurateur — étape 1 : validation des dates", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("amanta:config");
      localStorage.removeItem("amanta:config:step");
      sessionStorage.removeItem("amanta:seed");
    });
    await page.goto("/configurer");
    await expectStepCounter(page, 1);
  });

  test("affiche les erreurs inline quand on quitte un champ vide (blur)", async ({ page }) => {
    // blur sur "Date d'aller" sans saisie → erreur inline
    await departureInput(page).focus();
    await departureInput(page).blur();
    await expect(
      page.locator("#departure-date-error").filter({ hasText: /est requise/i }),
    ).toBeVisible();
  });

  test("clique sur « Suivant » avec dates vides → bloqué + erreur globale", async ({ page }) => {
    await nextButton(page).click();
    // On n'a pas changé d'étape
    await expectStepCounter(page, 1);
    // Erreur globale (panneau d'action)
    await expect(
      page.getByRole("alert").filter({ hasText: /date d'aller/i }).first(),
    ).toBeVisible();
    // Erreur inline présente
    await expect(page.locator("#departure-date-error")).toBeVisible();
  });

  test("« Date de retour » est désactivée tant que l'aller n'est pas saisi", async ({ page }) => {
    await expect(returnInput(page)).toBeDisabled();

    const dep = iso(new Date(Date.now() + 30 * DAY_MS));
    await departureInput(page).fill(dep);

    await expect(returnInput(page)).toBeEnabled();
  });

  test("min de « Date de retour » = lendemain de l'aller", async ({ page }) => {
    const depDate = new Date(Date.now() + 30 * DAY_MS);
    const expectedMin = iso(new Date(depDate.getTime() + DAY_MS));

    await departureInput(page).fill(iso(depDate));
    await expect(returnInput(page)).toHaveAttribute("min", expectedMin);
  });

  test("date d'aller dans le passé → erreur inline + CTA bloqué", async ({ page }) => {
    const past = iso(new Date(Date.now() - 30 * DAY_MS));

    // `fill` contourne le `min` natif → on peut tester la validation applicative.
    await departureInput(page).fill(past);
    await departureInput(page).blur();

    await expect(
      page.locator("#departure-date-error").filter({ hasText: /futur/i }),
    ).toBeVisible();

    // CTA bloque l'avancée
    await nextButton(page).click();
    await expectStepCounter(page, 1);
    await expect(
      page.getByRole("alert").filter({ hasText: /futur/i }).first(),
    ).toBeVisible();
  });

  test("date de retour égale à l'aller → erreur + bloqué", async ({ page }) => {
    const dep = iso(new Date(Date.now() + 30 * DAY_MS));
    await departureInput(page).fill(dep);
    await returnInput(page).fill(dep);
    await returnInput(page).blur();

    await expect(
      page.locator("#return-date-error").filter({ hasText: /après l'aller/i }),
    ).toBeVisible();

    await nextButton(page).click();
    await expectStepCounter(page, 1);
  });

  test("date de retour antérieure à l'aller → erreur + bloqué", async ({ page }) => {
    const dep = iso(new Date(Date.now() + 30 * DAY_MS));
    const ret = iso(new Date(Date.now() + 20 * DAY_MS));

    await departureInput(page).fill(dep);
    await returnInput(page).fill(ret);
    await returnInput(page).blur();

    await expect(
      page.locator("#return-date-error").filter({ hasText: /après l'aller/i }),
    ).toBeVisible();

    await nextButton(page).click();
    await expectStepCounter(page, 1);
  });

  test("changer l'aller pour une date ≥ retour réinitialise le retour", async ({ page }) => {
    const dep1 = iso(new Date(Date.now() + 10 * DAY_MS));
    const ret = iso(new Date(Date.now() + 20 * DAY_MS));
    const dep2 = iso(new Date(Date.now() + 25 * DAY_MS)); // > ret

    await departureInput(page).fill(dep1);
    await returnInput(page).fill(ret);
    await expect(returnInput(page)).toHaveValue(ret);

    await departureInput(page).fill(dep2);
    // Le retour devenu invalide a été remis à vide
    await expect(returnInput(page)).toHaveValue("");
  });

  test("dates valides → CTA actif, avance à l'étape 2", async ({ page }) => {
    const dep = iso(new Date(Date.now() + 30 * DAY_MS));
    const ret = iso(new Date(Date.now() + 40 * DAY_MS));

    await departureInput(page).fill(dep);
    await returnInput(page).fill(ret);

    // Aucune erreur inline
    await expect(page.locator("#departure-date-error")).toHaveCount(0);
    await expect(page.locator("#return-date-error")).toHaveCount(0);

    // Le CTA est bien activé
    const cta = nextButton(page);
    await expect(cta).toBeEnabled();
    await expect(cta).not.toHaveAttribute("aria-disabled", "true");

    await cta.click();
    await expectStepCounter(page, 2);
  });
});
