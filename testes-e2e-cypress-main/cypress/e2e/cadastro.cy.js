import { faker } from '@faker-js/faker';

describe('Teste de cadastro de usuario', () => {
  let user;

  beforeEach(() => {
    user = {
      nome: faker.name.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
    }
  })

  it('Deve permitir cadastrar usuario com sucesso', () => {
    cy.visit('/')

    cy.cadastra(user.nome, user.email, user.senha)

    cy.getByData('mensagem-sucesso').should('exist').contains('Usuário cadastrado com sucesso')

    cy.request('GET', 'http://localhost:8000/public/usuarios').then((response) => {
      const usuarios = response.body['usuarios']

      expect(usuarios).to.have.lengthOf.at.least(1)
      expect(usuarios[usuarios.length - 1]).to.deep.include(user)
    })
  })
})