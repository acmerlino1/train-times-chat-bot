import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IStationData } from "../../types/trains";

export const useStationMutation = (onSuccess: (data: IStationData[]) => void) =>
  useMutation(
    async (code: string | undefined) => {
      if (code) {
        const response = await axios.get(
          `http://localhost:8080/stations/${code}`
        );
        return response.data;
      }
      return Promise.resolve();
    },
    {
      onSuccess,
    }
  );
