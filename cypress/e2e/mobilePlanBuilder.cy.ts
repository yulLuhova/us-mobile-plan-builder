/// <reference types="cypress" />
export {};

describe("Mobile Plan Builder", () => {
  beforeEach(() => {
    cy.intercept("GET", "/mock/pricing.json", { fixture: "pricing.json" }).as("getPricing");
    cy.visit("/");
    cy.wait("@getPricing");
  });

  it("displays app heading", () => {
    cy.get("[data-testid='app-heading']").should("be.visible");
  });

  it("allows selecting options and displays the final price", () => {
    cy.get("[data-testid='data-select']").select("10GB");
    cy.get("[data-testid='talk-select']").select("100_mins");
    cy.get("[data-testid='text-select']").select("500_texts");

    cy.get("[data-testid='final-plan-card']")
      .should("contain", "Data: 10GB")
      .and("contain", "Talk: 100 mins")
      .and("contain", "Text: 500 texts")
      .and("contain", "Total Price: $28");
  });

  it("opens the checkout modal and confirms the plan selection", () => {
    cy.get("[data-testid='checkout-button']").click();
    cy.get("[data-testid='checkout-modal']").should("be.visible");
    cy.get("[data-testid='checkout-modal-header']").should("be.visible");
  });

  it("saves settings and displays reset button", () => {
    cy.get("[data-testid='save-settings-button']").should("be.visible").click();
    cy.get("[data-testid='reset-settings-button']").should("be.visible");
  });

  it("resets settings and displays default value", () => {
    cy.get("[data-testid='data-select']").select("10GB");
    cy.get("[data-testid='save-settings-button']").click();
    cy.get("[data-testid='reset-settings-button']").click();
    cy.get("[data-testid='final-plan-card']").should("contain", "5GB")
  });

  it("cancels the checkout modal", () => {
    cy.get("[data-testid='checkout-button']").click();
    cy.get("[data-testid='checkout-modal']").should("be.visible");
    cy.get("[data-testid='cancel-button']").click();
    cy.get("[data-testid='checkout-modal']").should("not.exist");
  });
});
