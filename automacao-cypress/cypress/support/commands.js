// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="loginUserName"]').type(username);
  cy.get('[data-test="loginPassword"]').type(password);

  cy.get('[data-test="loginBtn"]').click();
})

Cypress.Commands.add('cadastro', (email, fullName, userName, password) => {
  cy.get('[data-test="register"]').click();

  cy.get('[data-test="email"]').type(email)
  cy.get('[data-test="fullName"]').type(fullName)
  cy.get('[data-test="registerUserName"]').type(userName)
  cy.get('[data-test="registerPassword"]').type(password)

  // await 1 second to avoid duplicate username
  cy.wait(1000)
  cy.get('[data-test="btnRegister"]').click();
})