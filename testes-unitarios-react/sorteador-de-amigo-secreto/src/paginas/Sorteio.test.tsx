import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import { useSorteioResultado } from "../state/hook/useSorteioResultado";
import Sorteio from "./Sorteio";

jest.mock('../state/hook/useListaParticipantes')
jest.mock('../state/hook/useSorteioResultado')

describe('Pagina Sorteio', () => {
  let participantes: string[] = ['Ana', 'João', 'Maria']
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })


  it('Deve exibir o amigo secreto de cada usuario', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const opcoes = screen.queryAllByRole('option');

    expect(opcoes).toHaveLength(participantes.length);
  });

  it('Deve exibir o amigo secreto', () => {
    const resultado = new Map([
      ['Participante 1', 'Participante 2'],
      ['Participante 2', 'Participante 3'],
      ['Participante 3', 'Participante 1'],
    ]);
    participantes = ['Participante 1', 'Participante 2', 'Participante 3'];
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    (useSorteioResultado as jest.Mock).mockReturnValue(resultado);

    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const select = screen.getByPlaceholderText('Selecione o seu nome');
    fireEvent.change(select, { target: { value: participantes[0] } });
    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();
  })
});