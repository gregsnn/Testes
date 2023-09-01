import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemErro } from "../state/hook/useMensagemErro";

const Formulario = () => {
    const [nome, setNome] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const listAdd = useAdicionarParticipante();
    const errorMessage = useMensagemErro();

    const adicionarParticipante = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        listAdd(nome);

        setNome('')
        inputRef.current?.focus()
    };

    return (
        <form onSubmit={adicionarParticipante}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Insira os nomes dos participantes"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <button disabled={!nome}>Adicionar</button>
            {errorMessage && <p role="alert">{errorMessage}</p>}
        </form>
    )
}

export default Formulario