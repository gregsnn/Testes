import { isMobile } from "../support/utils";

describe('Testando multiplas paginas', () => {

  it('Deve conseguir acessa a pagina de cartoes', /*{ browser: 'edge' },*/() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))

    cy.visit('/home')

    cy.url().should('contain', '/home')

    if (isMobile()) {
      cy.getByData('menu-burguer').should('be.visible')
      cy.getByData('menu-burguer').click()

      cy.getByData('menu-lateral').find('a').eq(1).click()

      cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')
    } else {
      cy.getByData('app-home').find('a').eq(1).click()
      cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')

      cy.location('pathname').should('eq', '/home/cartoes')
    }
  })
});
