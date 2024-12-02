import styled from "styled-components";

const Footer = () => {
  return (
    <FooterCont>
      <div>Copyright 2024 박우찬, 박우철. All Rights Reserved.</div>
      <div>
        본 웹페이지는 한국육영학교의 교육 자료이며, 박우철 선생님의 관리·감독 및 명시적인 승인 하에
        사용이 허가됩니다.
      </div>
      <div>이를 제외한 모든 무단 배포 및 사용을 엄격히 금합니다.</div>
    </FooterCont>
  );
};

export default Footer;

const FooterCont = styled.div`
  width: 100%;

  margin-top: 50px;
  padding-top: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  border-top: 1px solid black;

  > div {
    font-size: 15px;
  }

  > div:nth-child(2) {
    margin-top: 10px;
  }
`;
