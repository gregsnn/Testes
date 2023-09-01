import React from 'react';
import estilos from './Saldo.module.css';
import { ReactComponent as Icone } from './icone-olho.svg';

export default function Saldo({ saldo }) {
  return (
    <div data-testid="saldo" className={estilos.container}>
      <div className={estilos.wrapper}>
        <h2 className={estilos.saldo}>Saldo</h2>
        <Icone />
      </div>
      <div className={estilos.divisor} />
      <p className={estilos.conta}>Conta corrente</p>
      <p className={estilos.valor}>{`R$ ${saldo}`}</p>
    </div>
  );
}
