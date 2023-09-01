import React from 'react';
import estilos from './Cabecalho.module.css';
import avatarUsuario from './avatar.svg';
import { ReactComponent as Logo } from './bytebank.svg';

export default function Cabecalho() {
  return (
    <header data-testid="cabecalho" className={estilos.cabecalho}>
      <div className={estilos.container}>
        <Logo />
        <div className={estilos.usuario}>
          <p>Joana Fonseca Gomes</p>
          <img src={avatarUsuario} alt="Ícone de um avatar de usuário" />
        </div>
      </div>
    </header>
  );
}
