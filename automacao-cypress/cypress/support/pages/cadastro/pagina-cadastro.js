import { CADASTRO_ELEMENTS } from './elements';

class CadastroPage {
  acessarPaginaCadastro() {
    cy.visit('/');
    cy.get(CADASTRO_ELEMENTS.registerNow).click();
  }

  preencherFormularioCadastro(email, fullName, userName, password) {
    cy.get(CADASTRO_ELEMENTS.email).type(email);
    cy.get(CADASTRO_ELEMENTS.fullName).type(fullName);
    cy.get(CADASTRO_ELEMENTS.registerUserName).type(userName);
    cy.get(CADASTRO_ELEMENTS.registerPassword).type(password);
  }

  clicarBotaoCadastrar() {
    cy.get(CADASTRO_ELEMENTS.btnRegister).click();
  }
}

export default new CadastroPage()