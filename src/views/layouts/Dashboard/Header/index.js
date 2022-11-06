import React from "react";
import { toast } from "react-toastify";
import { getUser, logout } from "../../../../services/auth";

import { Container, Content, NamePage } from "./styles";

function Header({ name, nameUser }) {

  return (
    <Container>
      <Content>
      <h2>
        Olá, {JSON.parse(getUser())?.name}
        </h2>
        <button
          onClick={() => {
            logout();
            toast.success("Deslogado com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }}
        >
          Sair
        </button>
      </Content>
      <NamePage>
        <b>Caro Colaborador, chegou a hora de escolher os destaques do ano, Você pode votar três vezes! Boa Sorte</b>
      </NamePage>
    </Container>
  );
}

export default Header;
