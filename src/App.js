import { useEffect } from "react";
import "./App.css";
import Router from "./router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
  };

  // useEffect(() => {
  //   if (!store.selectShowArray.length > 0) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <Contanier className="App">
      <Router />
    </Contanier>
  );
}

export default App;

const Contanier = styled.div`
  width: 1000px;
  height: 95vh;
  margin: auto;
  margin-top: 30px;

  display: flex;
  justify-content: center;
`;
