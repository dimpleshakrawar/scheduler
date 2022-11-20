import styled from "@emotion/styled";

export const CardLeft = styled.div`
  @media screen and (min-width: 600px) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 1px solid #c4c4c4;
    height: 100%;
    position: relative;
    color: white;
    border-color: #225394;
    background: #225394;
    padding: 0 10px;
  }
  @media screen and (max-width: 600px) {
    // height: 0vh;
  }
`;

export const CardRight = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
  border-bottom-right-radius: 10px;
  background: #f7f8fa;
  color: white;
  //padding: 0 10px;
  // height: 70%;
  display: flex;
  flex-direction: column;
`;

export const Card = styled.div`
  @media screen and (min-width: 600px) {
    border-radius: 10px;
    margin: 10px 50px;
    //padding: 10px 30px;
    height: calc(100% - 90px);
    background: #225394;
    border-color: #225394;
  }
  @media screen and (max-width: 600px) {
    // height: 70vh;
  }
`;

export const ListView = styled.div`
  overflow-y: auto;
  border-bottom-right-radius: 10px;
  height: 530px;
  margin-top: 2px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: ${(props) => (props.middle ? "center" : "flex-start")};
  align-items: center;
  flex-direction: column;
`;

export const HeaderRight = styled.div`
  border-top-right-radius: 10px;
  padding: 10px;
  background: rgb(30, 81, 150);
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
`;

export const HeaderLeft = styled.div`
  padding: 10px;
  font-size: 19px;
  font-weight: 600;
  text-align: center;
`;

export const AddBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

//background: rgb(23, 69, 132);
