import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Container } from "../home/Home";

import {
  selectSecondMenu,
  selectThirdMenu,
  deleteLastMenu,
  deleteAllMenu,
  goToPayments,
  setProgress,
} from "../home/homeSilce";
import { v4 } from "uuid";
import { SelectBody, SelectContainer, SelectHeader } from "../auditorium/AuditoriumHome";
import Bottom from "pages/bottom/Bottom";

const SeatHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState(true);
  const location = useLocation(); // 현재 URL 감지

  const store = {
    //state
    selectSeatArray: useSelector((state) => state["homeReducer"].selectSeatArray),
    //callback
    goToPayments: () => {
      dispatch(goToPayments());
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
    setIsBlocked(true);
    // 페이지가 로드된 후 1초 뒤에 차단 해제
    const timer = setTimeout(() => {
      setIsBlocked(false);
    }, 111);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [location.pathname]);

  // 클릭 차단 핸들러
  const handleClick = (event) => {
    if (isBlocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (store.selectSeatArray.length === 1) {
      store.setProgress(7);
    } else if (store.selectSeatArray.length === 2) {
      store.setProgress(8);
    } else if (store.selectSeatArray.length === 3) {
      store.setProgress(9);
    }
  }, [store.selectSeatArray.length]);

  return (
    <Container onClick={handleClick} style={{ pointerEvents: isBlocked ? "none" : "auto" }}>
      <SelectHeader>
        <SelectContainer>
          {store.selectSeatArray.map((item) => {
            if (item.includes("쪽")) {
              return <div key={v4()}>{item}</div>;
            } else if (item.includes("명")) {
              return (
                <div key={v4()}>
                  <div>{item}</div>
                  <div>
                    {Array.from({ length: Number(item.slice(0, 1)) }, (va, id) => id).map(() => {
                      return (
                        <img
                          key={v4()}
                          src={`${process.env.PUBLIC_URL}/images/person.png`}
                          name={"person"}
                          alt={""}
                        />
                      );
                    })}
                  </div>
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

      {store.selectSeatArray.length === 1 && (
        <SelectBody>
          <h1>인원 수를 선택해 주세요.</h1>
          <BodyItems>
            {Array.from({ length: 4 }, (v, i) => i).map((item, idx) => {
              return (
                <div
                  key={v4()}
                  onClick={() => {
                    navigate("resv");
                    store.selectSecondMenu({ target: { name: `${idx + 1}명` } }, "selectSeatArray");
                  }}
                >
                  <div>{idx + 1}명</div>
                  <div>
                    {Array.from({ length: idx + 1 }, (va, id) => id).map(() => {
                      return (
                        <img
                          key={v4()}
                          src={`${process.env.PUBLIC_URL}/images/person.png`}
                          name={"person"}
                          alt={""}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </BodyItems>
        </SelectBody>
      )}

      {store.selectSeatArray.length === 2 && (
        <SelectBody>
          <h1>좌석 위치를 선택해 주세요.</h1>
          <BodyItems2>
            <div
              onClick={() => {
                navigate("resv/front");
                store.selectThirdMenu({ target: { name: "앞쪽" } }, "selectSeatArray");
              }}
            >
              앞쪽
            </div>
            <div>
              <div
                onClick={() => {
                  navigate("resv/left");
                  store.selectThirdMenu({ target: { name: "왼쪽" } }, "selectSeatArray");
                }}
              >
                왼쪽
              </div>
              <img src={`${process.env.PUBLIC_URL}/images/seat.jpg`} alt={""} />
              <div
                onClick={() => {
                  navigate("resv/right");
                  store.selectThirdMenu({ target: { name: "오른쪽" } }, "selectSeatArray");
                }}
              >
                오른쪽
              </div>
            </div>
            <div
              onClick={() => {
                navigate("resv/back");
                store.selectThirdMenu({ target: { name: "뒤쪽" } }, "selectSeatArray");
              }}
            >
              뒤쪽
            </div>
          </BodyItems2>
        </SelectBody>
      )}

      {store.selectSeatArray.length === 3 && (
        <SelectBody>
          <h1>선택한 인원과 좌석이 맞나요?</h1>
          <BodyItems3>
            <ConfrimItem
              name={"confirm"}
              onClick={(e) => {
                navigate("/payments/home");
                store.goToPayments();
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
                store.deleteLastMenu("selectSeatArray");
                navigate(-1);
              }}
            >
              <div>아니요.</div>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt={""} />
              <div>뒤로가기</div>
            </ConfrimItem>
          </BodyItems3>
        </SelectBody>
      )}

      <Bottom pageNM={"selectSeatArray"} />
    </Container>
  );
};

export default SeatHome;

const BodyItems = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  flex-direction: row;
  flex-wrap: wrap;

  gap: 30px;

  > div {
    width: 40%;
    height: 230px;
    padding: 10px;

    border: 4px solid black;
    border-radius: 10px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 20px;

    cursor: pointer;

    > div:first-child {
      width: 28%;
      font-size: 50px;
      font-weight: bold;

      padding: 20px;
      margin: 0 20px;
      border: 1px solid black;
      border-radius: 10px;
    }

    > div:last-child {
      width: 60%;
      > img {
        width: 50px;
        margin-top: 10px;
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
`;

const BodyItems2 = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 10px;

  > div:first-child {
    width: 240px;
    height: 80px;
    font-size: 60px;
    border: 3px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  > div:last-child {
    width: 240px;
    height: 80px;
    font-size: 60px;
    border: 3px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  > div:nth-child(2) {
    width: 90%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 50px;

    > img {
      width: 380px;
    }

    > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;

      text-align: center;
      width: 100px;
      height: 200px;
      font-size: 60px;
      border: 3px solid black;
      cursor: pointer;
    }

    > div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;

      text-align: center;
      width: 100px;
      height: 200px;
      font-size: 60px;
      border: 3px solid black;
      cursor: pointer;
    }
  }
`;

const BodyItems3 = styled.div`
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
