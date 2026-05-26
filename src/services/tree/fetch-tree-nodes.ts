import { getData } from "@/lib/api-method/api-method-functions";
import { OgssTreeResponse } from "@/types/components/pages/ogss/ogss";
import { OgssStationItemArray } from "@/types/components/pages/ogss/simulation";

export interface TreeParams {
  ompId?: number;
  outageId?: number;
  gisId?: number;
  requestReason?: 0 | 1 | 2; // 0: "Simulation", 1: "Outage", 2: "Historical Network"
}

export async function fetchTreeNodes(
  params: TreeParams
): Promise<OgssTreeResponse> {
  return await getData<OgssTreeResponse>({
    endPoint: "non-recurring-tree-nodes-parallel",
    type: "get",
    dataParams: params,
  });
}
export async function fetchSimsTreeNodes(
  params: any
): Promise<OgssStationItemArray> {
  return await getData<OgssStationItemArray>({
    endPoint: `non-recurring-tree-nodes-parallel${params}`,
    type: "get",
  });
}
