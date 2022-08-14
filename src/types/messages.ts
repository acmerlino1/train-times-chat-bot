export enum MessageTypes {
  MESSAGE_TYPE_RESPONSE = "MESSAGE_TYPE_RESPONSE",
  MESSAGE_TYPE_REQUEST = "MESSAGE_TYPE_REQUEST",
}

export type IMessage = {
  id: string;
  type: MessageTypes;
  content: string;
};

export enum MessageRequestKind {
  MESSAGE_REQUEST_KIND_ALL_STATIONS = "MESSAGE_REQUEST_KIND_ALL_STATIONS",
  MESSAGE_REQUEST_KIND_NEXT_TRAINS_DATA = "MESSAGE_REQUEST_KIND_NEXT_TRAINS_DATA",
  MESSAGE_REQUEST_KIND_UNKNOWN = "MESSAGE_REQUEST_KIND_UNKNOWN",
}
