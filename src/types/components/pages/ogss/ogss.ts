type MonitoringSystemInfoDetail = {
  monitoringSystemPrefix: string;
  monitoringSystemName: string;
};

type MonitoringSystemInfoList = {
  monitoringSystemInfoDetails: MonitoringSystemInfoDetail[];
};

export type TreeNode = {
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

// For an array of these nodes:
export type OgssTreeResponse = TreeNode[];
export type OutageNodeDetail = {
  stationName: string;
  ompName: string;
  sourceSystemId: number;
  treeLevel: number;
  cbsId: string;
  parentStationName: string;
  parentOmpName: string;
  affectedCustomerCount: number;
  outageId: number;
  stationId: string;
  ompId: number;
  startDateTime: string; // ISO string
  endDateTime: string; // ISO string
  outageStatusTypeId: number;
  workForceStatusTypeId?: number;
};
export interface StationInfoByType {
  stationName: string | null;
  cellName: string | null;
  treeLevel: number;
  stationType: number;
  gisId: string;
  ompId: number;
  parentStationName: string;
  parentCellName: string | null;
  installationCount: number;
  workForceStatusTypeId?: number;
}
