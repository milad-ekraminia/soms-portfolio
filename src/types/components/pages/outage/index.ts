export type OutageItemType = {
  outageId: number;
  startTime: string;
  endTime: string;
  durationInHours: string | null;
  description: string | null;
  status: number;
  sourceLevelCode: number;
  outageType: number;
  triggerType: number | null;
  createdAt: string;
  updatedAt: string;
  outageSource: number | null;
  reason: number | null;
  cause: number | null;
  ompId: number;
  wfmExternalId: string | null;
  city: string | null;
  district: string | null;
  neighborhood: string | null;
  street: string | null;
  plannedOutageReason: string | null;
  plannedStart: string | null;
  plannedEnd: string | null;
  gisId: string;
  stationName: string;
  componentName: string | null;
  notificationSource: number | null;
  mainStep: string | null;
  step: string | null;
  totalAffectedSubscribers: number;
  activityStatus: number;
};

export type OutageData = {
  totalCount: number;
  items: OutageItemType[];
};

export type OutageApiResponse = {
  data: OutageData;
  totalPages: number;
  currentPage: number;
};
export type ActiveUnplannedOutageResponse = {
  unplannedOutage: number;
  previousUnplannedOutage: number;
  breakdown?:any;
};
export type ArchievedOutageResponse = {
  archievedOutage: number;
  previousArchievedOutage: number;
};
export type EnergizedOutageResponse = {
  energizedOutage: number;
  previousEnergizedOutage: number;
  breakdown?: any;
};
