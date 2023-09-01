Cypress.Commands.add('getByData', (seletor) => {
  return cy.get(`[data-test=${seletor}]`)
});

Cypress.Commands.add('textCompare', (seletor, text) => {
  cy.getByData(seletor).contains(text);
});