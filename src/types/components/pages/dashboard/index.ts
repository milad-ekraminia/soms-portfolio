import { JSX } from "react";

export interface TabComponentsTypes {
  overview: JSX.Element;
  outages: JSX.Element;
  notifications: JSX.Element;
}
type DistrictData = {
  ilce: string;
  totalOutageCount: number;
  plannedOutageCount: number;
  unplannedOutageCount: number;
  activeOutageCount: number;
  totalNotifications: number;
};

export type ProvinceData = {
  il: string;
  totalOutageCount: number;
  plannedOutageCount: number;
  unplannedOutageCount: number;
  activeOutageCount: number;
  totalNotifications: number;
  ilceler: DistrictData[];
};

export type OutageSummary = ProvinceData[];
export interface TooltipInfoType {
  city: string;
  totalOutageCount?: number;
  plannedOutageCount?: number;
  unplannedOutageCount?: number;
  activeOutageCount?: number;
  totalNotifications?: number;
  breakdown?: any;
}

export interface OverviewTooltipDataType {
  x: number;
  y: number;
  info: TooltipInfoType;
}

export interface GeneralTooltipDataType {
  x: number;
  y: number;
  info: any;
}

export interface MapGraphCustomLegendItemsProps {
  label: string;
  color: string;
}

export type districtType = {
  district: string;
  outages: DistrictOutage;
  totalCount: number;
};
export interface DistrictsProps {
  district: districtType;
  totalNotifications: number;
  scadaNotifications: number;
  ososNotifications: number;
  crmNotifications: number;
}

export interface DataProps {
  city: string;
  districts: DistrictsProps[];
  totalCityNotifications: number;
  ososNotifications: number;
  scadaNotifications: number;
  totalNotifications: number;
  crmNotifications: number;
}
export interface DashboardMapProps {
  title: string;
  legendItems: MapGraphCustomLegendItemsProps[];
  isLoading: boolean;
  data: OutageSummary | CityOutageResponse | DataProps[] | undefined;
}
export type unPlannedOutageCard = {
  unplannedOutage: number;
  previousUnplannedOutage: number;
  breakdown?: any;
};
export type PlannedOutageCard = {
  plannedOutage: number;
  previousPlannedOutage: number;
  breakdown?: any;
};
export type NotificationCard = {
  activeNotificationCount: number;
  previousNotificationCount: number;
  breakdown?: any;
};
export type EnergizedOutageCard = {
  energizedOutage: number;
  previousEnergizedOutage: number;
  breakdown?: any;
};
export type SubscriberWithoutEnergyCountType = {
  affectedByTheOutageCount: number;
  totalSubscriberCount: number;
};
export type OutageSummarySubCard = {
  totalOutage: number;
  plannedOutageCount: number;
  unplannedOutageCount: number;
  previousTotalOutage: number;
  previousPlannedOutageCount: number;
  previousUnplannedOutageCount: number;
  [key: string]: number | undefined;
};
export type NotificationSourseRate = {
  scadaOutageCount: number;
  ososOutageCount: number;
  crmOutageCount: number;
  scadaNotificationCount: number;
  ososNotificationCount: number;
  crmNotificationCount: number;
};
type OutageDetail = {
  sourceIds: number[];
  totalOutages: number;
  durationGroup: string;
};

export type DistrictOutage = {
  district: string;
  totalCount: number;
  outages: OutageDetail[];
};

export type HourGroup = {
  durationGroup: string;
  count: number;
};

export type CityOutage = {
  city: string;
  totalOutages: number;
  hoursGroups: HourGroup[];
  districts: DistrictOutage[];
};
export type CityOutageResponse = CityOutage[];
export type DailyCount = {
  date: string; // ISO date string
  count: number;
};

export type DailyCounts = DailyCount[];
