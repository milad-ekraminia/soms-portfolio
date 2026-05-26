/* export const getValue = (
  cityName: string,
  type?: "group" | "total",
  activeTab: string = "overview",
  mapData?: any
) => {
  if (activeTab === "outages") {
    const city = (mapData as any)?.find((c: any) =>
      c.districts?.some((d: any) => d.district === cityName)
    );

    const district = city?.districts?.find((d: any) => d.district === cityName);
    const data = { district, cityName };
    //if (!district) return type === "group" ? "0" : data;

    const maxOutage = district?.outages?.reduce((max: any, curr: any) =>
      curr.totalOutages > max?.totalOutages ? curr : max
    );

    return type === "group" ? maxOutage?.durationGroup ?? "0" : data ?? 0;
  } else {
    // Notifications logic (assuming similar structure)
    const safeGaurdData = mapData as any;
    const district = safeGaurdData
      ?.flatMap((d: any) => d.districts)
      ?.find((d: any) => d.district === cityName);

    return {
      district,
      cityName,
    };
  }
}; */

import {
  CityOutage,
  DataProps,
  DistrictOutage,
  DistrictsProps,
} from "@/types/components/pages/dashboard";

export const getValue = (
  cityName: string,
  activeTab: string,
  mapData?: any
) => {
  if (activeTab === "outages") {
    const safeGaurdData = mapData as CityOutage;
    const district: DistrictOutage | undefined = safeGaurdData?.districts?.find(
      (d) => d?.district == cityName
    );
    const maxOutage = district?.outages?.reduce((max, curr) =>
      curr?.totalOutages > max?.totalOutages ? curr : max
    );
    return maxOutage?.durationGroup ?? "0";
  } else {
    const safeGaurdData = mapData as DataProps;
    const district: DistrictsProps | undefined = safeGaurdData?.districts?.find(
      (d: any) => d.district === cityName
    );

    return district?.totalNotifications ?? 0;
  }
};

export const getTooltipInfo = (
  cityName: string,
  activeTab: string,
  mapData?: any
) => {
  if (activeTab === "outages") {
    const safeGaurdData = mapData as CityOutage;
    const district: DistrictOutage | undefined = safeGaurdData?.districts?.find(
      (d) => d?.district == cityName
    );
    const maxOutage = district?.outages?.reduce((max, curr) =>
      curr?.totalOutages > max?.totalOutages ? curr : max
    );
    return {
      district,
      cityName,
      maxOutage,
    };
  } else {
    const safeGaurdData = mapData as DataProps;
    const district: DistrictsProps | undefined = safeGaurdData?.districts?.find(
      (d: any) => d.district === cityName
    );

    return {
      district,
      cityName,
    };
  }
};

export const getOutageColor = (value: string): string => {
  if (value === "0") return "var(--utility-gray-100)";
  if (value === "0-1") return "var(--utility-brand-100)";
  if (value === "1-2") return "var(--utility-brand-200)";
  if (value === "2-5") return "var(--utility-warning-200)";
  if (value === "5-10") return "var(--utility-warning-400)";
  return "var(--utility-error-400)";
};
export const getOutageLabelColor = (value: string): string => {
  if (value === "0") return "var(--text-primary-900)";
  if (value === "0-1") return "var(--text-primary-900)";
  if (value === "1-2") return "var(--text-primary-900)";
  if (value === "2-5") return "var(--text-primary-900)";
  if (value === "5-10") return "var(--text-primary-900)";
  return "var(--text-primary-900)";
};
export const getNotificationColor = (value: number): string => {
  if (value === 0) return "var(--utility-gray-100)"; // Bildirim Yok
  if (value > 0 && value <= 100) return "var(--utility-brand-100)"; // 0–100
  if (value > 100 && value <= 1000) return "var(--utility-brand-200)"; // 100–1K
  if (value > 1000 && value <= 2000) return "var(--utility-warning-200)"; // 1K–2K
  if (value > 2000 && value <= 5000) return "var(--utility-warning-400)"; // 2K–5K
  return "var(--utility-error-400)"; // 5K+
};
export const getNotificationLabelColor = (value: number): string => {
  if (value === 0) return "var(--text-primary-900)"; // Bildirim Yok
  if (value > 0 && value <= 100) return "var(--text-primary-900)"; // 0–100
  if (value > 100 && value <= 1000) return "var(--text-primary-900)"; // 100–1K
  if (value > 1000 && value <= 2000) return "var(--text-primary-900)"; // 1K–2K
  if (value > 2000 && value <= 5000) return "var(--text-primary-900)"; // 2K–5K
  return "var(--text-primary-900)"; // 5K+
};


export const getColor = (value: number | string, activeTab: string) => {
  return activeTab === "outages"
    ? getOutageColor(value as string)
    : getNotificationColor(value as number);
};
export const getLabelColor = (value: number | string, activeTab: string) => {
  return activeTab === "outages"
    ? getOutageLabelColor(value as string)
    : getNotificationLabelColor(value as number);
};
