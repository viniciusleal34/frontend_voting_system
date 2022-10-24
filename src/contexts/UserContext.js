import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { getUser, login } from "../services/auth";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(user));
  }, []);

  const getAllCandidateAsync = async () => {
    try {
      const response = await api.get("/user/all");
      console.log(response.data[0]);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const signIn = async (credenciais) => {
    try {
      const response = await api.post("/auth/signin", credenciais);
      if (response.data?.jwt) {
        if (!response.data.alreadyVote) {
          login(response.data?.jwt, JSON.stringify(response.data));
        }
        setUser(response.data);
        return response.data;
      } else {
        toast.error("Usuário não autorizado");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Ops... Ocorreu um erro");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        getAllCandidateAsync,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
