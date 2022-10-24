import React, { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { getUser, logout } from "../../../../services/auth";

import { Container, Content, NamePage, Buscar } from "./styles";

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
        <b>{name}</b>
      </NamePage>
    </Container>
  );
}

export default Header;
