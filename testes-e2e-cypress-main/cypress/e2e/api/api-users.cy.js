describe('Realizando requisições para a API', () => {

  context('GET /users', () => {
    it('Deve retornar uma lista de usuários', () => {
      cy.request('GET', 'http://localhost:8000/public/usuarios').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body['usuarios']).length.to.be.greaterThan(1)
      })
    })
  })

  context('GET /users/:id', () => {
    it('Deve retornar um usuário específico', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/public/usuarios/1',
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('nome')
        expect(response.body['nome']).to.eq('Neilton Seguins')
      })
    })

    it('Deve retornar um erro quando o usuário for invalido', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/public/usuarios/109',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body).to.have.property('message')
        expect(response.body['message']).to.eq('Usuário não encontrado')
      })
    })
  })

  context('Interceptando solicitacoes de rede', () => {
    it('Deve interceptar POST /login', () => {
      cy.intercept('POST', '/public/login').as('login')

      cy.visit('/')
      cy.getByData('botao-login').click()
      cy.getByData('email-input').type("neilton@alura.com")
      cy.getByData('senha-input').type("123456")
      cy.getByData('botao-enviar').click()

      cy.wait('@login').then(
        (interceptions) => {
          interceptions.response = {
            statusCode: 200,
            body: {
              success: true,
              message: 'Login bem sucedido!',
            }
          }
        })

      cy.visit('/home')

      cy.getByData('titulo-boas-vindas').should('contain.text', 'Bem vindo de volta!')
    })
  })

  context('Realizando login via API', () => {

    it('Deve permitir login do usuario Neilton', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/public/login',
        body: Cypress.env()
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).is.not.empty
        expect(response.body.user).to.have.property('nome')
        expect(response.body.user['nome']).to.eq('Neilton Seguins')
      })
    })
  })
})
