import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe('Componente Formulario', () => {
    it('Não deve adicionar participantes quando o input estiver vazio', () => {
        // arrange
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        )
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole('button')

        // assert
        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()

    });

    it('Deve adicionar participantes quando o input estiver preenchido', () => {
        // arrange
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        )
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole('button')

        // act
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.click(botao)

        // assert
        // garantir que o input esteja no documento
        expect(input).toHaveFocus()
        expect(input).toHaveValue('')
        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    });

    it('Não deve adicionar nomes duplicados na lista', () => {
        // arrange
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        )
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole('button')

        // act
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.click(botao)
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.click(botao)
        const mensagemErro = screen.getByRole('alert')

        // assert
        expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!')
    });

    it('Deve desaparecer a mensagem de erro apos 3 segundos', () => {
        jest.useFakeTimers()
        // arrange
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        )
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole('button')

        // act
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.click(botao)
        fireEvent.change(input, { target: { value: 'João' } })
        fireEvent.click(botao)
        let mensagemErro = screen.queryByRole('alert')

        // assert
        expect(mensagemErro).toBeInTheDocument()

        // act
        act(() => {
            jest.runAllTimers()
        })
        mensagemErro = screen.queryByRole('alert')

        // act
        expect(mensagemErro).toBeNull()
    });
});