import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { buscaSaldo } from '../services/saldo';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';
import useSaldo from './useSaldo';

jest.mock('../services/transacoes');
jest.mock('../services/saldo');

const mockSaldo = {
  valor: 100,
};
const mockTransacoes = [
  {
    id: 1,
    tipo: 'Déposito',
    valor: 100,
    data: '10/08/2020',
    mes: 'Novembro',
  },
];

describe('useListaTransacoes', () => {
  it('deve retornar uma lista de transações', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacoes);

    const { result } = renderHook(() => useListaTransacoes());
    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacoes);
  });
});

describe('hooks/useSaldo()', () => {
  test('Deve retornar o saldo e uma função para atualizá-lo', async () => {
    buscaSaldo.mockImplementation(() => mockSaldo.valor);
    const { result } = renderHook(() => useSaldo());

    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockSaldo.valor);
  });
});