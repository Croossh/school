import React, { useEffect, useState } from "react";
import "./App.css";
import Router from "./router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Footer from "pages/footer/Footer";
import FirstTutorial from "pages/tutorial/FirstTutorial";
import SecondTutorial from "pages/tutorial/SecondTutorial";
import ThirdTutorial from "pages/tutorial/ThirdTutorial";

function App() {
  const navigate = useNavigate();
  const [tuto, setTuto] = useState({
    first: false,
    second: false,
    third: false,
  });

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
  };

  const changeTuto = (idx) => {
    const tmp = { ...tuto };
    tmp[idx] = true;
    setTuto(tmp);
  };

  const firstState = !tuto.first;
  const secondState = tuto.first && !tuto.second;
  const thirdState = tuto.first && tuto.second && !tuto.third;
  const lastState = tuto.first && tuto.second && tuto.third;

  useEffect(() => {
    if (!store.selectShowArray.length > 0) {
      navigate("/");
    }
  }, []);

  return (
    <Contanier className="App">
      {/* {firstState && <FirstTutorial onClick={() => changeTuto("first")} />}
      {secondState && <SecondTutorial onClick={() => changeTuto("second")} />}
      {thirdState && <ThirdTutorial onClick={() => changeTuto("third")} />}
      {lastState && ( */}
      <React.Fragment>
        <Header />
        <Router />
        <Footer />
      </React.Fragment>
      {/* )} */}
    </Contanier>
  );
}

export default App;

const Contanier = styled.div`
  width: 1000px;
  height: 100%;
  margin: 20px auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;
