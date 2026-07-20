import { test, expect, Page } from "@playwright/test";

/**
 * Parcours complet du configurateur (7 étapes → récapitulatif).
 *
 * Pour chaque étape :
 *   1. on vérifie le libellé « ÉTAPE NN / 07 » (compteur padStart à 2 chiffres) ;
 *   2. quand l'étape est invalide par défaut, on clique « Suivant » et on
 *      vérifie que l'étape ne change pas et que le message d'erreur s'affiche ;
 *   3. on remplit le minimum requis puis « Suivant » avance bien d'une étape.
 *
 * Couvre la règle : « Suivant n'avance que lorsque la validation passe ».
 */

const STEP_LABELS = [
  "Date souhaitée",
  "Voyageurs",
  "Rythme",
  "Villes à découvrir",
  "Lieux à visiter",
  "Hébergement",
  "Coordonnées",
] as const;

/** Vérifie le compteur d'étape « ÉTAPE NN / 07 » (insensible à la casse). */
async function expectStepCounter(page: Page, n: number) {
  const padded = String(n).padStart(2, "0");
  await expect(
    page.getByText(new RegExp(`Étape\\s+${padded}\\s*/\\s*07`, "i")).first()
  ).toBeVisible();
}

/** Localise le bouton « Suivant » du panneau d'action principal. */
function nextButton(page: Page) {
  return page.getByRole("button", { name: /^Suivant/i });
}

/** Clique « Suivant » et vérifie qu'on reste sur l'étape n + message d'erreur. */
async function expectNextBlocked(page: Page, currentStep: number, errorRegex: RegExp) {
  await nextButton(page).click();
  // L'étape ne doit pas avoir changé
  await expectStepCounter(page, currentStep);
  // Le message d'erreur (role="alert") doit s'afficher
  await expect(page.getByRole("alert").filter({ hasText: errorRegex })).toBeVisible();
}

test.describe("Configurateur — parcours des 7 étapes jusqu'au récapitulatif", () => {
  test.beforeEach(async ({ page }) => {
    // Démarrer avec un état vierge pour exercer la validation à chaque étape.
    await page.addInitScript(() => {
      localStorage.removeItem("amanta:config");
      localStorage.removeItem("amanta:config:step");
      sessionStorage.removeItem("amanta:seed");
    });
    await page.goto("/configurer");
  });

  test("avance étape par étape uniquement lorsque la validation passe", async ({ page }) => {
    // ── Étape 1 : Date souhaitée ─────────────────────────────────────
    await expectStepCounter(page, 1);
    await expect(page.getByRole("heading", { name: STEP_LABELS[0] })).toBeVisible();

    // Dates vides → bloqué
    await expectNextBlocked(page, 1, /date d'aller/i);

    // Saisie d'une date d'aller seulement → bloqué sur la date de retour
    const today = new Date();
    const dep = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const ret = new Date(today.getTime() + 40 * 24 * 60 * 60 * 1000);
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    await page.getByLabel(/Date d'aller/i).fill(iso(dep));
    await expectNextBlocked(page, 1, /date de retour/i);

    await page.getByLabel(/Date de retour/i).fill(iso(ret));
    await nextButton(page).click();

    // ── Étape 2 : Voyageurs ──────────────────────────────────────────
    await expectStepCounter(page, 2);
    await expect(page.getByRole("heading", { name: /Avec qui voyagez-vous/i })).toBeVisible();
    // adults=2 par défaut → déjà valide, on avance directement
    await nextButton(page).click();

    // ── Étape 3 : Rythme ─────────────────────────────────────────────
    await expectStepCounter(page, 3);
    await expect(page.getByRole("heading", { name: /Quel rythme/i })).toBeVisible();
    await expectNextBlocked(page, 3, /rythme de voyage/i);

    await page.getByRole("button", { name: /Contemplatif/i }).click();
    await nextButton(page).click();

    // ── Étape 4 : Villes à découvrir ─────────────────────────────────
    await expectStepCounter(page, 4);
    await expect(page.getByRole("heading", { name: /Quelles villes/i })).toBeVisible();
    await expectNextBlocked(page, 4, /au moins une ville/i);

    await page.getByRole("button", { name: /^Marrakech$/ }).click();
    await page.getByRole("button", { name: /^Fès$/ }).click();
    await nextButton(page).click();

    // ── Étape 5 : Lieux à visiter (optionnel) ────────────────────────
    await expectStepCounter(page, 5);
    await expect(page.getByRole("heading", { name: /Quels lieux/i })).toBeVisible();
    // Optionnel → directement valide. On peut quand même cocher un lieu.
    await page.getByRole("button", { name: /Jardin Majorelle/i }).click();
    await nextButton(page).click();

    // ── Étape 6 : Hébergement ────────────────────────────────────────
    await expectStepCounter(page, 6);
    await expect(page.getByRole("heading", { name: /type d'hébergement/i })).toBeVisible();
    await expectNextBlocked(page, 6, /type d'hébergement/i);

    await page.getByRole("button", { name: /Riad de charme/i }).click();
    await nextButton(page).click();

    // ── Étape 7 : Coordonnées ────────────────────────────────────────
    await expectStepCounter(page, 7);
    await expect(page.getByRole("heading", { name: /Vos coordonnées/i })).toBeVisible();

    // Tout vide → bloqué (nom requis)
    const cta = page.getByRole("button", { name: /Vérifier ma demande/i });
    await cta.click();
    await expectStepCounter(page, 7);
    await expect(page.getByRole("alert").filter({ hasText: /nom est requis/i })).toBeVisible();

    await page.getByLabel("Nom complet").fill("Camille Dupont");
    await cta.click();
    await expect(page.getByRole("alert").filter({ hasText: /email est requis/i })).toBeVisible();

    await page.getByLabel("Email", { exact: true }).fill("camille@example.com");
    await cta.click();
    await expect(page.getByRole("alert").filter({ hasText: /confirmer votre email/i })).toBeVisible();

    // Confirmation non concordante → toujours bloqué
    await page.getByLabel("Confirmer l'email").fill("camille@example.fr");
    await cta.click();
    await expectStepCounter(page, 7);
    await expect(
      page.getByRole("alert").filter({ hasText: /ne correspondent pas/i })
    ).toBeVisible();

    // Correction → on peut enfin atteindre le récapitulatif
    await page.getByLabel("Confirmer l'email").fill("camille@example.com");
    await cta.click();

    // ── Récapitulatif ────────────────────────────────────────────────
    await expect(
      page.getByRole("heading", { name: /Vérifiez votre voyage avant l'envoi/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Envoyer ma demande/i })
    ).toBeVisible();
  });
});
