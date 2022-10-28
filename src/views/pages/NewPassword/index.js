import React, { useRef, useContext } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { Container, Forms, Body, Image } from "./styles";
import * as Yup from "yup";
import getValidationErrors from "../../../utils/getValidationErrors";
import { AuthContext } from "../../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Background from "../../../assets/background.png";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { getUser } from "../../../services/auth";

function NewPassword() {
  const formRef = useRef(null);
  const history = useHistory();

  const { user } = useContext(AuthContext);
  const handleSubmit = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        password: Yup.string().required("A senha é obrigatoria"),
        passwordConfirmation: Yup.string()
          .required("Password confirmation is required")
          .oneOf([Yup.ref("password"), null], "As senhas não são iguais"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      formRef.current?.setErrors({});
      await api.patch("/auth/updatePassword", {
        matricula: JSON.parse(getUser())?.userName,
        newPassword: data.password,
      });
      toast.success(`Bem vindo, ${JSON.parse(getUser())?.userName}`);
      history.push("/dashboard/users");
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  };

  return (
    <Container>
      <Image src={Background} />
      <Body>
        <h1>Nova senha</h1>
        <span>Insira as informações da nova senha.</span>
        <Forms ref={formRef} onSubmit={handleSubmit}>
          <span>Nova Senha</span>
          <Input
            name="password"
            type="password"
            placeholder="Digite sua nova senha"
          />
          <span>Confirmar nova Senha</span>
          <Input
            name="passwordConfirmation"
            placeholder="Digite novamente a nova senha"
            type="password"
          />
          <Button>Mudar senha</Button>
        </Forms>
      </Body>
    </Container>
  );
}

export default NewPassword;
