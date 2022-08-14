import { IMessage, MessageRequestKind, MessageTypes } from "../types/messages";
import { IStation, IStationData } from "../types/trains";

const generateUniqueId = () => {
  const randomValue = Math.floor(Math.random()) * Date.now() + 1;
  return randomValue.toString();
};

export const generateMessageRequest = (message: string): IMessage => {
  return {
    id: generateUniqueId(),
    content: message,
    type: MessageTypes.MESSAGE_TYPE_REQUEST,
  };
};

export const generateMessageResponse = (message: string): IMessage => {
  return {
    id: generateUniqueId(),
    content: message,
    type: MessageTypes.MESSAGE_TYPE_RESPONSE,
  };
};

export const generateNextTrainsMessages = (
  stationDetails: IStationData[]
): string[] => {
  if (!stationDetails) {
    return ["There is no data right now"];
  }
  const getTrainMessages = stationDetails.map((train, index) => {
    const { duein, stationfullname, destination } = train;
    return `The ${
      index === 0 ? "next" : "following"
    } train to arrive at ${stationfullname} will arrive in ${duein} minutes. This trains destination is ${destination}.`;
  });
  return getTrainMessages;
};

export const getRequestKind = (
  message: IMessage,
  allStationsNames: IStation[] | undefined
): { kind: MessageRequestKind; data?: IStation } => {
  const splitMessage = message.content.split(" ");
  const isGetAllStationsRequest = splitMessage.some((word) => {
    return ["all", "stations"].includes(word);
  });

  const selectedStation = allStationsNames?.find(
    (station) =>
      station.stationDesc.toLowerCase() === splitMessage[0].toLowerCase()
  );

  const isGetNextTrainsRequest = !!selectedStation;

  if (isGetAllStationsRequest)
    return { kind: MessageRequestKind.MESSAGE_REQUEST_KIND_ALL_STATIONS };
  if (isGetNextTrainsRequest)
    return {
      kind: MessageRequestKind.MESSAGE_REQUEST_KIND_NEXT_TRAINS_DATA,
      data: selectedStation,
    };
  return { kind: MessageRequestKind.MESSAGE_REQUEST_KIND_UNKNOWN };
};
