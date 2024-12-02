import Footer from "pages/footer/Footer";
import Header from "pages/header/Header";
import Home from "pages/home/Home";
import React from "react";
import styled from "styled-components";

const FirstTutorial = ({ onClick }) => {
  return (
    <React.Fragment>
      <TutorialContanier>
        <NextButton onClick={onClick}>
          다음으로<div>→</div>
        </NextButton>
        <Area1 />
        <Info>
          <div>순서에 맞게 진행됩니다.</div>
          <div>총 14단계로 선택, 날짜, 자리, 결제 순 입니다.</div>
        </Info>
      </TutorialContanier>
      <Header />
      <Home />
      <Footer />
    </React.Fragment>
  );
};

export default FirstTutorial;

export const TutorialContanier = styled.div`
  position: absolute;
  width: 1000px;
  height: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-direction: column;

  background-color: #00000000;
`;

const NextButton = styled.button`
  position: relative;
  top: 912px;
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

const Area1 = styled.div`
  position: relative;
  top: 140px;
  left: 195px;

  width: 100px;
  height: 520px;
  transform: scale(2);

  border: 7px solid red;
`;

const Info = styled.div`
  position: relative;
  top: -650px;
  right: -400px;
  width: 540px;
  height: 220px;

  font-size: 50px;
  font-weight: bold;

  background-color: white;
  border: 5px solid red;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding: 10px;
  gap: 10px;

  > div {
    word-break: keep-all;
  }
`;
