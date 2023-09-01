import { realizarSorteio } from "./realizarSorteio";

describe('realizarSorteio', () => {
  it('Nao deve sortear o proprio participante', () => {
    const participantes = [
      'Participante 1',
      'Participante 2',
      'Participante 3',
    ];

    const resultado = realizarSorteio(participantes);

    participantes.forEach((participante) => {
      const amigoSecreto = resultado.get(participante);

      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});