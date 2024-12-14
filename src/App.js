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
  const [isBlocked, setIsBlocked] = useState(true);

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
  };

  const tutoArray = [
    "rule_1",
    "progress1_1",
    "progress2_1",
    "teacher_detail_1",
    "studant_detail_1",
    "start_1",
  ];

  useEffect(() => {
    if (!isBlocked) setIsBlocked(true);
    // 페이지가 로드된 후 1초 뒤에 차단 해제
    const timer = setTimeout(() => {
      setIsBlocked(false);
    }, 111);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [next]);

  // 클릭 차단 핸들러
  const handleClick = (event) => {
    if (isBlocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (!store.selectShowArray.length > 0) {
      navigate("/");
    }
  }, []);

  return (
    <Contanier
      className="App"
      onClick={handleClick}
      style={{ pointerEvents: isBlocked ? "none" : "auto" }}
    >
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
            <div style={{ height: "50px" }}></div>
          </React.Fragment>
        )}
      </React.Fragment>
    </Contanier>
  );
}
// <Footer />;

export default App;

const Contanier = styled.div`
  width: 1000px;
  height: 100%;
  margin: 20px auto;

  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;

  user-select: none;
`;

const Tutorial = styled.div`
  width: 1000px;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 1000px;
  }
`;

const NextButton1 = styled.button`
  position: absolute;
  z-index: 99999;

  margin-left: 650px;
  margin-top: 1070px;

  width: 300px;
  height: 130px;

  cursor: pointer;

  border-radius: 100px;
  border: 1px solid #5a72db;
  background-color: #5a72db;
  color: white;
  font-size: 45px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NextButton2 = styled.button`
  position: absolute;
  z-index: 99999;

  margin-left: 360px;
  margin-top: 50px;

  width: 300px;
  height: 130px;

  cursor: pointer;

  border-radius: 100px;
  border: 1px solid #5a72db;
  background-color: #5a72db;
  color: white;
  font-size: 45px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
