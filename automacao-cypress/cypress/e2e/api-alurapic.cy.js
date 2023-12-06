describe('Api Alurapic', () => {
  it('Preencher os campos do formulario de login corretamente', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/user/login',
      body: Cypress.env(),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).is.not.empty;
      expect(response.body).to.have.property('id', Cypress.env('id'));
    });
  })

  it('Preencher os campos do formulario de login corretamente', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/inaunschenesik/photos',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).is.not.empty;
      expect(response.body[0]).to.have.property('description', 'teje dito');
    });
  })
})