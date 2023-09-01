import userEvent from "@testing-library/user-event";
import mockCategorias from "mocks/categorias";
import { rotaAnuncie, rotaCategoria } from "routes";
import { render, screen } from "test-utils";
import Home from ".";

const mockNavigate = jest.fn();

jest.mock('services/categorias');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Testando Home Page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Anuncie', () => {
    it('Deve redirecionar para pagina anuncie', () => {
      render(<Home />);
      const botaoAnuncie = screen.getByTestId('home-botao-anunciar');

      userEvent.click(botaoAnuncie);

      expect(mockNavigate).toHaveBeenCalledWith(`/${rotaAnuncie}`);
    });
  })

  describe('Categorias', () => {
    it('Deve renderizar com categorias', async () => {
      render(<Home />);
      const categorias = await screen.findAllByTestId('home-categorias');

      expect(categorias).toHaveLength(2);
    });

    it('Deve redirecionar para o :id da categorias', async () => {
      render(<Home />);
      const categorias = await screen.findAllByTestId('home-categorias');
      const primeiraCategoria = categorias[0];

      userEvent.click(primeiraCategoria);

      expect(mockNavigate).toHaveBeenCalledWith(`/${rotaCategoria}/${mockCategorias[0].id}`);
    });
  })
})