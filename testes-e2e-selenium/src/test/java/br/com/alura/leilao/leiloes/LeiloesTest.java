package br.com.alura.leilao.leiloes;

import br.com.alura.leilao.login.LoginPage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LeiloesTest {

    private LeiloesPage paginaDeLeiloes;
    private CadastroLeilaoPage paginaDeCadastroDeLeilao;

    @BeforeEach
    public void beforeEach() {
        LoginPage paginaDeLogin = new LoginPage();
        paginaDeLogin.preencherFormularioDeLogin("fulano", "pass");

        this.paginaDeLeiloes = paginaDeLogin.efetuarLogin();
        this.paginaDeCadastroDeLeilao = paginaDeLeiloes.carregarFormulario();
    }

    @AfterEach
    public void afterEach() {
        this.paginaDeLeiloes.fechar();
    }

    @Test
    public void deveriaCadastrarLeilao() {
        paginaDeCadastroDeLeilao.preencherFormulario("Mochila", "100", "20/07/2020");
        this.paginaDeLeiloes = paginaDeCadastroDeLeilao.submeteFormulario();

        Assertions.assertTrue(this.paginaDeLeiloes.isLeilaoCadastrado("Mochila", "100.00", "20/07/2020"));
    }

    @Test
    public void deveValidarCadastroDeLeilao() {
        paginaDeCadastroDeLeilao.preencherFormulario("", "", "");
        paginaDeCadastroDeLeilao.submeteFormulario();

        Assertions.assertFalse(this.paginaDeCadastroDeLeilao.isPaginaAtual());
        Assertions.assertTrue(this.paginaDeCadastroDeLeilao.isMensagensDeValidacaoVisiveis());
    }
}
