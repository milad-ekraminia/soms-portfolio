import { STALE_TIMES } from "@/helpers/data/query";
import {
  fetchAddress,
  fetchAddressWithStationId,
} from "@/services/notifications/get-address";
import { useQuery } from "@tanstack/react-query";

export const useCityAddressData = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["getCitiesAddresses"],
    queryFn: () => fetchAddress({}),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    enabled,
  });
};
export const useDistrictsAddressData = ({
  cityId,
  selectedRows,
}: {
  cityId?: number | string;
  selectedRows?: number[];
}) => {
  return useQuery({
    queryKey: ["getDistrictsAddresses", cityId, selectedRows],
    queryFn: () => fetchAddress({ city: cityId }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    enabled: !!cityId,
  });
};
export const useNeighborhoodsAddresses = ({
  cityId,
  districtID,
  selectedRows,
}: {
  cityId?: number | string;
  districtID?: number | string;
  selectedRows?: number[];
}) => {
  return useQuery({
    queryKey: ["getneighborhoodsAddresses", cityId, districtID, selectedRows],
    queryFn: () => fetchAddress({ city: cityId, district: districtID }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    enabled: !!cityId && !!districtID,
  });
};
export const useFullAddresses = ({
  cityId,
  districtID,
  neighbourhood,
  selectedRows,
}: {
  cityId?: number | string;
  districtID?: number | string;
  neighbourhood?: number | string;
  selectedRows?: number[];
}) => {
  return useQuery({
    queryKey: [
      "getFullAddresses",
      cityId,
      districtID,
      neighbourhood,
      selectedRows,
    ],
    queryFn: () =>
      fetchAddress({ city: cityId, district: districtID, neighbourhood }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    // 15 seconds
    enabled: !!cityId && !!districtID && !!neighbourhood,
  });
};
export const useOmpAddresses = ({
  cityId,
  districtID,
  neighbourhood,
  stationId,
  selectedRows,
}: {
  cityId?: number | string;
  districtID?: number | string;
  neighbourhood?: number | string;
  stationId?: number | string;
  selectedRows?: number[];
}) => {
  return useQuery({
    queryKey: [
      "getOmpAddresses",
      cityId,
      districtID,
      neighbourhood,
      stationId,
      selectedRows,
    ],
    queryFn: () =>
      fetchAddressWithStationId({
        city: cityId,
        district: districtID,
        neighbourhood,
        stationId,
      }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    // 15 seconds
    enabled: !!cityId && !!districtID && !!neighbourhood && !!stationId,
  });
};
