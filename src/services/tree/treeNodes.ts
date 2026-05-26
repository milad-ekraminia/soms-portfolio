import { getData } from "@/lib/api-method/api-method-functions";

export interface TreeParams {
  ompId?: number;
  outageId?: number;
  gisId?: number;
  requestReason?: 0 | 1 | 2; // 0: "Simulation", 1: "Outage", 2: "Historical Network"
}

export async function fetchTreeNodes(params: TreeParams) {
  return await getData({
    endPoint: "non-recurring-tree-nodes-parallel",
    type: "get",
    dataParams: params,
  });
}
export async function fetchSimsTreeNodes(params: any) {
  return await getData({
    endPoint: `non-recurring-tree-nodes-parallel${params}`,
    type: "get",
  });
}
