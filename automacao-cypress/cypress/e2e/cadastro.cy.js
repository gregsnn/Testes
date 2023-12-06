import { normalizeUsername } from '../../util';
import CadastroPage from '../support/pages/cadastro/pagina-cadastro';
const { faker } = require('@faker-js/faker');

describe('Cenario feliz de Cadastro', () => {
  it.only('Preencher os campos do formulario de cadastro corretamente', () => {
    CadastroPage.acessarPaginaCadastro();

    CadastroPage.preencherFormularioCadastro(
      faker.internet.email(),
      faker.person.fullName(),
      normalizeUsername(faker.internet.userName()),
      faker.internet.password({ length: 8, alpha: true, numeric: true, special: true })
    )

    cy.wait(1000)
    CadastroPage.clicarBotaoCadastrar();
  })
})

describe('Cenario triste de Cadastro', () => {
  it('Preencher os campos do formulario de cadastro incorretamente', () => {
    cy.visit('http://localhost:4200/#/home')
    cy.get('[data-test="register"]').click();

    cy.get('[data-test="btnRegister"]').click();
    cy.get('[data-test="btnRegister"]').click();

    cy.contains('Email is required').should('be.visible')
    cy.contains('Full name is required').should('be.visible')
    cy.contains('User name is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })
})

describe('Página de cadastro - Teste de stress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  const usuarios = require('../fixtures/usuarios.json')

  usuarios.forEach(usuario => {
    it('Preencher os campos do formulário corretamente para cadastrar um novo usuário', () => {
      cy.get('[data-test="register"]').click();
      cy.get('input[data-test="email"]').type(usuario.email);
      cy.get('input[data-test="fullName"]').type(usuario.fullName);
      cy.get('input[data-test="registerUserName"]').type(usuario.userName);
      cy.get('input[data-test="registerPassword"]').type(usuario.password);
      cy.get('[data-test="btnRegister"]').click();

      cy.url().should('not.include', '/signup');
    })
  })
})
