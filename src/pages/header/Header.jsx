import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const store = {
    //state
    progress: useSelector((state) => state["homeReducer"].progress),
  };
  return (
    <React.Fragment>
      <ProgressCont>
        <ProgressBar>
          {store.progress !== 0 && <ProgCurrent progress={store.progress} />}
        </ProgressBar>
        <Progress>
          <div>진행도:</div>
          <div>
            <div>{store.progress}</div>
            <div>/</div>
            <div>14</div>
          </div>
        </Progress>
      </ProgressCont>
    </React.Fragment>
  );
};

export default Header;

const ProgressCont = styled.div`
  width: 95%;
  margin: 60px auto 80px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ProgressBar = styled.div`
  position: relative;

  width: 100%;
  height: 40px;

  border-radius: 15px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border: 5px solid #5a72db;
`;

const ProgCurrent = styled.div`
  position: absolute;
  width: ${(props) => (props.progress / 14) * 100 + "%"};
  height: 40px;

  border-radius: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border: px solid #5a72db;
  background-color: #5ac3db;
`;

const Progress = styled.div`
  width: 40%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;

  gap: 20px;

  font-size: 35px;
  font-weight: bold;

  > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 5px;
  }
`;
