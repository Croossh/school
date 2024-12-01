import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container } from "pages/home/Home";

import {
  selectSecondMenu,
  selectThirdMenu,
  deleteLastMenu,
  deleteAllMenu,
  goToSchedule,
  setProgress,
} from "pages/home/homeSilce";
import { v4 } from "uuid";
import Footer from "pages/footer/Footer";

const AuditoriumHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
    //callback
    goToSchedule: () => {
      dispatch(goToSchedule());
    },
    selectSecondMenu: ({ target }, type) => {
      const { name } = target;
      dispatch(selectSecondMenu({ name, type }));
    },
    selectThirdMenu: ({ target }, type) => {
      const { name } = target;
      dispatch(selectThirdMenu({ name, type }));
    },
    deleteLastMenu: (type) => {
      dispatch(deleteLastMenu({ type }));
    },
    deleteAllMenu: () => {
      dispatch(deleteAllMenu());
    },
    setProgress: (value) => {
      dispatch(setProgress({ value }));
    },
  };

  useEffect(() => {
    if (store.selectShowArray.length === 1) {
      store.setProgress(1);
    } else if (store.selectShowArray.length === 2) {
      store.setProgress(2);
    } else if (store.selectShowArray.length === 3) {
      store.setProgress(3);
    }
  }, [store.selectShowArray.length]);

  return (
    <Container>
      <SelectHeader>
        <SelectContainer>
          {store.selectShowArray.map((item) => {
            return <img key={v4()} src={`${process.env.PUBLIC_URL}/images/${item}.jpg`} alt={""} />;
          })}
        </SelectContainer>
      </SelectHeader>

      {store.selectShowArray.length === 1 && (
        <SelectBody>
          <h1>관람유형을 선택해주세요.</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/auditorium_1.jpg`}
              name={"auditorium_1"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectShowArray");
                navigate(e.target.name);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/auditorium_2.jpg`}
              name={"auditorium_2"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectShowArray");
                navigate(e.target.name);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/auditorium_3.jpg`}
              name={"auditorium_3"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectShowArray");
                navigate(e.target.name);
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectShowArray.length === 2 && (
        <SelectBody>
          <h1>무엇이 있나요?</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/one.jpg`}
              name={"one"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectShowArray");
                navigate(`${store.selectShowArray[1]}/1`);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/two.jpg`}
              name={"two"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectShowArray");
                navigate(`${store.selectShowArray[1]}/2`);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/three.jpg`}
              name={"three"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectShowArray");
                navigate(`${store.selectShowArray[1]}/3`);
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectShowArray.length === 3 && (
        <SelectBody>
          <h1>관람정보를 확인해주세요.</h1>
          <BodyItems>
            <ConfrimItem
              name={"confirm"}
              onClick={(e) => {
                navigate("/schedule/home"); // 나중에
                store.goToSchedule();
              }}
            >
              <div>맞아요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/confirm.png`} alt={""} />
              <div>시간표 예약하기</div>
            </ConfrimItem>
            <ConfrimItem
              onClick={() => {
                // store.deleteAllMenu();
                // navigate("/");
                store.deleteLastMenu("selectShowArray");
                navigate(-1);
              }}
            >
              <div>아니요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt={""} />
              <div>이전으로</div>
            </ConfrimItem>
          </BodyItems>
        </SelectBody>
      )}
      <Footer pageNM={"selectShowArray"} />
    </Container>
  );
};

export default AuditoriumHome;

export const SelectHeader = styled.div`
  width: 90%;
  height: 240px;
  /* margin: 30px 0; */
  border-bottom: 5px solid black;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 270px; */
  gap: 20px;

  > img {
    width: 200px;
  }

  > div {
    width: 193px;
    height: 193px;
    border: 4.5px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    font-size: 60px;
    font-weight: bold;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      font-size: 40px;
      font-weight: bold;
      gap: 10px;

      > img {
        width: 30px;
      }
    }
  }
`;
export const SelectBody = styled.div`
  width: 90%;
  min-height: 670px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    font-size: 50px;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  height: 150px;

  margin-top: auto;
  padding-bottom: 20px;

  > div:first-child {
    width: 30%;
    margin-top: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;

    > img {
      width: 100px;
      cursor: pointer;
    }
  }

  > div:last-child {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    gap: 20px;

    > img {
      cursor: pointer;

      width: 140px;
      border: 3px solid black;
    }
  }
`;

const BodyItems = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  gap: 30px;

  > img {
    width: 260px;
    cursor: pointer;
  }

  > div:first-child {
    border: 3px solid #0679c0;

    &:active {
      background-color: #0679c0;
      color: white;
    }
  }
  > div:last-child {
    border: 3px solid #e05767;

    &:active {
      background-color: #e05767;
      color: white;
    }
  }
`;

const ConfrimItem = styled.div`
  width: 250px;
  height: 350px;

  border-radius: 10px;
  padding: 10px;
  margin: 0 10px;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  cursor: pointer;

  > div:first-child {
    font-size: 30px;
    font-weight: bold;
  }
  > img {
    width: 170px;
    margin: 25px 0;
  }

  > div:last-child {
    font-size: 30px;
    font-weight: bold;
  }
`;
