import React, { useState } from "react";
import { generateMessageRequest } from "../../services/MessageParser";
import { IMessage } from "../../types/messages";
import "./styles.css";

type ChatFormProps = {
  onHandleSubmit: (message: IMessage) => void;
};

const ChatForm = ({ onHandleSubmit }: ChatFormProps) => {
  const [question, setQuestion] = useState<string>();

  return (
    <>
      <label>Ask me a question</label>
      <p>
        Type a station name to find out the next departing trains from that
        location, or ask me for all stations.
      </p>
      <input
        type="text"
        id="query"
        name="query"
        value={question}
        placeholder="Enter a station name"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="submit"
        value="Submit"
        onClick={() => {
          question && onHandleSubmit(generateMessageRequest(question));
          setQuestion("");
        }}
      />
    </>
  );
};

export default ChatForm;
