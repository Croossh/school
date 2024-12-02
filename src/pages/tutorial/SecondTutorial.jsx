import styled from "styled-components";
import { TutorialContanier } from "./FirstTutorial";
import React from "react";
import Header from "pages/header/Header";
import Home from "pages/home/Home";
import Footer from "pages/footer/Footer";

const SecondTutorial = ({ onClick }) => {
  return (
    <React.Fragment>
      <TutorialContanier>
        <NextButton onClick={onClick}>
          다음으로<div>→</div>
        </NextButton>
        <Area />
        <Info>
          <div>진행도는 상단에 표시됩니다.</div>
        </Info>
      </TutorialContanier>
      <Header />
      <Home />
      <Footer />
    </React.Fragment>
  );
};

export default SecondTutorial;

const NextButton = styled.button`
  position: relative;
  top: 645px;
  right: -560px;

  width: 400px;
  height: 130px;

  cursor: pointer;

  border-radius: 100px;
  border: 1px solid #5a72db;
  background-color: #5a72db;
  color: white;
  font-size: 50px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Area = styled.div`
  position: relative;
  top: -645px;
  left: 0px;
  width: 1000px;
  height: 100px;

  border: 10px solid red;
`;

const Info = styled.div`
  position: relative;
  top: -630px;
  right: -140px;
  width: 700px;
  height: 100px;

  font-size: 50px;
  font-weight: bold;

  background-color: white;
  border: 5px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */

  padding: 10px;
  gap: 10px;

  > div {
    word-break: keep-all;
  }
`;
