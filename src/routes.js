import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  RiUserSettingsLine,
} from "react-icons/ri";
import SignIn from "./views/pages/SignIn";
import { getToken } from "./services/auth";
import ListagemUser from "./views/pages/ListUsers";
import NewPassword from "./views/pages/NewPassword";

export const PrivateRouteFuncionarios = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...{ rest }}
      render={
        (props) =>
          getToken() != null ? (
            <Component {...{ props }} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

export const routes = {
  protected: [
    {
      path: "/dashboard/users",
      title: "Votação",
      description: "Caro Colaborador, chegou a hora de votar nos melhores do ano, você pode votar 3 vezes! Boa sorte !",
      role: [999],
      icon: RiUserSettingsLine,
      component: () => <ListagemUser />,
    },
  ],
  public: [
    {
      path: "/",
      component: () => <SignIn />,
    },
    {
      path: "/new-password",
      component: () => <NewPassword />,
    },
  ],
};
