describe('Formulario de Login', () => {

  it.only('Deve testar fluxo de usuario com fixture', () => {
    cy.fixture('dadosUsuario').then((dadosUsuario) => {
      cy.visit('/')
      cy.getByData('botao-login').click()
      cy.getByData('email-input').type(dadosUsuario.email)
      cy.getByData('senha-input').type(dadosUsuario.senha)
      cy.getByData('botao-enviar').click()

      cy.contains(dadosUsuario.nome).should('be.visible')

      cy.getByData('lista-transacoes').find('li').should('have.length', dadosUsuario.transacoes.length)

      cy.getByData('saldo', true).should('contain', dadosUsuario.saldo)
    })
  })

  it('Deve acessar a pagina home com fixture', () => {
    cy.fixture('usuarios').then((usuarios) => {
      cy.visit('/')
      cy.getByData('botao-login').click()
      cy.getByData('email-input').type(usuarios[0].email)
      cy.getByData('senha-input').type(usuarios[0].senha)
      cy.getByData('botao-enviar').click()

      cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')

      cy.contains(usuarios[0].nome).should('be.visible')
    })
  })

  it('Deve acessar a pagina home', () => {
    cy.login('neilton@alura.com', '123456')

    cy.visit('/home')

    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
  })

  it('Não deve permitir um email inválido', () => {
    cy.visit('/')

    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('neilton@alura')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()

    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  })

  it('Não deve permitir um campo em branco', () => {
    cy.visit('/')

    cy.getByData('botao-login').click()
    cy.getByData('email-input').type(' ')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()

    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  })
})
