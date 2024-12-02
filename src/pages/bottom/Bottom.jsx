import { useEffect, useState } from "react";
import { deleteAllMenu, deleteLastMenu, setProgress } from "pages/home/homeSilce";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Bottom = ({ pageNM, backFunc, homeFunc }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);

  const store = {
    //callback
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

  const voiceText = ["다시 말해주세요.", "모르겠어요.", "종이와 펜을 주세요."];

  const playVoice = (textNumber) => {
    const message = new SpeechSynthesisUtterance(); // SpeechSynthesisUtterance 객체 생성
    message.text = voiceText[textNumber]; // 재생할 텍스트
    message.lang = "ko-KR"; // 한국어 설정
    window.speechSynthesis.speak(message); // 음성 출력
    setPlay(true);
  };

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        setPlay(false);
      }, 2000);
    }
  }, [play]);

  return (
    <BottomCont>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.png`}
          alt={""}
          onClick={() => {
            if (typeof backFunc === "function") {
              backFunc();
            }
            store.deleteLastMenu(pageNM);
            navigate(-1);
          }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/home.png`}
          alt={""}
          onClick={() => {
            if (typeof homeFunc === "function") {
              homeFunc();
            }
            store.deleteAllMenu();
            store.setProgress(0);
            navigate("/");
          }}
        />
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/images/sayAgain.png`}
          alt={""}
          onClick={() => {
            if (!play) playVoice(0);
          }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/dontKnow.png`}
          alt={""}
          onClick={() => {
            if (!play) playVoice(1);
          }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/pancel.png`}
          alt={""}
          onClick={() => {
            if (!play) playVoice(2);
          }}
        />
      </div>
    </BottomCont>
  );
};

export default Bottom;

export const BottomCont = styled.div`
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
