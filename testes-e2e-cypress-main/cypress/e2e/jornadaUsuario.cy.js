describe('Jornadas de usuário', () => {

  it('Deve permitir que usuario acesse a aplicacao, realize transacao e faca logout', () => {
    cy.visit('/')

    cy.login('gui@email.com', '456789')

    cy.visit('/home')

    cy.getByData('select-opcoes').select('Transferência')
    cy.getByData('input-valor').type('80')
    cy.getByData('realiza-transacao').click()

    cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80')

    cy.getByData('botao-sair').click()

    cy.location('pathname').should('eq', '/')
  });

  it('Deve permitir que usuario se cadastre e acesse a aplicacao', () => {
    cy.visit('/')

    cy.cadastra('Jonas', 'jonas@email.com', '123123')

    cy.login('jonas@email.com', '123123')

    cy.visit('/home')

    cy.getByData('botao-sair').click()

    cy.location('pathname').should('eq', '/')

    cy.deleta('jonas@email.com', '123123')
  });
});
