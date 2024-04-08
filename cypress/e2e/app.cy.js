/* eslint-disable no-undef */

describe("Navigation", () => {
  it("should navigate to the new item page", () => {
    cy.visit("http://localhost:3001/");

    cy.get('a[href*="/es/item"]').click();

    cy.url().should("include", "/item");

    cy.get("h1").contains("Nuevo artículo");
  });
});
