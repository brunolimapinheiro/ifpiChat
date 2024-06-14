import Styled from "styled-components";

export const DivMain = Styled.div`
  padding:20px;

`;

export const DivMessages = Styled.div`
  margin:10px;
  display:flex;
  flex-direction: column;
`;

export const DivMessage = Styled.div`
  background: white;
  padding: 10px;
  display: inline-block;
  margin: 10px 10px 10px 10px;
  border-radius: 20px;
`;

export const DivComponents = Styled.div`
position: fixed;
  bottom: 5%;
  left: 70%;
  width: 100%;
`;

export const DivInput = Styled.input`
  height:40px;
  padding:10px;
  width:300px;
  border-radius: 10px;
  border: 1px solid green;
  outline: none;
  font-weight: bold;
  font-size:15px;
`;

export const Button = Styled.button`
  width:50px;
  height:50px;
  border-radius:50%;
  border:none;
  margin-left:10px;
  &:hover{
    cursor:pointer;
  }
`;

export const H1 = Styled.h1`
  font-height:bolder;

`;
