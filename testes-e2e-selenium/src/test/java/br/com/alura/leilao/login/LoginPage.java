package br.com.alura.leilao.login;

import br.com.alura.leilao.PageObject;
import br.com.alura.leilao.leiloes.LeiloesPage;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginPage extends PageObject {

	private static final String URL_LOGIN = "http://localhost:8080/login";

	public LoginPage() {
		super(null);
		browser.navigate().to(URL_LOGIN);
	}

	public void preencherFormularioDeLogin(String username, String password) {
		browser.findElement(By.id("username")).sendKeys(username);
		browser.findElement(By.id("password")).sendKeys(password);
	}

	public LeiloesPage efetuarLogin() {
		browser.findElement(By.id("login-form")).submit();
		return new LeiloesPage(browser);
	}

	public String getNomeUsuarioLogado() {
		try {
			return browser.findElement(By.id("usuario-logado")).getText();
		} catch (NoSuchElementException e) {
			return null;
		}
	}

	public boolean isPaginaAtual() {
		return browser.getCurrentUrl().contains(URL_LOGIN);
	}

	public boolean isMensagemDeLoginInvalidoVisivel() {
		return browser.getPageSource().contains("Usuário e senha inválidos");
	}
}
