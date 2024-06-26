import { useState, useEffect, useRef } from "react";

import {
  DivMessages,
  DivMain,
  DivInput,
  DivComponents,
  Button,
  DivMessage,
  H1,
  P,
} from "./styles/styles";
import image from "./imges/mandar.png";
import image2 from "./imges/imagemRobozinho.png";

function App() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const aPI_KEY = "AIzaSyCREvkNU1RhGfeAEkMr5BIMWpIQScheZ3U";
  const genAI = new GoogleGenerativeAI(aPI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [valueSend, setValueSend] = useState("");
  const [text, setTexte] = useState([]);
  const [response, setReponse] = useState("");
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:5000/conversions";

  let orderMessage = useRef(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTexte(data))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    const name = async () => {
      const orden =
        "isso é um chat bot pronto para responder sobre o Instituto federal do Piauí ou ifpi sendo o instituto federal do piaui mas abreviado ou. responda todas as perguntas feitas pelo o usuario tendo emojis não tendo muitas palavras, seja gentil me responda apenas com um ok ";
      const result = await model.generateContent(orden);
      const response = await result.response;
      console.log(response.text());
    };
    if (orderMessage) {
      name();
      orderMessage.current = false;
    }
  }, []);

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

  const test = () => {}; // deixei aqui para testes kk

  return (
    <div>
      <H1>IFPI ChatBot</H1>

      <img src={image2} height="50px" width="50px" />
      {loading ? <P>digitando...</P> : <P>online</P>}

      <DivMain>
        <DivMessages>
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
