describe('Formulário Cadastro', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Usuário deve conseguir se cadastrar com sucesso', () => {
    cy.deleta('gui@email.com', '456789')

    cy.cadastra('Gui Lima', 'gui@email.com', '456789')

    cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
  })
})
