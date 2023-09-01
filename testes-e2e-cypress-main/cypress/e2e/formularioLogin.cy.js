describe('Formulário de login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Nao deve permitir email invalido', () => {
    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('emailinvalido@invalido');
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido');
  });

  it('Nao deve permitir campo em branco', () => {
    cy.getByData('botao-login').click();
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório');
  });
});