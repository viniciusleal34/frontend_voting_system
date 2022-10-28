import MaterialTable from "material-table";
import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { AuthContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import { getUser, logout } from "../../../services/auth";

import { Container } from "./styles";

function ListagemUser() {
  const { getAllCandidateAsync } = useContext(AuthContext);
  const [candidateVote, setCandidateVote] = useState([]);
  const [candidateSelect, setCandidateSelect] = useState(false);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "nome" },
    { title: "Setor", field: "descriptionSecction" },
  ]);

  const getAllCandidate = async () => {
    try {
      const resp = await getAllCandidateAsync();
      const candidatos = resp.filter(item => item.matricula != JSON.parse(getUser()).userName)
      if (candidatos) {
        setUsers(() => candidatos);
        return true;
      }
      logout();
      window.location.reload();
    } catch (err) {
      logout();
    }
  };

  const selectYourself = (value) => {
    if (value) {
      const matricula = JSON.parse(getUser()).userName;
      setCandidateSelect({ matricula });
    } else {
      setCandidateSelect(false);
    }
  };

  const sendVote = async () => {
    try {
      if (candidateVote.length > 2 && candidateSelect != false) {
        toast.error("Voce deve selecionar apenas 3 candidatos");
      } else if (candidateVote.length > 3) {
        toast.error("Voce deve selecionar apenas 3 candidatos");
        return false;
      }
      const bodyVote = candidateVote.map((item) => {
        return { matricula: item.matricula.toString() };
      });
      if (candidateSelect != false) {
        bodyVote.push(candidateSelect);
      } 
      const resp = await api.post("/user/saveVote", {
        votos: bodyVote,
      });
      if (resp.status == 200) {
        toast.success("Seu voto foi armazenado com sucesso!");
        logout()
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      console.error(err?.response?.data);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllCandidate();
  }, []);

  return (
    <Container>
      <header>
        <input
          type="checkbox"
          onChange={(e) => selectYourself(e.target.checked)}
        />
        <div>Votar em mim mesmo</div>
      </header>
      <MaterialTable
        style={{ width: "90%" }}
        columns={columns}
        data={users}
        title="Candidatos"
        onSelectionChange={(rows) => {
          if (candidateSelect != false && rows.length > 2) {
            toast.error("Selecione apenas 3 candidatos");
          } else if (rows.length > 3) {
            toast.error("Selecione apenas 3 candidatos");
          }
          setCandidateVote(() => rows);
        }}
        options={{ search: true, actionsColumnIndex: -1, selection: true }}
        localization={{
          pagination: {
            labelRowsSelect: "Nº de candidatos",
            labelDisplayedRows: "aa",
          },
          toolbar: {
            searchPlaceholder: "Pesquisar",
            nRowsSelected: `${candidateVote.length} candidatos selecionados`,
          },
        }}
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
