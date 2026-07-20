import { test, expect, Page } from "@playwright/test";

/**
 * Pré-remplit l'état du configurateur (étapes 1 à 6 valides) puis charge
 * /configurer. On clique 6 fois sur « Suivant » pour atteindre l'étape 7
 * (Coordonnées) où vit le champ « Confirmer l'email » et son tooltip.
 *
 * Ordre des étapes : 1.Date 2.Voyageurs 3.Rythme 4.Villes 5.Lieux 6.Hébergement 7.Coordonnées.
 */
async function gotoStep7(page: Page) {
  await page.addInitScript(() => {
    const state = {
      destinations: ["Marrakech"],
      places: [],
      month: "Octobre",
      flexibility: "Précise",
      adults: 2,
      children: 0,
      pace: "balanced",
      lodging: "riad",
      name: "",
      email: "",
      emailConfirm: "",
      phone: "",
      message: "",
      consent: false,
    };
    localStorage.setItem("amanta:config", JSON.stringify(state));
    // Toujours repartir de l'étape 1 — le test dépend ensuite de 6× Suivant
    // pour arriver à l'étape 7 (Coordonnées).
    localStorage.removeItem("amanta:config:step");
  });

  await page.goto("/configurer");

  // Avance jusqu'à l'étape 7 (Coordonnées)
  for (let i = 0; i < 6; i++) {
    await page.getByRole("button", { name: /Suivant/i }).click();
  }

  await expect(page.getByRole("heading", { name: /Vos coordonnées/i })).toBeVisible();
}

test.describe("Tooltip ✓/✗ confirmation email — accessibilité clavier", () => {
  test.beforeEach(async ({ page }) => {
    await gotoStep7(page);

    // Saisie d'un couple email/confirmation non concordant pour faire apparaître le ✗
    await page.getByLabel("Nom complet").fill("Camille Dupont");
    await page.getByLabel("Email", { exact: true }).fill("camille@example.com");
    await page.getByLabel("Confirmer l'email").fill("camille@example.fr");
  });

  test("Tab ouvre le tooltip, Tab le ferme et le focus continue (pas de piège)", async ({ page }) => {
    const indicator = page.getByRole("button", { name: /Les emails ne correspondent pas/i });
    const tooltip = page.locator('[role="tooltip"]').filter({ hasText: /domaine diffère/i });

    // État initial : tooltip masqué (opacity-0)
    await expect(indicator).toHaveAttribute("aria-expanded", "false");

    // Focus le champ de confirmation puis Tab pour atteindre l'indicateur
    await page.getByLabel("Confirmer l'email").focus();
    await page.keyboard.press("Tab");

    await expect(indicator).toBeFocused();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");
    await expect(tooltip).toBeVisible();

    // Tab → on quitte l'indicateur, le tooltip se ferme et le focus avance
    await page.keyboard.press("Tab");
    await expect(indicator).not.toBeFocused();
    await expect(indicator).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByLabel("Téléphone (optionnel)")).toBeFocused();
  });

  test("Shift+Tab revient sur l'indicateur et ré-ouvre le tooltip", async ({ page }) => {
    const indicator = page.getByRole("button", { name: /Les emails ne correspondent pas/i });

    await page.getByLabel("Téléphone (optionnel)").focus();
    await page.keyboard.press("Shift+Tab");

    await expect(indicator).toBeFocused();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");
  });

  test("Échap ferme le tooltip et retire le focus", async ({ page }) => {
    const indicator = page.getByRole("button", { name: /Les emails ne correspondent pas/i });

    await indicator.focus();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");

    await expect(indicator).toHaveAttribute("aria-expanded", "false");
    await expect(indicator).not.toBeFocused();
  });

  test("Entrée et Espace n'enferment pas le focus sur l'indicateur", async ({ page }) => {
    const indicator = page.getByRole("button", { name: /Les emails ne correspondent pas/i });

    await indicator.focus();
    await expect(indicator).toBeFocused();

    // Entrée puis Espace : aucun changement de focus, pas de navigation,
    // l'indicateur reste atteignable et le tooltip reste ouvert.
    await page.keyboard.press("Enter");
    await expect(indicator).toBeFocused();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Space");
    await expect(indicator).toBeFocused();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");

    // On peut toujours sortir avec Tab → pas de piège de focus
    await page.keyboard.press("Tab");
    await expect(indicator).not.toBeFocused();
  });

  test("Quand les emails correspondent, le tooltip annonce la correspondance", async ({ page }) => {
    const confirm = page.getByLabel("Confirmer l'email");
    await confirm.fill("");
    await confirm.fill("camille@example.com");

    const indicator = page.getByRole("button", { name: /Les emails correspondent/i });
    await indicator.focus();
    await expect(indicator).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.locator('[role="tooltip"]').filter({ hasText: /Les emails correspondent/i })
    ).toBeVisible();
  });
});
