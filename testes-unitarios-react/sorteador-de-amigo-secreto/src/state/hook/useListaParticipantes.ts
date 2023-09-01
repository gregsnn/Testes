import { useRecoilValue } from "recoil";
import { listaParticipanteState } from "../atom";

export const useListaParticipantes = () => {
  return useRecoilValue(listaParticipanteState);
};