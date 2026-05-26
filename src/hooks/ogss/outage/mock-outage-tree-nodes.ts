import { OgssTreeResponse, TreeNode } from "@/types/components/pages/ogss/ogss";
import { TreeParams } from "@/services/tree/fetch-tree-nodes";

const createTreeNode = (
  id: number,
  params: TreeParams,
  requestReason: TreeParams["requestReason"],
): TreeNode => {
  const baseName =
    requestReason === 0
      ? "Simulation"
      : requestReason === 1
        ? "Outage"
        : "Historical";
  const hasEnergy = requestReason !== 1;
  return {
    id: `${params.ompId ?? 0}-${params.outageId ?? 0}-${id}`,
    name: `${baseName} Node ${id}`,
    description: `${baseName} tree node for OMP ${params.ompId ?? 0}`,
    ompStationName: `OMP ${params.ompId ?? 0}`,
    feedingTypeString: "AG",
    treeLevel: id % 4,
    stationType: "Trafo Merkezi",
    stationSubType: "Secondary",
    nodeName: `Node ${id}`,
    type:
      requestReason === 0
        ? "Simulation"
        : requestReason === 1
          ? "Outage"
          : "Historical",
    version: 1,
    lastCutNotificationID: 1000 + id,
    lastCutNotificationDateTime: new Date(
      Date.now() - id * 3600 * 1000,
    ).toISOString(),
    lastGiveNotificationID: 2000 + id,
    lastGiveNotificationDateTime: new Date(
      Date.now() - id * 1800 * 1000,
    ).toISOString(),
    hasEnergy,
    mainOrSubOutage: id % 2,
    subOutageId: id % 3,
    parentId:
      id > 1 ? `${params.ompId ?? 0}-${params.outageId ?? 0}-${id - 1}` : "0",
    monitoringSystemId: 500 + id,
    feedingType: 1,
    installationCount: 10 + id,
    isLastOG: id % 2 === 0,
    isCheckEnergyState: true,
    monitoringSystemInfoList: {
      monitoringSystemInfoDetails: [
        {
          monitoringSystemPrefix: `V`,
          monitoringSystemName: `${baseName} System ${id}`,
        },
      ],
    },
  };
};

export const getMockOutageTreeNodes = async (
  params: TreeParams,
): Promise<OgssTreeResponse> => {
  const count =
    params.requestReason === 0 ? 5 : params.requestReason === 1 ? 10 : 7;
  return Array.from({ length: count }).map((_, index) =>
    createTreeNode(index + 1, params, params.requestReason ?? 0),
  );
};
