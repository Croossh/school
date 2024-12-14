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
  const [next, setNext] = useState(0);

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
  };

  const tutoArray = ["rule", "progress1", "progress2", "teacher_detail", "studant_detail", "start"];

  useEffect(() => {
    if (!store.selectShowArray.length > 0) {
      navigate("/");
    }
  }, []);

  console.log(next, tutoArray[next]);

  return (
    <Contanier className="App">
      <React.Fragment>
        {next < 6 && (
          <React.Fragment>
            <Tutorial>
              <img src={`${process.env.PUBLIC_URL}/images/${tutoArray[next]}.png`} alt="" />
            </Tutorial>
            {next < 5 && <NextButton1 onClick={() => setNext(next + 1)}>다음으로</NextButton1>}
            {next === 5 && <NextButton2 onClick={() => setNext(next + 1)}>시작하기</NextButton2>}
          </React.Fragment>
        )}
        {next === 6 && (
          <React.Fragment>
            <Header />
            <Router />
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    </Contanier>
  );
}

export default App;

const Contanier = styled.div`
  width: 1000px;
  height: 100%;
  margin: 20px auto;

  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Tutorial = styled.div`
  width: 1000px;
  /* height: 1500px; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextButton1 = styled.button`
  position: absolute;
  z-index: 99999;

  margin-left: 600px;
  margin-top: 690px;

  width: 200px;
  height: 80px;

  cursor: pointer;

  border-radius: 100px;
  border: 1px solid #5a72db;
  background-color: #5a72db;
  color: white;
  font-size: 30px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NextButton2 = styled.button`
  position: absolute;
  z-index: 99999;

  margin-left: 400px;
  /* /  margin-top: 690px; */

  width: 200px;
  height: 80px;

  cursor: pointer;

  border-radius: 100px;
  border: 1px solid #5a72db;
  background-color: #5a72db;
  color: white;
  font-size: 30px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
