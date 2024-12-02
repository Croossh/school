import styled from "styled-components";
import { TutorialContanier } from "./FirstTutorial";
import React, { useEffect } from "react";
import AuditoriumHome from "pages/auditorium/AuditoriumHome";
import { useDispatch } from "react-redux";
import { selectFirstMenu } from "pages/home/homeSilce";
import Header from "pages/header/Header";
import Footer from "pages/footer/Footer";

const ThirdTutorial = ({ onClick }) => {
  const dispatch = useDispatch();

  const store = {
    //callback
    selectFirstMenu: (name, type) => {
      dispatch(selectFirstMenu({ name, type }));
    },
  };

  useEffect(() => {
    store.selectFirstMenu("first_0", "selectShowArray");
  }, []);

  return (
    <React.Fragment>
      <TutorialContanier>
        <NextButton onClick={onClick}>시작합니다.</NextButton>
        <Area1 />
        <Area2 />
        <Info1>
          <div>{`${"파란 네모 박스는 직원(선생님)의 역할로 학생에게 필요한 정보와 진행을 안내합니다."}`}</div>
        </Info1>
        <Info2>
          <div>{`${"빨간 네모 박스는 학생의 역할로 안내자의 설명에 따라 선택하여 진행합니다."}`}</div>
        </Info2>
      </TutorialContanier>
      <Header />
      <AuditoriumHome />
      <Footer />
    </React.Fragment>
  );
};

export default ThirdTutorial;

const NextButton = styled.button`
  position: relative;
  top: 900px;
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
  top: 10px;
  left: 0px;
  width: 1000px;
  height: 80px;

  border: 10px solid blue;
`;

const Area2 = styled.div`
  position: relative;
  top: 10px;
  left: 0px;
  width: 1000px;
  height: 280px;

  border: 10px solid red;
`;

const Info1 = styled.div`
  position: relative;
  top: -565px;
  right: -140px;
  width: 700px;
  height: 150px;

  font-size: 50px;
  font-weight: bold;

  background-color: white;
  border: 5px solid blue;

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

const Info2 = styled.div`
  position: relative;
  top: -170px;
  right: -140px;
  width: 700px;
  height: 150px;

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
