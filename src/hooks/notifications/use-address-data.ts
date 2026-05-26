// hooks/notifications/use-address-data.ts
import {
  useCityAddressData,
  useDistrictsAddressData,
  useNeighborhoodsAddresses,
  useFullAddresses,
  useOmpAddresses,
} from "@/hooks/notifications/use-get-address";

export const useAddressData = ({
  city,
  district,
  neighborhood,
  stationId,
  selectedRows,
  enabled = true,
}: {
  city?: string;
  district?: string;
  neighborhood?: string;
  stationId?: string | number;
  selectedRows?: number[];
  enabled?: boolean;
}) => {
  const { data: cities, isLoading: isCitiesLoading } = useCityAddressData({
    enabled,
  });
  const { data: districts, isLoading: isDistrictsLoading } =
    useDistrictsAddressData({ cityId: city, selectedRows });
  const { data: neighbourhoods, isLoading: isneighbourhoodsLoading } =
    useNeighborhoodsAddresses({
      cityId: city,
      districtID: district,
      selectedRows,
    });
  const { data: fullAddressData, isLoading: isFullAddressLoading } =
    useFullAddresses({
      cityId: city,
      districtID: district,
      neighbourhood: neighborhood,
      selectedRows,
    });
  const { data: ompData, isLoading: isOmpDataLoading } = useOmpAddresses({
    cityId: city,
    districtID: district,
    neighbourhood: neighborhood,
    stationId,
    selectedRows,
  });

  return {
    cities,
    districts,
    neighbourhoods,
    fullAddressData,
    ompData,
    loadingStates: {
      isCitiesLoading,
      isDistrictsLoading,
      isneighbourhoodsLoading,
      isFullAddressLoading,
      isOmpDataLoading,
    },
  };
};
