import { faker } from '@faker-js/faker';

describe('Atualizacao de Dados do usuario', () => {
  const user = {
    nome: faker.name.fullName(),
    senha: faker.internet.password(),
  }

  it('deve permitir o usuario atualizar seus dados', () => {
    cy.fixture('usuarios').as('usuarios')

    cy.get('@usuarios').then((usuarios) => {
      cy.login(usuarios[0].email, usuarios[0].senha)

      cy.visit('/home')

      cy.url().should('include', '/home')

      cy.contains(usuarios[0].nome).should('be.visible')

      cy.getByData('app-home').find('a').eq(1).click()

      cy.url().should('include', '/minha-conta')

      cy.getByData('botao-salvar-alteracoes').should('be.disabled')

      cy.get('[name="nome"]').type(user.nome)
      cy.get('[name="senha"]').type(user.senha)

      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled')
      cy.getByData('botao-salvar-alteracoes').click()

      cy.on('window:alert', (str) => {
        expect(str).to.equal('Alteracoes salvas com sucesso!')
      })

      cy.url().should('include', '/home')

      cy.window().then((window) => {
        expect(window.localStorage.getItem('nomeUsuario')).to.equal(user.nome)

        const userId = window.localStorage.getItem('userId')

        cy.request('GET', `http://localhost:8000/public/usuarios/${userId}`).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.nome).to.be.equal(user.nome)
          expect(response.body.senha).to.be.equal(user.senha)
        })
      })
    })
  });
});