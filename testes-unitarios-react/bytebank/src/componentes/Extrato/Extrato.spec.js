import { render, screen } from '@testing-library/react';
import Extrato from '.';

describe('Componente Extrato', () => {
  it('Deve renderizar uma lista de transacoes', () => {
    const transacoes = [
      {
        transacao: 'Depósito',
        valor: 100,
      },
    ];
    render(<Extrato transacoes={transacoes} />);

    const listaTransacoes = screen.getByRole('listitem');

    expect(listaTransacoes).toBeInTheDocument();
  });
});
