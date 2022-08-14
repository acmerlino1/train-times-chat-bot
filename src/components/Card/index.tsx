import React from "react";
import { IMessage, MessageTypes } from "../../types/messages";
import "./styles.css";

type ICardProps = {
  message: IMessage;
};

const Card = ({ message }: ICardProps) => {
  const isResponseCard = message.type === MessageTypes.MESSAGE_TYPE_RESPONSE;
  return (
    <div className={isResponseCard ? "card-response" : "card-query"}>
      <p>{message.content}</p>
    </div>
  );
};

export default Card;
