import { render, screen } from '@testing-library/react';
import Menu from '.';

describe('Componente Menu', () => {
  it('Deve renderizar um link para a pagina inicial', () => {
    render(<Menu />);

    const linkPaginaInicial = screen.getByText('Inicial');

    expect(linkPaginaInicial).toBeInTheDocument();
  });

  it('Deve renderizar uma lista de link', () => {
    render(<Menu />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(4);
  });

  it('Nao deve renderizar o link para a pagina de extrato', () => {
    render(<Menu />);

    const linkExtrato = screen.queryByText('Extrato');

    expect(linkExtrato).not.toBeInTheDocument();
  });

  it('Deve renderizar uma lista de links com a classe link', () => {
    render(<Menu />);

    const links = screen.getAllByRole('link');

    links.forEach((link) => expect(link).toHaveClass('link'));

    expect(links).toMatchSnapshot();
  });
});
