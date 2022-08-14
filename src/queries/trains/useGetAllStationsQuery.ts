import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IStations } from "../../types/trains";

export const useGetAllStationsQuery = (): UseQueryResult<{
  data: IStations;
  stationNames: string[];
}> =>
  useQuery(
    ["stations-list"],
    async () => {
      const response = await axios.get("http://localhost:8080/stations");

      return response.data;
    },
    {
      select: (data: IStations) => {
        return {
          data,
          stationNames: data.stations.map((station) =>
            station.stationDesc.toLocaleLowerCase()
          ),
        };
      },
      onError: (error) => {
        console.error(error);
      },

      staleTime: Infinity,
    }
  );
