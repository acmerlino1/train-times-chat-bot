import React from "react";
import "./styles.css";

type ICardProps = {
  type: "response" | "query";
};

const Card = ({ type }: ICardProps) => {
  const isResponseCard = type === "response";
  return <div className={isResponseCard ? "card-response" : "card-query"} />;
};

export default Card;
