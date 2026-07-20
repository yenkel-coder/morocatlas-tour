import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

/**
 * Pré-remplit l'état du configurateur (7 étapes valides + consent) puis
 * navigue jusqu'à l'étape de récap (REVIEW_STEP = 8) où vivent les tuiles
 * StatTile et leur message d'aide au toggle.
 *
 * Ordre des étapes : 1.Date 2.Voyageurs 3.Rythme 4.Villes 5.Lieux 6.Hébergement 7.Coordonnées.
 */
async function gotoReviewStep(page: Page) {
  await page.addInitScript(() => {
    const state = {
      destinations: ["Marrakech", "Essaouira"],
      places: [],
      month: "Octobre",
      flexibility: "Précise",
      adults: 2,
      children: 0,
      pace: "balanced",
      lodging: "riad",
      name: "Camille Dupont",
      email: "camille@example.com",
      emailConfirm: "camille@example.com",
      phone: "",
      message: "",
      consent: true,
    };
    localStorage.setItem("amanta:config", JSON.stringify(state));
    // Toujours repartir de l'étape 1 (sinon une reprise précédente
    // ferait sauter les clics sur « Suivant »).
    localStorage.removeItem("amanta:config:step");
  });

  await page.goto("/configurer");

  // Étape 1 → 8 (récap) : 7 clics sur « Suivant »
  for (let i = 0; i < 7; i++) {
    await page.getByRole("button", { name: /Suivant/i }).click();
  }

  await expect(
    page.getByRole("heading", { name: /Vérifiez votre voyage/i }),
  ).toBeVisible();
}

test.describe("Toggle StatTile — accessibilité clavier du message d'aide", () => {
  test.beforeEach(async ({ page }) => {
    await gotoReviewStep(page);
  });

  test("Tab atteint la tuile, Entrée ouvre le message et focus va sur OK", async ({ page }) => {
    const tile = page.locator('[data-stat-tile="true"][data-stat-source="main"]');
    await tile.focus();
    await expect(tile).toBeFocused();
    await expect(tile).toHaveAttribute("aria-pressed", "false");

    await page.keyboard.press("Enter");

    await expect(tile).toHaveAttribute("aria-pressed", "true");
    const closeBtn = page.getByRole("button", { name: /Fermer le message/i });
    await expect(closeBtn).toBeFocused();
    await expect(page.getByText(/Surlignage « Lieux principaux » activé/)).toBeVisible();
  });

  test("Échap ferme le message et redonne le focus à la tuile d'origine", async ({ page }) => {
    const tile = page.locator('[data-stat-tile="true"][data-stat-source="alternate"]');
    await tile.focus();
    await page.keyboard.press("Enter");

    const closeBtn = page.getByRole("button", { name: /Fermer le message/i });
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(closeBtn).toHaveCount(0);
    await expect(tile).toBeFocused();
    await expect(tile).toHaveAttribute("aria-pressed", "false");
  });

  test("Entrée sur OK ferme le message et redonne le focus à la tuile", async ({ page }) => {
    const tile = page.locator('[data-stat-tile="true"][data-stat-source="main"]');
    await tile.focus();
    await page.keyboard.press("Enter");

    const closeBtn = page.getByRole("button", { name: /Fermer le message/i });
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(closeBtn).toHaveCount(0);
    await expect(tile).toBeFocused();
  });

  test("Tab depuis OK avance vers l'élément suivant (pas de piège de focus)", async ({ page }) => {
    const tile = page.locator('[data-stat-tile="true"][data-stat-source="main"]');
    await tile.focus();
    await page.keyboard.press("Enter");

    const closeBtn = page.getByRole("button", { name: /Fermer le message/i });
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(closeBtn).not.toBeFocused();
    // Le message reste ouvert : Tab ne doit pas fermer la zone d'aide.
    await expect(closeBtn).toBeVisible();
  });

  test("Bascule entre tuiles : focus revient toujours sur la dernière tuile cliquée", async ({ page }) => {
    const tileMain = page.locator('[data-stat-tile="true"][data-stat-source="main"]');
    const tileAlt = page.locator('[data-stat-tile="true"][data-stat-source="alternate"]');

    await tileMain.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: /Fermer le message/i })).toBeFocused();

    // Sur la 2ᵉ tuile : on Tab/Shift+Tab depuis OK ne doit pas perdre la cible.
    await tileAlt.focus();
    await page.keyboard.press("Enter");

    const closeBtn = page.getByRole("button", { name: /Fermer le message/i });
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(tileAlt).toBeFocused();
    await expect(tileAlt).toHaveAttribute("aria-pressed", "true");
    await expect(tileMain).toHaveAttribute("aria-pressed", "false");
  });

  test("Précédent puis retour à la récap : focus restauré sur la dernière tuile utilisée", async ({ page }) => {
    const tile = page.locator('[data-stat-tile="true"][data-stat-source="free"]');
    await tile.focus();
    await page.keyboard.press("Enter");

    // Ferme l'aide pour ne pas interférer avec la navigation.
    await page.keyboard.press("Escape");
    await expect(tile).toBeFocused();

    // Recule d'une étape puis revient sur la récap.
    await page.getByRole("button", { name: /Précédent/i }).click();
    await page.getByRole("button", { name: /Suivant/i }).click();

    await expect(
      page.getByRole("heading", { name: /Vérifiez votre voyage/i }),
    ).toBeVisible();
    // La tuile « free » doit reprendre le focus automatiquement.
    await expect(tile).toBeFocused();
  });
});
