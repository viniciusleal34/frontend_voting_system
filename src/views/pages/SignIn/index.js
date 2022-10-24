import React, { useRef, useContext, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { Container, Forms, Body, Image } from "./styles";
import * as Yup from "yup";
import getValidationErrors from "../../../utils/getValidationErrors";
import { AuthContext } from "../../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { getToken, logout } from "../../../services/auth";
import Background from "../../../assets/background.png";
import { toast } from "react-toastify";

function SignIn() {
  const formRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (getToken() != null) {
      history.push("/dashboard/users");
    }
  }, []);

  const { signIn: login } = useContext(AuthContext);
  const handleSubmit = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        matricula: Yup.string().required("login obrigatório"),
        password: Yup.string().required("Senha obrigatória"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      formRef.current?.setErrors({});
      const resp = await login(data);
      console.log(resp);
      console.log(resp.firstPassword);
      if(resp?.alreadyVote == true){
        toast.success('Você já voto!')
      }
      else if (resp.firstPassword == true) {
        history.push("/new-password");
      } else if (resp) {
        toast.success(`Bem vindo, ${resp?.name}`)
        history.push("/dashboard/users");
      }
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  };

  return (
    <Container>
      <Body>
        <h1>ENTRAR</h1>
        <Forms ref={formRef} onSubmit={handleSubmit}>
          <span>Matricula</span>
          <Input name="matricula" placeholder="Digite sua matricula" />
          <span>Senha</span>
          <Input
            name="password"
            placeholder="Digite sua senha"
            type="password"
          />
          <Button>LOGIN</Button>
        </Forms>
      </Body>
      <Image src={Background} />
    </Container>
  );
}

export default SignIn;
