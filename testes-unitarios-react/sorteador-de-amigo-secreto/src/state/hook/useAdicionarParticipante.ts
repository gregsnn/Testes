import { useRecoilValue, useSetRecoilState } from "recoil";
import { erroState, listaParticipanteState } from "../atom";

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaParticipanteState);
  const list = useRecoilValue(listaParticipanteState);
  const setErro = useSetRecoilState(erroState);

  return (nome: string) => {
    if (list.includes(nome)) {
      setErro('Nomes duplicados não são permitidos!');

      setTimeout(() => {
        setErro('');
      }, 3000);
      
      return;
    }
    
    return setLista((lista) => [...lista, nome]);
  };
};