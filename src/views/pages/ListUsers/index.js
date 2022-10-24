import MaterialTable from "material-table";
import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { AuthContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import { logout } from "../../../services/auth";

import { Container } from "./styles";

function ListagemUser() {
  const { getAllCandidateAsync } = useContext(AuthContext);
  const materialRef = useRef(null);
  const [candidateVote, setCandidateVote] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "nome" },
    { title: "Setor", field: "descriptionSecction" },
  ]);

  const getAllCandidate = async () => {
    try {
      const resp = await getAllCandidateAsync();
      if (resp) {
        setUsers(() => resp);
        return true;
      }
      logout();
      window.location.reload();
    } catch (err) {
      logout();
    }
  };

  const sendVote = async () => {
    try{
      if (candidateVote.length > 3) {
        toast.error("Voce deve selecionar apenas 3 candidatos");
        return false;
      }
      const bodyVote = candidateVote.map((item) => {
        return { matricula: item.matricula.toString() };
      });
      const resp = await api.post("/user/saveVote", {
        votos: bodyVote,
      });
  
    }catch(err){
      console.error(err?.response?.data)
      toast.error(err?.response?.data?.message)
    }
  };

  useEffect(() => {
    getAllCandidate();
  }, []);

  return (
    <Container>
      <MaterialTable
      style={{width:'90%'}}
        columns={columns}
        data={users}
        title="Lista de candidatos"
        onSelectionChange={(rows) => {
          if (rows.length > 3) {
            toast.error("Selecione apenas 3 candidatos");
          }
          setCandidateVote(() => rows);
        }}
        options={{ search: true, actionsColumnIndex: -1, selection: true }}
      />
      <Button
        style={{ width: 100, alignSelf: "flex-start", marginLeft: "15%" }}
        onClick={sendVote}
      >
        Votar
      </Button>
    </Container>
  );
}

export default ListagemUser;
