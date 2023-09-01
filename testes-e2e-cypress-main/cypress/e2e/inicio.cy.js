describe('Página inicial', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Deve renderizar corretamente o titulo principal', () => {
    cy.getByData('titulo-principal').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!');
  });

  it('Deve renderizar corretamente o texto da seção de vantagens ', () => {
    cy.textCompare('titulo-vantagens', 'Vantagens do nosso banco');
  });
})