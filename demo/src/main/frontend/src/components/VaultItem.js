import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const VaultOutBoxStyled = styled.div`
  width: 650px;
  height: 130px;
  background-color: #bbbaba;
  margin: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 95vw;
    height: 100px;
  }
`;

const VaultInBoxStyled = styled.div`
  width: 600px;
  height: 100px;
  background-color: #dddddd;
  padding: 0px 10px;
  & > div:first-child {
    margin-top: 2px;
    margin-left: 1px;
    font-size: 13px;
    color: var(--mygray);
  }
  @media (max-width: 768px) {
    width: 85vw;
    height: 80px;
  }
`;

const VaultContentStyled = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 768px) {
    height: 80px;
    width: 85vw;
  }
  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    width: 50px;
    height: 50px;
    margin-top: 17px;
    font-size: 15px;
    padding: 5px 5px;
    color: ${(props) => (props.insafe ? "#a5a5a5" : "var(--strpurple)")};
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.6);
    @media (max-width: 768px) {
      margin-top: 10px;
      width: 60px;
      height: 45px;
      font-size: 13px;
    }
  }
  & > div:nth-child(2) {
    margin-top: 15px;
    padding-left: 15px;
    font-size: 15px;
    position: relative;
    width: 400px;
    color: var(--mygray);
    @media (max-width: 768px) {
      padding-left: 10px;
      font-size: 11px;
      margin-top: 10px;
    }
  }
  & > div:nth-child(2) > div:nth-child(2) {
    position: absolute;
    top: 20px;
    left: 15px;
    font-weight: 700;
    font-size: 30px;
    color: #e8b704;
    -webkit-text-stroke: 0.2px var(--mygray);
    width: 400px;
    @media (max-width: 768px) {
      font-size: 25px;
      left: 10px;
      top: 15px;
    }
  }
  & > div:nth-child(2) > div:last-child {
    position: absolute;
    left: 105px;
    font-size: 17px;
    top: 30px;
    font-weight: 600;
    color: var(--myblack);
    @media (max-width: 768px) {
      font-size: 15px;
      left: 85px;
      top: 25px;
    }
  }
`;

const ButtonStyled = styled.button`
  width: 80px;
  height: 30px;
  margin: 5px 5px;
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  justify-content: center;
  background-color: white;
  &:hover {
    background-color: var(--lgmidpurple);
  }
  @media (max-width: 768px) {
    width: 15vw;
    height: 25px;
    font-size: 9px;
    margin: 2px 0px;
  }
`;

const VaultItem = ({
  missionId,
  missionSen,
  missionMoney,
  missionEntry,
  inSafe,
  outSafe,
  accept,
  success,
  now,
}) => {
  const navigate = useNavigate();

  const depositHandler = () => {
    navigate("/toss");
  };

  const depositDoneHandler = () => {
    fetch(`moneyInSafe/${missionId}`, {
      method: "POST",
      body: JSON.stringify({
        isSafe: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("입금성공");
      })
      .catch((err) => {
        console.log(err);
      });
    if (window.confirm("입금이 완료되었습니다. 미션을 시작합니다.")) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  const getMoneyBackHandler = () => {
    fetch(`moneyOutSafe/${missionId}`, {
      method: "POST",
      body: JSON.stringify({
        outSafe: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    console.log("출금성공");
    if (window.confirm("미션을 성공해 돈을 돌려받았습니다!")) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="VaultItem">
      <VaultOutBoxStyled>
        <VaultInBoxStyled>
          <VaultContentStyled insafe={inSafe}>
            <div>
              입금
              <br></br>
              {inSafe ? "완료" : "대기중"}
            </div>
            <div className="vault_content">
              <div>
                미션 : {missionEntry === "eatout" && "외식비"}
                {missionEntry === "deliver" && "배달비"}
                {missionEntry === "cafe" && "카페 비용"}
                {missionEntry === "snack" && "간식비"}
                {missionEntry === "taxi" && "택시비"}
                {missionEntry === "shopping" && "쇼핑비"}
                {missionEntry === "beauty" && "미용비"}를 {missionMoney}원
                이하로 사용하세요
              </div>
              <div>{missionMoney}</div>
              <div>{inSafe ? "원을 보관 중입니다" : "원을 입금해 주세요"}</div>
            </div>
            {!inSafe && (
              <div className="vault_buttons">
                <ButtonStyled onClick={depositHandler}>입금하기</ButtonStyled>
                <ButtonStyled onClick={depositDoneHandler}>
                  입금완료
                </ButtonStyled>
              </div>
            )}
            {!outSafe && success === "success" && (
              <div className="vault_buttons">
                <ButtonStyled onClick={getMoneyBackHandler}>
                  돈 돌려받기
                </ButtonStyled>
              </div>
            )}
          </VaultContentStyled>
        </VaultInBoxStyled>
      </VaultOutBoxStyled>
    </div>
  );
};

export default VaultItem;
