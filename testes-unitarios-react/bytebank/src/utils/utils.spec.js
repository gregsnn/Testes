import { calculaNovoSaldo } from ".";

describe('Utils', () => {
  it('Deve aumentar saldo quando realizado um deposito', () => {
    const valores = {
      transacao: 'Depósito',
      valor: 50,
    };
    const saldo = 1000;
    const novoSaldo = calculaNovoSaldo(valores, saldo);

    expect(novoSaldo).toBe(1050);
  })

  it('Deve aumentar saldo quando realizado um deposito', () => {
    const valores = {
      transacao: 'Transferência',
      valor: 50,
    };
    const saldo = 1000;
    const novoSaldo = calculaNovoSaldo(valores, saldo);

    expect(novoSaldo).toBe(950);
  })
});