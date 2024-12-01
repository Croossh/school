import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { selectFirstMenu } from "./homeSilce";

const Home = () => {
  const dispatch = useDispatch();

  const store = {
    //state
    selectShowArray: useSelector((state) => state["homeReducer"].selectShowArray),
    selectScheduleArray: useSelector((state) => state["homeReducer"].selectScheduleArray),
    //callback
    selectFirstMenu: (name, type) => {
      dispatch(selectFirstMenu({ name, type }));
    },
  };

  return (
    <Container>
      <Header>목차를 선택해주세요.</Header>
      {/* 상단 아이템 */}
      <ItemContainer>
        <LinkContainer>
          <div>
            <Link
              to="/auditorium/home"
              onClick={() => store.selectFirstMenu("first_0", "selectShowArray")}
            >
              <ItemsImage>
                <img src={`${process.env.PUBLIC_URL}/images/first_0.jpg`} alt="관람하다" />
              </ItemsImage>
            </Link>
            <div></div>
            <SubItemContainer>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/first_1.jpg`} alt="무엇이 있나요?" />
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/first_2.jpg`} alt="선택하다" />
              </div>
            </SubItemContainer>
          </div>
        </LinkContainer>
        <LinkContainer>
          <div>
            <Link
              to="/schedule/home"
              onClick={() => store.selectFirstMenu("second_0", "selectScheduleArray")}
            >
              <ItemsImage>
                <img src={`${process.env.PUBLIC_URL}/images/second_0.jpg`} alt="시간표" />
              </ItemsImage>
            </Link>
            <div></div>
            <SubItemContainer>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/second_1.jpg`} alt="일정" />
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/second_2.jpg`} alt="시간" />
              </div>
            </SubItemContainer>
          </div>
        </LinkContainer>
        <LinkContainer>
          <div>
            <Link
              to="/seat/home"
              onClick={() => store.selectFirstMenu("third_0", "selectSeatArray")}
            >
              <ItemsImage>
                <img src={`${process.env.PUBLIC_URL}/images/third_0.jpg`} alt="자리배치표" />
              </ItemsImage>
            </Link>
            <div></div>
            <SubItemContainer>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/third_1.jpg`} alt="인원 수" />
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/third_2.jpg`} alt="자리 선택" />
              </div>
            </SubItemContainer>
          </div>
        </LinkContainer>
        <LinkContainer>
          <div>
            <Link
              to="/payments/home"
              onClick={() => store.selectFirstMenu("fourth_0", "selectPaymentsArray")}
            >
              <ItemsImage>
                <img src={`${process.env.PUBLIC_URL}/images/fourth_0.jpg`} alt="예매해요" />
              </ItemsImage>
            </Link>
            <div></div>
            <SubItemContainer>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/fourth_1.jpg`} alt="계산해요" />
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/images/fourth_2.jpg`} alt="입장권" />
              </div>
            </SubItemContainer>
          </div>
        </LinkContainer>
      </ItemContainer>
    </Container>
  );
};

export default Home;

const Header = styled.h1`
  font-size: 50px;
  font-weight: bold;
  /* margin-top: 10px; */
`;

export const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  width: 100%;
  margin-top: 50px;
`;

const LinkContainer = styled.div`
  width: 80%;
  height: 210px;

  border: 5px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 5px gray;

  display: flex;
  justify-content: center;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    gap: 90px;
  }

  > div > a {
    padding: 10px 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
  }

  > div > div:nth-child(2) {
    border: 3px solid black;
    height: 150px;
  }

  > div > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    gap: 30px;

    > div {
      width: 140px;
      height: 140px;
      border: 1px solid black;

      > img {
        width: 140px;
      }
    }
  }
`;

const ItemsImage = styled.div`
  width: 170px;
  height: 170px;

  > img {
    width: 170px;
    height: 170px;

    object-fit: cover;
  }
`;

const SubItemContainer = styled.div``;
