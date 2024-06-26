import Styled from "styled-components";

export const DivMain = Styled.div`
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;


`;

export const DivMessages = Styled.div`
  margin:10px;
  display:flex;
  flex-direction: column;
  align-items:flex-start;
`;

export const DivMessage = Styled.div`
  background: white;
  padding: 10px;
  display: inline-block;
  margin: 10px 10px 10px 10px;
  border-radius: 20px;
  width: 400px;
  text-align:justify;
`;

export const DivComponents = Styled.div`
  display:flex; 
  justify-content: flex-end; 

`;

export const DivInput = Styled.input`
  height:60px;
  padding:10px;
  width:300px;
  border-radius: 10px;
  border: 1px solid green;
  outline: none;
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
  text-align:center;

`;
export const P = Styled.p`
  font-size:20px;
  display:inline-block;
  margin: 0px 0px 10px 20px;
  transition : 1s all;
`;
