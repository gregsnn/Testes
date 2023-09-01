import { useNavigate } from "react-router-dom";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import { useSorteador } from "../state/hook/useSorteador";

const Rodape = () => {

  const participantes = useListaParticipantes();

  const sortear = useSorteador();

  const navegarPara = useNavigate();
  const iniciar = () => {
    sortear();
    navegarPara('/sorteio');
  }

  return (
    <footer className="text-center">
      <button type="button" disabled={participantes.length < 3} onClick={iniciar}>Iniciar brincadeira</button>
    </footer>
  )
};

export default Rodape;