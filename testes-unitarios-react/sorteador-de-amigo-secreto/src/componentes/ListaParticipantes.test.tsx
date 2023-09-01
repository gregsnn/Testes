import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hook/useListaParticipantes"
import ListaParticipantes from "./ListaParticipantes"

jest.mock('../state/hook/useListaParticipantes')

describe('Lista de Participantes', () => {
  let participantes: string[] = []
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  it('Deve retornar lista de participantes vazia', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    const itens = screen.queryAllByRole('listitem')

    expect(itens).toHaveLength(0)
  });

  it('Deve retornar lista de participantes preenchida', () => {
    participantes = ['Participante 1', 'Participante 2'];
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)

    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    const itens = screen.queryAllByRole('listitem')

    expect(itens).toHaveLength(participantes.length)
  })
})