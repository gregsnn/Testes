import { useSetRecoilState } from "recoil";
import { resultadoState } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";
import { useListaParticipantes } from "./useListaParticipantes";

export const useSorteador = () => {

  const participantes = useListaParticipantes();

  const setResultado = useSetRecoilState(resultadoState);

  return () => {
    const resultado = realizarSorteio(participantes);

    setResultado(resultado);
  }
};