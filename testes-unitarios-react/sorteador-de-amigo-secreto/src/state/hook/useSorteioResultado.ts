import { useRecoilValue } from "recoil";
import { resultadoState } from "../atom";

export const useSorteioResultado = () => {
  return useRecoilValue(resultadoState);
}