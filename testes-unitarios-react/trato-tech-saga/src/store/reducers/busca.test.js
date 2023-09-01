import buscaReducer, { mudarBusca, resetarBusca } from './busca'

describe('Testando busca reducer', () => {
  it('Deve mudar busca como esperado', () => {
    expect(buscaReducer('', mudarBusca('teste'))).toEqual('teste')
  })

  it('Deve resetar busca como esperado', () => {
    expect(buscaReducer('outro valor', resetarBusca(''))).toEqual('')
  })
})