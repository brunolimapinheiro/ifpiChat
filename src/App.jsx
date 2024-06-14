import { useState, useEffect } from "react";

import {
  DivMessages,
  DivMain,
  DivInput,
  DivComponents,
  Button,
  DivMessage,
  H1,
} from "./styles/styles";
import image from "./imges/mandar.png";

function App() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const keyApi = "AIzaSyAv6ANyfKEvn6CimwoNKSazaeYxUNXBUD4";
  const genAI = new GoogleGenerativeAI(keyApi);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [valueSend, setValueSend] = useState("");
  const [text, setTexte] = useState([]);
  const [response, setReponse] = useState("");
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:5000/conversions";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTexte(data))
      .catch((err) => console.log(err));
  });

  const responseIa = async (message) => {
    setLoading(true);
    const prompt = message;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text1 = response.text();
    const newMessageApi = {
      message: text1,
      send: "geminiApi",
    };
    setLoading(false);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMessageApi),
    });
  };

  const ia = () => {
    // funcao para atualizar mensagens
    setValueSend("");
    const newMessageUser = {
      message: valueSend,
      sender: "user",
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMessageUser),
    });
    responseIa(newMessageUser.message);
  };

  const hangeSend = (e) => {
    setValueSend(e.target.value);
  };

  const test = () => {
    console.log(
      text.map((messages) => {
        <p>{messages}</p>;
      }),
    );
  };

  return (
    <div>
      <DivMain>
        <H1>IFPI ChatBot</H1>
        <DivMessages>
          {loading ? <p>carregando</p> : <p>online</p>}
          {text.map((messages, i) => {
            return (
              <DivMessage key={i}>
                <p>{messages.message}</p>
              </DivMessage>
            );
          })}
        </DivMessages>
        <DivComponents>
          <DivInput onChange={hangeSend} value={valueSend} />
          <Button onClick={ia}>
            <img src={image} height="20px" width="20px" />
          </Button>
        </DivComponents>
      </DivMain>
    </div>
  );
}

export default App;
