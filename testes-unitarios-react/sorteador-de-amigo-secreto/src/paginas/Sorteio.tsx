import { useState } from "react";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import { useSorteioResultado } from "../state/hook/useSorteioResultado";

const Sorteio = () => {
  const [participanteAtual, setParticipanteAtual] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');

  const participantes = useListaParticipantes();
  const resultado = useSorteioResultado();

  const sortear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (resultado.has(participanteAtual)) {
      setAmigoSecreto(resultado.get(participanteAtual)!);
    }
  }

  return (
    <section>
      <form onSubmit={sortear}>
        <select
          required
          name="participantes"
          id="participantes"
          placeholder="Selecione o seu nome"
          value={participanteAtual}
          onChange={e => setParticipanteAtual(e.target.value)}
        >
          {participantes.map((participante) => (
            <option key={participante} value={participante}>{participante}</option>
          ))}
        </select>

        <button type="submit">Sortear</button>
      </form>

      {amigoSecreto && (
        <p role="alert"></p>
      )}
    </section>
  );
}

export default Sorteio;