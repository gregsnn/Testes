import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from '.';

describe('Componente Formulario', () => {
  it('Deve renderizar um campo de input', () => {
    render(<Formulario />);
    const input = screen.getByPlaceholderText('Digite um valor');

    expect(input).toBeInTheDocument();
  });

  it('Deve renderizar um campo de input type number', () => {
    render(<Formulario />);
    const input = screen.getByPlaceholderText('Digite um valor');

    expect(input).toHaveAttribute('type', 'number');
  });

  it('Deve renderizar um campo de input que pode ser preenchido', () => {
    const MOCK_VALUE = 50;
    render(<Formulario />);
    const input = screen.getByPlaceholderText('Digite um valor');

    userEvent.type(input, '50');

    expect(input).toHaveValue(MOCK_VALUE);
  });

  it('Deve chamar um evento de onSubmit ao clicar em trasacao', () => {
    const realizarTransacao = jest.fn();
    render(<Formulario realizarTransacao={realizarTransacao} />);
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(realizarTransacao).toHaveBeenCalledTimes(1);
  });

  it('Deve chamar um evento de select em transacao', () => {
    const realizarTransacao = jest.fn();
    const { rerender } = render(<Formulario realizarTransacao={realizarTransacao} />);
    const select = screen.getByRole('combobox');

    // userEvent.selectOptions(select, 'Depósito');

    // expect(select).toHaveValue('Depósito');

    // rerender(<Formulario realizarTransacao={realizarTransacao} />);

    // userEvent.selectOptions(select, 'Transferência');

    // expect(select).toHaveValue('Transferência');

    userEvent.selectOptions(select, ['Depósito']); // simula a ação de selecionar uma opção do select

    expect(
      screen.getByRole('option', { name: 'Selecione um tipo de transação' })
        .selected
    ).toBe(false); // verifica se a opção de selecionar um tipo de transação não foi selecionada
    expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(
      true
    ); // verifica se a opção de depósito foi selecionada
  })
});
