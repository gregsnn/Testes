describe('Testando dispositivos moveis', () => {

  // context('Resolução de 720p', () => {
  //   beforeEach(() => {
  //     // Roda os testes como se fossem em um monitor de 720p de resolução
  //     cy.viewport(1280, 720)
  //   })

  //   // seu teste aqui
  // })

  // context('Resolução do iphone-5 ', () => {
  //   beforeEach(() => {
  //     // roda os testes como se fossem em um dispositivo com a resolução de um iphone-5
  //     cy.viewport('iphone-5')
  //   })

  //   // seu teste aqui
  // })

  it('Deve existir o menu hamburguer', () => {
    cy.viewport('iphone-5')
    // cy.viewport(550, 750)
    // cy.viewport('iphone-6', 'landscape')

    cy.login('gui@email.com', '456789')

    cy.visit('/home')

    cy.getByData('menu-burguer').click()
    cy.getByData('menu-lateral').find('a').eq(3).click()

    cy.url().should('contain', '/home/investimentos')
  })
})


describe('Menu de navegação burguer icon', () => {
  context('Resolução do iphone xr', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    it('Deve existir um botão menu burguer', () => {
      cy.login('gui@email.com', '456789')

      cy.visit('/home')

      cy.getByData('menu-burguer').should('be.visible');
    });
  });

  context('Resolução do mackbook 15', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
    });

    it('Não deve existir um botão menu burguer', () => {
      cy.login('gui@email.com', '456789')

      cy.visit('/home')

      cy.getByData('menu-burguer').should('not.be.visible')
    });
  });
});

// npx cypress open --config viewportWidth=411,viewportHeight=731
