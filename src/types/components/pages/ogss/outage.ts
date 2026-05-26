export type OgssOutageItem = {
  id: number;
  ompId: number;
  startDecisionDateTime: string; // ISO string
  startDateTime: string; // ISO string
  startNotificationId: number;
  firstNotificationId: number;
  endDateTime: string; // ISO string
  lastNotificationId: number;
  endNotificationId: number;
  endDecisionDateTime: string; // ISO string
  endUserId: number;
  endTypeId: number;
  mpiCount: number;
  mpiNotCount: number;
  insNotCount: number;
  versionId: number;
  mergeType: string | null;
  mergedOutageId: number;
  outageActivityTypeId: number;
  outageStatusTypeId: number;
  outageTypeId: number;
  gisId: string;
  ompStatus: number;
  ompType: number;
  stationName: string;
  cellName: string | null;
  ompName: string;
  stationType: number;
  stationSubType: number;
  feedingType: number;
  parentOmpId: number;
  treeLevel: number;
  isLastMv: number;
  isLastLv: number;
  installationCount: number;
  rootId: number;
  reliabilityPercentage: number;
};

export type OgssOutageResponseData = {
  totalCount: number;
  items: OgssOutageItem[];
};

export type OgssOutageResponse = {
  data: OgssOutageResponseData;
  totalPages: number;
  currentPage: number;
};
