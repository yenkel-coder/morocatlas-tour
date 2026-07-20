/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

/**
 * Suite Cypress équivalente à e2e/toggle-hint-keyboard.spec.ts (Playwright).
 * Vérifie Tab / Entrée / Échap et le retour de focus sur la bonne tuile
 * StatTile du configurateur, étape récap (REVIEW_STEP = 8).
 *
 * Utilise cypress-real-events pour des événements clavier réels
 * (`realPress`) — `cy.type('{tab}')` ne déclenche pas de vraie navigation
 * focus dans Cypress.
 */

const PRELOAD_STATE = {
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

function gotoReviewStep() {
  cy.visit("/configurer", {
    onBeforeLoad(win) {
      win.localStorage.setItem("amanta:config", JSON.stringify(PRELOAD_STATE));
      // Repartir de l'étape 1 — la reprise du parcours pourrait sinon
      // faire sauter les clics sur « Suivant ».
      win.localStorage.removeItem("amanta:config:step");
    },
  });

  // 7 clics sur Suivant pour atteindre l'étape 8 (récap).
  for (let i = 0; i < 7; i++) {
    cy.contains("button", /Suivant/i).click();
  }

  cy.contains("h2", /Vérifiez votre voyage/i).should("be.visible");
}

const tile = (source: "main" | "alternate" | "free") =>
  cy.get(`[data-stat-tile="true"][data-stat-source="${source}"]`);

const closeBtn = () => cy.contains("button", /Fermer le message/i);

describe("Toggle StatTile — accessibilité clavier (Cypress)", () => {
  beforeEach(() => {
    gotoReviewStep();
  });

  it("Tab atteint la tuile, Entrée ouvre le message, focus va sur OK", () => {
    tile("main").focus();
    tile("main").should("be.focused").and("have.attr", "aria-pressed", "false");

    tile("main").realPress("Enter");

    tile("main").should("have.attr", "aria-pressed", "true");
    closeBtn().should("be.focused");
    cy.contains(/Surlignage « Lieux principaux » activé/).should("be.visible");
  });

  it("Échap ferme le message et redonne le focus à la tuile d'origine", () => {
    tile("alternate").focus();
    tile("alternate").realPress("Enter");
    closeBtn().should("be.focused");

    cy.realPress("Escape");

    cy.contains("button", /Fermer le message/i).should("not.exist");
    tile("alternate").should("be.focused").and("have.attr", "aria-pressed", "false");
  });

  it("Entrée sur OK ferme le message et redonne le focus à la tuile", () => {
    tile("main").focus();
    tile("main").realPress("Enter");
    closeBtn().should("be.focused");

    cy.realPress("Enter");

    cy.contains("button", /Fermer le message/i).should("not.exist");
    tile("main").should("be.focused");
  });

  it("Tab depuis OK avance vers l'élément suivant (pas de piège de focus)", () => {
    tile("main").focus();
    tile("main").realPress("Enter");
    closeBtn().should("be.focused");

    cy.realPress("Tab");
    closeBtn().should("not.be.focused");
    // Le message doit rester ouvert : Tab ne ferme pas la zone d'aide.
    closeBtn().should("be.visible");
  });

  it("Bascule entre tuiles : focus revient toujours sur la dernière tuile cliquée", () => {
    tile("main").focus();
    tile("main").realPress("Enter");
    closeBtn().should("be.focused");

    tile("alternate").focus();
    tile("alternate").realPress("Enter");
    closeBtn().should("be.focused");

    cy.realPress("Escape");
    tile("alternate").should("be.focused").and("have.attr", "aria-pressed", "true");
    tile("main").should("have.attr", "aria-pressed", "false");
  });

  it("Précédent puis retour à la récap : focus restauré sur la dernière tuile utilisée", () => {
    tile("free").focus();
    tile("free").realPress("Enter");
    cy.realPress("Escape");
    tile("free").should("be.focused");

    cy.contains("button", /Précédent/i).click();
    cy.contains("button", /Suivant/i).click();

    cy.contains("h2", /Vérifiez votre voyage/i).should("be.visible");
    tile("free").should("be.focused");
  });
});
