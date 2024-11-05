import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container } from "../home/Home";

import {
  selectSecondMenu,
  selectThirdMenu,
  selectFourthMenu,
  selectFifthMenu,
  deleteLastMenu,
  deleteAllMenu,
  goToSchedule,
  checkArray,
} from "../home/homeSilce";
import { v4 } from "uuid";
import { Bottom, SelectBody, SelectContainer, SelectHeader } from "../auditorium/AuditoriumHome";

const PaymentsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = {
    //state
    // paymenst
    papago: useSelector((state) => state["paymentsReducer"].papago),
    //home
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
    selectScheduleArray: useSelector((state) => state["homeReducer"].selectScheduleArray),
    selectSeatArray: useSelector((state) => state["homeReducer"].selectSeatArray),
    selectPaymentsArray: useSelector((state) => state["homeReducer"].selectPaymentsArray),
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
    selectFourthMenu: ({ target }, type) => {
      const { name } = target;
      dispatch(selectFourthMenu({ name, type }));
    },
    selectFifthMenu: ({ target }, type) => {
      const { name } = target;
      dispatch(selectFifthMenu({ name, type }));
    },
    deleteLastMenu: (type) => {
      dispatch(deleteLastMenu({ type }));
    },
    deleteAllMenu: () => {
      dispatch(deleteAllMenu());
    },
    checkArray: () => {
      dispatch(checkArray());
    },
  };

  // console.log("selectShowArray", store.selectShowArray);
  // console.log("selectScheduleArray", store.selectScheduleArray);
  // console.log("selectSeatArray", store.selectSeatArray);
  // console.log("selectPaymentsArray", store.selectPaymentsArray);

  return (
    <Container>
      <SelectHeader>
        <SelectContainer>
          {store.selectPaymentsArray.map((item, idx) => {
            if (idx === 4) return "";
            return <img key={v4()} src={`${process.env.PUBLIC_URL}/images/${item}.jpg`} alt={""} />;
          })}
        </SelectContainer>
      </SelectHeader>

      {store.selectPaymentsArray.length === 1 && (
        <SelectBody>
          <h1>계산해주세요.</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/fourth_1.jpg`}
              name={"fourth_1"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectPaymentsArray");
                store.selectThirdMenu({ target: { name: "no" } }, "selectPaymentsArray");
                navigate(e.target.name);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/discount.jpg`}
              name={"discount"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectPaymentsArray");
                navigate(e.target.name);
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectPaymentsArray.length === 2 && store.selectPaymentsArray[1] === "discount" && (
        <SelectBody>
          <h1>할인정보를 선택해주세요.</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/discount1.jpg`}
              name={"discount1"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectPaymentsArray");
                navigate(`${store.selectPaymentsArray[1]}/1`);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/discount2.jpg`}
              name={"discount2"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectPaymentsArray");
                navigate(`${store.selectPaymentsArray[1]}/2`);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/fourth_1.jpg`}
              name={"fourth_1"}
              alt={""}
              onClick={(e) => {
                store.selectSecondMenu(e, "selectPaymentsArray");
                store.selectThirdMenu({ target: { name: "no" } }, "selectPaymentsArray");
                navigate(e.target.name);
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectPaymentsArray.length === 3 && (
        <SelectBody>
          <h1>결제 방법을 선택해주세요.</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/credit.jpg`}
              name={"credit"}
              alt={""}
              onClick={(e) => {
                store.checkArray();
                store.selectFourthMenu(e, "selectPaymentsArray");
                navigate(`${store.selectPaymentsArray[1]}/credit`);
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/cash.jpg`}
              name={"cash"}
              alt={""}
              onClick={(e) => {
                store.checkArray();
                store.selectFourthMenu(e, "selectPaymentsArray");
                navigate(`${store.selectPaymentsArray[1]}/cash`);
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectPaymentsArray.length === 4 && (
        <SelectBody2>
          <h1>결제정보를 확인해주세요.</h1>
          <DetailContainer>
            <div>
              <div>관람 정보:</div>
              {store.selectShowArray.map((item, idx) => {
                if (idx === 0) return "";
                return <div key={v4()}>{store.papago.show[item]}</div>;
              })}
            </div>
            <div>
              <div>예약 시간:</div>
              {store.selectScheduleArray.map((item, idx) => {
                if (idx === 0) return "";
                if (idx === 1)
                  return <div key={v4()}>{`${item[0]}월 ${item[1]}일(${item[2]})`}</div>;
                return <div key={v4()}>{store.papago.schedule[item]}</div>;
              })}
            </div>
            <div>
              <div>좌석 정보:</div>
              {store.selectSeatArray.map((item, idx) => {
                if (idx === 0) return "";
                return <div key={v4()}>{item}</div>;
              })}
            </div>
            <div>
              <div>결제 방법:</div>
              {store.selectPaymentsArray.map((item, idx) => {
                if (idx === 0 || idx === 1) return "";
                return <div key={v4()}>{store.papago.payments[item]}</div>;
              })}
            </div>
          </DetailContainer>
          <ConfrimContainer>
            <ConfrimItem
              name={"confirm"}
              onClick={(e) => {
                store.checkArray();
                store.selectFifthMenu({ target: { name: "finish" } }, "selectPaymentsArray");
              }}
            >
              <div>맞아요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/confirm.png`} alt={""} />
              <div>결제하기</div>
            </ConfrimItem>
            <ConfrimItem
              onClick={() => {
                // store.deleteAllMenu();
                // navigate("/");
                store.deleteLastMenu("selectPaymentsArray");
                navigate(-1);
              }}
            >
              <div>아니요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt={""} />
              <div>이전으로</div>
            </ConfrimItem>
          </ConfrimContainer>
        </SelectBody2>
      )}

      {store.selectPaymentsArray.length === 5 && (
        <SelectBody>
          <h1>결제가 완료 되었습니다.</h1>
          <BodyItems>
            <img src={`${process.env.PUBLIC_URL}/images/fourth_2.jpg`} name={"fourth_2"} alt={""} />
          </BodyItems>
          <FinishButton
            onClick={() => {
              store.deleteAllMenu();
              navigate("/");
            }}
          >
            홈으로 돌아가기
          </FinishButton>
        </SelectBody>
      )}

      <Bottom>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/back.png`}
            alt={""}
            onClick={() => {
              store.deleteLastMenu("selectPaymentsArray");
              navigate(-1);
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/home.png`}
            alt={""}
            onClick={() => {
              store.deleteAllMenu();
              navigate("/");
            }}
          />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/sayAgain.png`} alt={""} onClick={() => {}} />
          <img src={`${process.env.PUBLIC_URL}/images/dontKnow.png`} alt={""} onClick={() => {}} />
          <img src={`${process.env.PUBLIC_URL}/images/pancel.png`} alt={""} onClick={() => {}} />
        </div>
      </Bottom>
    </Container>
  );
};

export default PaymentsHome;

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

const SelectBody2 = styled.div`
  width: 90%;
  min-height: 700px;

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

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;

  width: 80%;

  border: 1px solid black;
  border-radius: 10px;

  padding: 17px 15px;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 20px;

    font-size: 25px;
    font-weight: bold;

    > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      gap: 20px;
    }
  }
`;

const ConfrimContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  gap: 30px;

  margin-top: 40px;
  > div {
    width: 220px;
    height: 300px;
  }

  > img {
    width: 230px;
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

const FinishButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;

  font-size: 27px;
  font-weight: bold;
  color: #0c598a;

  width: 370px;
  height: 110px;

  border: 3px solid #0679c0;

  border-radius: 10px;

  margin-top: 100px;

  &:active {
    background-color: #0679c0;
    color: white;
  }
`;
