import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchAddress({
  city,
  district,
  neighbourhood,
}: {
  city?: string | number;
  district?: string | number;
  neighbourhood?: string | number;
}) {
  // Build query string dynamically
  const params = new URLSearchParams();

  if (city !== undefined) params.append("city", String(city));
  if (district !== undefined) params.append("district", String(district));
  if (neighbourhood !== undefined)
    params.append("neighbourhood", String(neighbourhood));

  return await getData({
    endPoint: `address-data?${params.toString()}`,
    type: "get",
  });
}

export async function fetchAddressWithStationId({
  stationId,
  city,
  district,
  neighbourhood,
}: {
  stationId?: string | number;
  city?: string | number;
  district?: string | number;
  neighbourhood?: string | number;
}) {
  const params = new URLSearchParams();

  if (city !== undefined) params.append("city", String(city));
  if (district !== undefined) params.append("district", String(district));
  if (neighbourhood !== undefined)
    params.append("neighbourhood", String(neighbourhood));
  if (stationId !== undefined) params.append("stationId", String(stationId));
  return await getData({
    endPoint: `address-data?${params.toString()}`,
    type: "get",
  });
}
