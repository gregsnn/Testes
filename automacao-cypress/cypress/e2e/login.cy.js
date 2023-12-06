const { faker } = require('@faker-js/faker');
const { normalizeUsername } = require('../../util');

describe('Pagina login', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  // teste backend, nao eh e2e
  it('Testar status code em caso de login incorreto', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/user/login',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  })

  it('Preencher os campos do formulario de login incorretamente', () => {
    cy.login(' ', ' ');

    cy.contains('User name is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.on('window:alert', (alert) => {
      expect(alert).eq('Invalid user name or password');
    })
  })

  it('Preencher os campos do formulario de login corretamente', () => {
    const username = normalizeUsername(faker.internet.userName());
    const password = faker.internet.password({ length: 8, alpha: true, numeric: true, special: true });

    cy.cadastro(
      faker.internet.email(),
      faker.person.fullName(),
      username,
      password
    );

    cy.url().should('not.include', '/signup');

    cy.login(username, password);

    cy.url().should('include', `/${username}`);
  })
})
