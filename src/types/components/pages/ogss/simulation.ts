export type MonitoringSystemInfoDetail = {
  monitoringSystemPrefix: string;
  monitoringSystemName: string;
};

export type MonitoringSystemInfoList = {
  monitoringSystemInfoDetails: MonitoringSystemInfoDetail[];
};

export type StationItem = {
  id: string;
  name: string | null;
  description: string;
  ompStationName: string | null;
  feedingTypeString: string;
  treeLevel: number;
  stationType: string;
  stationSubType: string;
  nodeName: string | null;
  type: string;
  version: number;
  lastCutNotificationID: number;
  lastCutNotificationDateTime: string; // ISO string
  lastGiveNotificationID: number;
  lastGiveNotificationDateTime: string; // ISO string
  hasEnergy: boolean;
  mainOrSubOutage: number;
  subOutageId: number;
  parentId: string;
  monitoringSystemId: number;
  feedingType: number;
  installationCount: number;
  isLastOG: boolean;
  isCheckEnergyState: boolean;
  monitoringSystemInfoList: MonitoringSystemInfoList;
};

// If you have an array of these items
export type OgssStationItemArray = StationItem[];
