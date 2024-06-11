import { useState } from "react";

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
  const [text, setTexte] = useState([
    {
      message: "olá sou o chat bot do ifpi o que posso lhe ajudar?",
      send: "geminiApi",
    },
  ]);
  const [response, setReponse] = useState("");
  const [loading, setLoading] = useState(false);

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
    const newMessage = [...text, newMessageApi];
    setLoading(false);
    setTexte(newMessage);
  };

  const ia = () => {
    // funcao para atualizar mensagens

    const newMessageUser = {
      message: valueSend,
      sender: "user",
    };
    const newMessages = [...text, newMessageUser];
    setTexte(newMessages);
    responseIa(newMessageUser.message);
  };

  const hangeSend = (e) => {
    setValueSend(e.target.value);
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
                <p>{messages.message}</p>;
              </DivMessage>
            );
          })}
        </DivMessages>
        <DivComponents>
          <DivInput onChange={hangeSend} />
          <Button onClick={ia}>
            <img src={image} height="20px" width="20px" />
          </Button>
        </DivComponents>
      </DivMain>
    </div>
  );
}

export default App;
