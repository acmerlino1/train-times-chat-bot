import React, { useState } from "react";
import { useGetAllStationsQuery } from "../../queries/trains/useGetAllStationsQuery";
import { useStationMutation } from "../../queries/trains/useGetStationDataQuery";
import {
  generateMessageResponse,
  generateNextTrainsMessages,
  getRequestKind,
} from "../../services/MessageParser";
import { IMessage, MessageRequestKind } from "../../types/messages";
import { IStationData } from "../../types/trains";
import Card from "../Card";
import ChatForm from "../ChatForm";
import "./styles.css";

const ChatBot = () => {
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);

  const updateMessageHistory = (newMessages: IMessage[]): void => {
    setMessageHistory((prevState) => [...prevState, ...newMessages]);
    const element = document.getElementById("message-history-box");
    if (element) {
      element.scrollTop = 0;
    }
  };

  const { data: allStations } = useGetAllStationsQuery();

  const { mutate, isLoading } = useStationMutation((data: IStationData[]) => {
    const nextTrainsMessages = generateNextTrainsMessages(data);
    const newMessages = nextTrainsMessages.map((message) =>
      generateMessageResponse(message)
    );
    return updateMessageHistory(newMessages);
  });

  const handleSubmitQuestion = (message: IMessage): void => {
    updateMessageHistory([message]);
    const messageType = getRequestKind(message, allStations?.data.stations);

    if (
      messageType.kind === MessageRequestKind.MESSAGE_REQUEST_KIND_ALL_STATIONS
    ) {
      const newMessage = generateMessageResponse(
        allStations?.stationNames.join(", ") || ""
      );
      updateMessageHistory([newMessage]);
      return;
    }

    if (
      messageType.kind ===
      MessageRequestKind.MESSAGE_REQUEST_KIND_NEXT_TRAINS_DATA
    ) {
      const stationData = messageType.data;
      mutate(stationData?.stationCode);
      return;
    }

    const newMessage = generateMessageResponse(
      "Sorry, I didn't understand that"
    );
    updateMessageHistory([newMessage]);
  };

  return (
    <>
      <div className="chatbot">
        <ChatForm onHandleSubmit={handleSubmitQuestion} />
        <hr />
        {isLoading && <p>...Loading</p>}
        <div className="message-history" id="message-history-box">
          {[...messageHistory].reverse()?.map((message) => {
            return <Card message={message} key={message.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ChatBot;
