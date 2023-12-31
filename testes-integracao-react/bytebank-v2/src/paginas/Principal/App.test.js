import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";
import App from "./App";

describe("Component App", () => {
  it('Deve permitir adicionar transacao em Extrato', () => {
    render(<App />, {
      wrapper: BrowserRouter,
    });

    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, 'Depósito');
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  it('Deve navegar ate a pagina correspondente ao link clicado', async () => {
    render(<AppRoutes />, {
      wrapper: BrowserRouter,
    })

    const linkPaginaCartoes = screen.getByText('Cartões');

    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);
    const tituloPaginaCartoes = await screen.findByText('Meus cartões');

    expect(tituloPaginaCartoes).toBeInTheDocument();
  });

  it('Deve navegar até a página correspondente ao link clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaInvestimentos = screen.getByText('Investimentos');
    expect(linkPaginaInvestimentos).toBeInTheDocument();

    userEvent.click(linkPaginaInvestimentos);

    const tituloPaginaInvestimentos = await screen.findByText('Renda Fixa');
    expect(tituloPaginaInvestimentos).toBeInTheDocument();
  });

});

