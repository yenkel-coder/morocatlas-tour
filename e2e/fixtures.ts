import { test as base, expect } from "@playwright/test";
import { promises as fs } from "node:fs";

/**
 * Noms d'attachements standardisés — identiques côté `testInfo.attach`,
 * sur disque (`test-results/<test>/...`) et côté glob d'upload CI
 * (.github/workflows/e2e-playwright.yml). Toute modification ici doit
 * être répercutée sur le workflow et la "Vue par test" du Job Summary.
 */
export const ATTACHMENT_NAMES = {
  console: "console.log",
  network: "network.log",
  screenshot: "failure-screenshot.png",
  html: "page.html",
} as const;

/**
 * Tests dont le titre matche ce regex sont considérés "focus/Tab" :
 * sur échec, on capture uniquement le conteneur des tuiles StatTile au
 * lieu du plein écran pour accélérer l'analyse visuelle.
 */
const FOCUS_TAB_TITLE = /Tab|focus|Échap|OK|tuile/i;

/** Sélecteur des tuiles toggle utilisées dans la suite. */
const TOGGLE_SELECTOR = '[data-stat-tile="true"]';

/**
 * Fixture Playwright partagée :
 * - Capture UNIQUEMENT les erreurs console (`error`) et les `pageerror`,
 *   pour éviter le bruit (log/info/debug/warn ignorés).
 * - Capture les requêtes réseau en échec (status >= 400 ou requestfailed).
 * - Sur échec : screenshot ciblé sur le conteneur des toggles pour les tests
 *   focus/Tab (clip sur la bbox union des tuiles), sinon plein-page.
 * - Le fichier console.log commence par un résumé des erreurs majeures
 *   (compteurs error / pageerror) pour un triage rapide.
 */
export const test = base.extend<{ autoCapture: void }>({
  autoCapture: [
    async ({ page }, use, testInfo) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const networkLines: string[] = [];

      page.on("console", (msg) => {
        // Filtrage strict : seuls `error` (et `assert`, `warning` étant volontairement
        // exclus) sont remontés. Les niveaux log/info/debug/warning sont ignorés.
        if (msg.type() === "error") {
          consoleErrors.push(`[error] ${msg.text()}`);
        }
      });
      page.on("pageerror", (err) => {
        pageErrors.push(`[pageerror] ${err.name}: ${err.message}`);
      });
      page.on("requestfailed", (req) => {
        networkLines.push(
          `[failed] ${req.method()} ${req.url()} — ${req.failure()?.errorText ?? "unknown"}`,
        );
      });
      page.on("response", (res) => {
        if (res.status() >= 400) {
          networkLines.push(`[${res.status()}] ${res.request().method()} ${res.url()}`);
        }
      });

      await use();

      if (testInfo.status !== testInfo.expectedStatus) {
        const consolePath = testInfo.outputPath(ATTACHMENT_NAMES.console);
        const networkPath = testInfo.outputPath(ATTACHMENT_NAMES.network);
        const screenshotPath = testInfo.outputPath(ATTACHMENT_NAMES.screenshot);

        const summary = [
          "=== Résumé ===",
          `console.error : ${consoleErrors.length}`,
          `pageerror     : ${pageErrors.length}`,
          `total majeur  : ${consoleErrors.length + pageErrors.length}`,
          "==============",
          "",
        ].join("\n");
        const body =
          consoleErrors.length + pageErrors.length === 0
            ? `${summary}(aucune erreur majeure capturée)`
            : `${summary}${[...pageErrors, ...consoleErrors].join("\n")}`;

        await fs.writeFile(consolePath, body);
        await testInfo.attach(ATTACHMENT_NAMES.console, {
          path: consolePath,
          contentType: "text/plain",
        });

        await fs.writeFile(networkPath, networkLines.join("\n") || "(aucune requête en échec)");
        await testInfo.attach(ATTACHMENT_NAMES.network, {
          path: networkPath,
          contentType: "text/plain",
        });

        try {
          const isFocusTab = FOCUS_TAB_TITLE.test(testInfo.title);
          const clip = isFocusTab ? await computeToggleClip(page) : null;

          if (clip) {
            // Screenshot ciblé : juste le conteneur des toggles, avec une
            // marge de 16 px pour donner du contexte visuel.
            await page.screenshot({ path: screenshotPath, clip });
          } else {
            // Test non-focus/Tab ou clip introuvable → fallback plein-page.
            await page.screenshot({ path: screenshotPath, fullPage: true });
          }

          await testInfo.attach(ATTACHMENT_NAMES.screenshot, {
            path: screenshotPath,
            contentType: "image/png",
          });
        } catch {
          // page peut être déjà fermée — on ignore.
        }

        // Snapshot HTML courant : utile pour diagnostiquer les diffs de
        // rendu (markup, attributs ARIA, classes…) sans rejouer le test.
        try {
          const htmlPath = testInfo.outputPath(ATTACHMENT_NAMES.html);
          await fs.writeFile(htmlPath, await page.content());
          await testInfo.attach(ATTACHMENT_NAMES.html, {
            path: htmlPath,
            contentType: "text/html",
          });
        } catch {
          // page peut être déjà fermée — on ignore.
        }
      }
    },
    { auto: true },
  ],
});

/**
 * Calcule la bounding box (avec marge) qui englobe toutes les tuiles
 * StatTile visibles. Renvoie `null` s'il n'y en a pas — l'appelant
 * retombera alors sur un screenshot plein-page.
 */
async function computeToggleClip(page: import("@playwright/test").Page) {
  const PADDING = 16;
  const box = await page.evaluate(
    ({ selector, padding }) => {
      const nodes = Array.from(document.querySelectorAll(selector));
      if (nodes.length === 0) return null;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of nodes) {
        const r = (n as Element).getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        minX = Math.min(minX, r.left);
        minY = Math.min(minY, r.top);
        maxX = Math.max(maxX, r.right);
        maxY = Math.max(maxY, r.bottom);
      }
      if (!Number.isFinite(minX)) return null;
      const x = Math.max(0, Math.floor(minX - padding));
      const y = Math.max(0, Math.floor(minY - padding));
      const width = Math.min(
        document.documentElement.clientWidth - x,
        Math.ceil(maxX - minX + padding * 2),
      );
      const height = Math.min(
        document.documentElement.clientHeight - y,
        Math.ceil(maxY - minY + padding * 2),
      );
      return { x, y, width, height };
    },
    { selector: TOGGLE_SELECTOR, padding: PADDING },
  );
  return box;
}

export { expect };
