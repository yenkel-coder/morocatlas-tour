import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder:
          process.env.PLAYWRIGHT_HTML_REPORT ?? "playwright-report",
        open: "never",
      },
    ],
    // Rapport JUnit XML produit quand PLAYWRIGHT_JUNIT est défini
    // (utilisé en CI pour annoter chaque test dans l'interface GitHub Actions).
    ...(process.env.PLAYWRIGHT_JUNIT
      ? ([["junit", { outputFile: process.env.PLAYWRIGHT_JUNIT }]] as const)
      : []),
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5173",
    // Permet de forcer la capture systématique des traces depuis la CI
    // (PLAYWRIGHT_TRACE=on) tout en gardant un défaut local léger.
    trace: (process.env.PLAYWRIGHT_TRACE as
      | "on"
      | "off"
      | "retain-on-failure"
      | "on-first-retry"
      | undefined) ?? "retain-on-failure",
    // Capture systématique d'une capture d'écran et d'une vidéo en cas d'échec,
    // en plus des traces. Les logs console sont attachés via la fixture
    // partagée e2e/fixtures.ts (testInfo.attach).
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "bun run dev",
        url: "http://localhost:5173",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
