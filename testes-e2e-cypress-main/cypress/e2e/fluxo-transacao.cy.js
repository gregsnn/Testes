describe('Realizando Fluxo de transacao', () => {
  const deposito = {
    transacao: 'Depósito',
    valor: '10000',
  };

  const transferencia = {
    transacao: 'Transferência',
    valor: '1000',
  };

  it('deve realizar fluxo de transacao corretamente e verificar dados na API', () => {
    cy.fixture("usuarios").as("usuarios");

    cy.get("@usuarios").then((usuarios) => {
      const currentUser = usuarios[0];

      cy.visit('/')
      cy.getByData('botao-login').click()
      cy.getByData('email-input').type(currentUser.email)
      cy.getByData('senha-input').type(currentUser.senha)
      cy.getByData('botao-enviar').click()

      cy.url().should('contain', '/home')

      cy.contains(currentUser.nome).should('be.visible')

      cy.getByData('titulo-boas-vindas').should(
        'contain',
        'Bem vindo de volta!'
      );

      cy.getByData('select-opcoes').select(deposito.transacao)
      cy.getByData('input-valor').type(deposito.valor)
      cy.getByData('realiza-transacao').click()
      cy.getByData('lista-transacoes').find('li').last().should('contain', 'Depósito')
      cy.getByData('lista-transacoes')
        .find('li')
        .eq(-1)
        .find('h3')
        .should('have.text', ' R$ 10000');

      cy.window().then((win) => {
        cy.request({
          method: 'GET',
          url: `http://localhost:8000/transacoes`,
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.lengthOf.at.least(1);
          expect(resposta.body[resposta.body.length - 1]).to.deep.include(
            deposito
          );
        });
      });

      cy.getByData('select-opcoes').select(transferencia.transacao)
      cy.getByData('input-valor').type(transferencia.valor)
      cy.getByData('realiza-transacao').click()
      cy.getByData('lista-transacoes').find('li').last().should('contain', 'Transferência')
      cy.getByData('lista-transacoes')
        .find('li')
        .eq(-1)
        .find('h3')
        .should('have.text', '- R$ 1000');

      cy.window().then((win) => {
        cy.request({
          method: 'GET',
          url: `http://localhost:8000/transacoes`,
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.lengthOf.at.least(1);
          expect(resposta.body[resposta.body.length - 1]).to.deep.include(
            transferencia
          );
        });
      });
    });
  });
});