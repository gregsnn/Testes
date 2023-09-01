import api from './api';
import { buscaSaldo } from './saldo';
import { buscaTransacoes, salvaTransacao } from './transacoes';

jest.mock('./api');

const mockSaldo = { valor: 50 };
const mockTransacao = [{
  id: 1,
  transacao: 'Déposito',
  valor: '100',
  data: '10/11/2021',
  mes: 'Novembro',
}];

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};
const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};
const mockReq = (res) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: res });
    }, 200);
  });
};

const mockReqError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};


describe('Requisicoes para API', () => {
  afterEach(() => {
    api.get.mockClear();
  });

  it('Deve retornar uma lista de transacoes', async () => {
    api.get.mockImplementation(() => mockReq(mockTransacao));

    const listaTransacoes = await buscaTransacoes();

    expect(listaTransacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes')
  });

  it('Deve retornar uma lista vazia quando a req falhar', async () => {
    api.get.mockImplementation(() => mockReqError());

    const listaTransacoes = await buscaTransacoes();

    expect(listaTransacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes')
  });

  test('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

  test('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });
});

describe('src/services/saldo.js', () => {
  afterEach(() => {
    api.get.mockClear();
  });

  test('Deve retornar o saldo atual', async () => {
    api.get.mockImplementation(() => mockReq(mockSaldo));
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
  test('Deve retornar o saldo de 1000', async () => {
    api.get.mockImplementation(() => mockReqError());
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});