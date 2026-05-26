export type PlannedOutageItem = {
  plannedOutageId: number;
  outageId: number | null;
  ompId: number;
  wfmExternalId: string | null;
  startTime: string | null;
  endTime: string | null;
  plannedStartDate: string;
  plannedEndDate: string;
  durationInHours: string; // e.g., "72:00:00"
  city: string;
  district: string;
  neighborhood: string;
  statusCode: number;
  outageReasonCode: number;
  cbsid: string;
  affectedCustomerCount: number;
  versionId: number;
};
export type PlannedOutageData = {
  totalCount: number;
  items: PlannedOutageItem[];
};

export type PlannedOutageResponseItem = {
  data: PlannedOutageData;
  totalPages: number;
  currentPage: number;
};

export type PlannedOutageApiResponse = {
  responseStatusCode: number;
  responseMessage: string;
  responseList: PlannedOutageResponseItem[];
};
export type PlannedOutageCardResponseItem = {
  count: number;
};

export type PlannedOutageCardResponse = {
  responseStatusCode: number;
  responseMessage: string;
  responseList: PlannedOutageCardResponseItem[];
};
