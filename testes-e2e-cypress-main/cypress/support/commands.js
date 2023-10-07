Cypress.Commands.add('getByData', (seletor, hasId) => {
  const attribute = hasId ? 'data-testid' : 'data-test';
  return cy.get(`[${attribute}="${seletor}"]`);
});

Cypress.Commands.add('login', (usuario, senha) => {
  cy.session([usuario, senha], () => {
    cy.visit('/')
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type(usuario)
    cy.getByData('senha-input').type(senha)
    cy.getByData('botao-enviar').click()

    cy.url().should('contain', '/home')
  })
})

Cypress.Commands.add('cadastra', (nome, email, senha) => {
  cy.getByData('botao-cadastro').click()
  cy.getByData('nome-input').type(nome)
  cy.getByData('email-input').type(email)
  cy.getByData('senha-input').type(senha)
  cy.getByData('checkbox-input').click().should('be.checked')
  cy.getByData('botao-enviar').click()
})

Cypress.Commands.add('deleta', (email, senha) => {
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/public/deletar',
    body: {
      email: email,
      senha: senha
    }
  })
})