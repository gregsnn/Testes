import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hook/useListaParticipantes"
import Rodape from "./Rodape"

jest.mock('../state/hook/useListaParticipantes')

const mockNavigate = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

describe('Rodape', () => {
  let participantes: string[] = []
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  it('Não deve habilitar botao enquanto não exisitirem participantes suficiente', () => {
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button');

    expect(botao).toBeDisabled();
  })

  it('Deve habilitar botao quando existirem participantes suficiente', () => {
    participantes = ['Participante 1', 'Participante 2', 'Participante 3'];
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button');

    expect(botao).toBeEnabled();
  })

  it('Deve redirecionar para a pagina de sorteio quando o botao for clicado', () => {
    participantes = ['Participante 1', 'Participante 2', 'Participante 3'];
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    expect(mockNavigate).toHaveBeenCalledWith('/sorteio');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  })
})