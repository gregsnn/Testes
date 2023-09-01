import { atom } from 'recoil';

const listaParticipanteState = atom<string[]>({
    key: 'listaParticipanteState',
    default: []
})

const resultadoState = atom<Map<string, string>>({
    key: 'resultadoState',
    default: new Map<string, string>()
})

const erroState = atom<string>({
    key: 'erroState',
    default: ''
})

export { erroState, listaParticipanteState, resultadoState };

