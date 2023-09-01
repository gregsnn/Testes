import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import App from './paginas/Principal/App';
import AppRoutes from './routes';

describe('Rotas', () => {
  it('Deve renderizar a rota principal', () => {
    render(<App />, {
      wrapper: BrowserRouter,
    });
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });

  it('Deve renderizar a rota cartoes', () => {
    const rota = '/cartoes'
    render(<MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path='cartoes' element={<Cartoes />} />
        </Route>
      </Routes>
    </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');

    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  it('Deve renderizar a localizacao da rota atual', () => {
    const rota = '/cartoes'
    render(<MemoryRouter initialEntries={[rota]}>
      <App />
    </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('local');

    expect(localizacaoAtual).toHaveTextContent(rota);
  });

  it('Deve renderizar a pagina 404', () => {
    const rota = '/extrato';
    render(<MemoryRouter initialEntries={[rota]}>
      <AppRoutes />
    </MemoryRouter>);

    const pagina404 = screen.getByTestId('pagina-404');

    expect(pagina404).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});