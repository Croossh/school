import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container } from "../home/Home";
import { Bottom, SelectBody, SelectContainer, SelectHeader } from "../auditorium/AuditoriumHome";

import {
  selectSecondMenu,
  selectThirdMenu,
  deleteLastMenu,
  deleteAllMenu,
  goToSeat,
} from "../home/homeSilce";

import {
  initState,
  set28Days,
  set30Days,
  set31Days,
  setSelectTime,
  setFirstTime,
} from "./scheduleHomeSlice";

import { v4 } from "uuid";

const ScheduleHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirm, setConfirm] = useState(false);

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
    selectScheduleArray: useSelector((state) => state["homeReducer"].selectScheduleArray),
    scheduleMonth: useSelector((state) => state["scheduleReducer"].scheduleMonth),
    scheduleDays: useSelector((state) => state["scheduleReducer"].scheduleDays),
    selectTime: useSelector((state) => state["scheduleReducer"].selectTime),
    //callback
    //scheduleCallback
    initState: () => {
      dispatch(initState());
    },
    set28Days: () => {
      dispatch(set28Days());
    },
    set30Days: () => {
      dispatch(set30Days());
    },
    set31Days: () => {
      dispatch(set31Days());
    },
    setSelectTime: (value) => {
      dispatch(setSelectTime({ value }));
    },
    setFirstTime: () => {
      dispatch(setFirstTime());
    },
    //home
    goToSeat: () => {
      dispatch(goToSeat());
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
  };

  useEffect(() => {
    if (location.pathname === "/schedule/home") {
      store.initState();
      setConfirm(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // 1, 3, 5, 7, 8, 10 ,12
    // (2) 4, 6, 9, 11
    if (store.selectTime.length === 1) {
      if (store.selectTime[0] === 2) {
        store.set28Days();
      } else if ([4, 6, 9, 11].includes(store.selectTime[0])) {
        store.set30Days();
      } else {
        store.set31Days();
      }
    } else if (store.selectTime.length === 3) {
      setTimeout(() => {
        store.selectSecondMenu({ target: { name: store.selectTime } }, "selectScheduleArray");
      }, 100);
    }
  }, [store.selectTime.length]);

  return (
    <Container>
      <SelectHeader>
        <SelectContainer>
          {store.selectScheduleArray.map((item) => {
            if (typeof item === "object") {
              return (
                <div key={v4()}>
                  <div>
                    <div>{item[0]}월</div>
                    <div>{item[1]}일</div>
                  </div>
                  <div>{item[2]}</div>
                </div>
              );
            } else {
              return (
                <img key={v4()} src={`${process.env.PUBLIC_URL}/images/${item}.jpg`} alt={""} />
              );
            }
          })}
        </SelectContainer>
      </SelectHeader>

      {store.selectScheduleArray.length === 1 && (
        <SelectBody>
          <h1>
            날짜는 언제인가요?
            <TimeSelectorHeader value={store.selectTime}>
              <div onClick={() => store.setFirstTime()}>
                <div>{store.selectTime[0]}</div>
                <div>월</div>
              </div>
              <div>
                <div>{store.selectTime[1]}</div>
                <div>일</div>
              </div>
            </TimeSelectorHeader>
          </h1>
          {store.selectTime.length === 0 && (
            <TimeSelectItem>
              {store.scheduleMonth.map((value) => (
                <TimeItems1
                  key={v4()}
                  onClick={() => {
                    const temp = [...store.selectTime];
                    temp[0] = value;

                    store.setSelectTime(temp);
                  }}
                >
                  {value}
                </TimeItems1>
              ))}
            </TimeSelectItem>
          )}
          {store.selectTime.length === 1 && (
            <TimeSelectItem>
              {store.scheduleDays.map((value) => (
                <TimeItems2
                  key={v4()}
                  onClick={() => {
                    const temp = [...store.selectTime];
                    temp[1] = value;

                    store.setSelectTime(temp);
                  }}
                >
                  {value}
                </TimeItems2>
              ))}
            </TimeSelectItem>
          )}
        </SelectBody>
      )}

      {store.selectScheduleArray.length === 2 && store.selectTime.length === 3 && !confirm && (
        <SelectBody>
          <h1>
            {`${store.selectTime[0]}월 ${store.selectTime[1]}일 ${store.selectTime[2]}`}이 맞나요?
          </h1>
          <BodyItems>
            <ConfrimItem
              onClick={() => {
                setConfirm(true);
                navigate("1");
              }}
            >
              <div>맞아요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/confirm.png`} alt={""} />
              <div>시간 선택하기</div>
            </ConfrimItem>
            <ConfrimItem
              onClick={() => {
                setConfirm(false);
                store.initState();
                store.deleteLastMenu("selectScheduleArray");
              }}
            >
              <div>아니요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt={""} />
              <div>날짜 선택하기</div>
            </ConfrimItem>
          </BodyItems>
        </SelectBody>
      )}

      {store.selectScheduleArray.length === 2 && confirm && (
        <SelectBody>
          <h1>공연시간을 말해주세요.</h1>
          <BodyItems>
            <img
              src={`${process.env.PUBLIC_URL}/images/one.jpg`}
              name={"one"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectScheduleArray");
                navigate("1/1");
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/two.jpg`}
              name={"two"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectScheduleArray");
                navigate("1/2");
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/three.jpg`}
              name={"three"}
              alt={""}
              onClick={(e) => {
                store.selectThirdMenu(e, "selectScheduleArray");
                navigate("1/3");
              }}
            />
          </BodyItems>
        </SelectBody>
      )}

      {store.selectScheduleArray.length === 3 && (
        <SelectBody>
          <h1>예약한 내용을 확인해주세요.</h1>
          <BodyItems>
            <ConfrimItem
              name={"confirm"}
              onClick={(e) => {
                // store.deleteAllMenu(); // 나중에 살려야함
                store.goToSeat();
                navigate("/seat/home"); // 나중에 시간표예약으로 바꿔야함
              }}
            >
              <div>맞아요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/confirm.png`} alt={""} />
              <div>좌석 예약하기</div>
            </ConfrimItem>
            <ConfrimItem
              onClick={() => {
                // store.deleteAllMenu();
                // navigate("/");
                store.deleteLastMenu("selectScheduleArray");
                navigate(-1);
              }}
            >
              <div>아니요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt={""} />
              <div>뒤로가기</div>
            </ConfrimItem>
          </BodyItems>
        </SelectBody>
      )}

      <Bottom>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/back.png`}
            alt={""}
            onClick={() => {
              if (location.pathname === "/schedule/home" && store.selectTime.length === 2) {
                store.initState();
                setConfirm(false);
                store.deleteLastMenu("selectScheduleArray");
              } else {
                store.deleteLastMenu("selectScheduleArray");
                navigate(-1);
              }
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/home.png`}
            alt={""}
            onClick={() => {
              store.initState();
              setConfirm(false);
              store.deleteAllMenu();
              navigate("/");
            }}
          />
        </div>
        <div></div>
      </Bottom>
    </Container>
  );
};

export default ScheduleHome;

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

const TimeSelectorHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  margin-left: 80px;

  > div:first-child {
    cursor: pointer;
  }

  > div {
    width: 140px;
    height: 100px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    > div {
      font-size: 60px;
      font-weight: bold;
    }
  }
  ${(props) =>
    props.value?.length === 0 &&
    `
  > div:first-child {
    border-bottom: 5px solid black;
  }`}
  ${(props) =>
    props.value?.length === 1 &&
    `
  > div:last-child {
    border-bottom: 5px solid black;
  }`}
`;

const TimeSelectItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  width: 1000px;

  /* margin-top: 10px; */
`;

const TimeItems1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  padding: 20px;
  font-size: 50px;
  font-weight: bold;

  border: 1px solid black;

  cursor: pointer;
`;

const TimeItems2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 73px;
  height: 73px;

  padding: 10px;
  font-size: 40px;
  font-weight: bold;

  border: 1px solid black;

  cursor: pointer;
`;
