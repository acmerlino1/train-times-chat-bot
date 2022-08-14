export type IStation = {
  stationAlias: string;
  stationCode: string;
  stationDesc: string;
  stationId: string;
};

export type IStations = {
  stations: Array<IStation>;
};
export type IStationData = {
  servertime: string;
  traincode: string;
  stationfullname: string;
  stationcode: string;
  querytime: string;
  traindate: string;
  origin: string;
  destination: string;
  origintime: string;
  destinationtime: string;
  status: string;
  lastlocation: string;
  duein: string;
  direction: string;
  traintype: string;
};
