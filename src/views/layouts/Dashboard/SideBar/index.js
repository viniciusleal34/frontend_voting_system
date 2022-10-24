import React from "react";

import { Container, ContainerSide, Menu, LogoContainer } from "./styles";
import { useHistory } from "react-router-dom";
import ButtonList from "../ButtonList";
import { routes } from "../../../../routes";
import Logo from "../../../../assets/logo.jpg";

function Sidebar({ ativado }) {
  const history = useHistory();

  return (
    <Container>
      <ContainerSide>
        <LogoContainer src={Logo} />
        <h4>NAVEGAÇÃO</h4>
        <Menu>
          {routes.protected.map((route, index) => (
            <ButtonList
              isActive={ativado == route.title}
              icon={route.icon}
              title={route.title}
              onClick={() => history.push(route.path)}
            />
          ))}
        </Menu>
      </ContainerSide>
    </Container>
  );
}

export default Sidebar;
