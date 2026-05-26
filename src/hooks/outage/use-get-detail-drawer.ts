import { STALE_TIMES } from "@/helpers/data/query";
import { fetchOutageDetailByType } from "@/services/ogss/get-detail-omp-version";
import {
  fetchOutageDetailCombinedDeductions,
  fetchOutageDetailDevices,
  fetchOutageDetailListDocuments,
  fetchOutageDetailLogs,
  fetchOutageDetailNotifications,
  fetchOutageDetailTierLists,
  fetchOutageDetailWithOmp,
  fetchOutageDetailWithOutage,
} from "@/services/outages/fetch-outage-detail";
import { fetchOutageDetailLHoverData } from "@/services/outages/unplanned-outage/fetch-hover-data";
import {
  OutageNodeDetail,
  StationInfoByType,
} from "@/types/components/pages/ogss/ogss";
import { TableFilter } from "@/types/table-filter";
import { useQuery } from "@tanstack/react-query";

export const useOutageDetailWithOutage = ({
  outageId,
  clickedNode = false,
  ompId,
  version,
  nodeType = "outage",
  forceEnabled = true,
}: {
  outageId?: number;
  clickedNode?: boolean;
  ompId?: number;
  version?: any;
  nodeType?: "simulation" | "historical" | "outage";
  forceEnabled?: boolean;
}) => {
  return useQuery<StationInfoByType | OutageNodeDetail, Error>({
    queryKey: [
      nodeType,
      clickedNode ? "GetOmpDetailWithOutage" : "GetOutageDetailWithOutage",
      outageId ?? null,
      clickedNode ? ompId : null,
      version ?? null,
    ],

    queryFn: () => {
      if (clickedNode && nodeType == "outage") {
        // ✅ clickedNode logic
        return fetchOutageDetailWithOmp({
          outageId: outageId as number,
          ompId: ompId as number,
        });
      }

      // ✅ branch by nodeType
      if (nodeType == "simulation" || nodeType == "historical") {
        return fetchOutageDetailByType({
          omdId: ompId as number,
          version: version,
        });
      }

      return fetchOutageDetailWithOutage({ outageId: outageId as number });
    },
    staleTime: 0,
    refetchOnMount: "always",

    enabled:
      forceEnabled &&
      (nodeType === "simulation" || nodeType === "historical"
        ? !!version && !!ompId
        : !!outageId && (!clickedNode || !!ompId)),
  });
};
export const useOutageDetailCombinedDeductions = ({
  outageId,
  page = 1,
  pageSize = 20,
  appliedFilters = [],
}: {
  outageId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: [
      "GetMergedOutagesFromOutage",
      outageId,
      page,
      pageSize,
      appliedFilters,
    ],

    queryFn: () =>
      fetchOutageDetailCombinedDeductions({
        outageId,
        page: page + 1,
        pageSize,
        appliedFilters,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId,
  });
};
export const useOutageDetailNotifications = ({
  outageId,
  page = 1,
  pageSize = 20,
  appliedFilters = [],
  sorting = null,
}: {
  outageId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
}) => {
  return useQuery({
    queryKey: [
      "NotificationGrid",
      outageId,
      page,
      pageSize,
      appliedFilters,
      sorting,
    ],

    queryFn: () =>
      fetchOutageDetailNotifications({
        outageId,
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId,
  });
};
export const useOutageDetailLogs = ({
  outageId,
  page = 1,
  pageSize = 20,
  appliedFilters,
}: {
  outageId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: ["CheckLogs", outageId, page, pageSize, appliedFilters],

    queryFn: () =>
      fetchOutageDetailLogs({
        outageId,
        page: page + 1,
        pageSize,
        appliedFilters,
      }),
    staleTime: 0, // ✅ always stale
    refetchOnMount: "always",
    enabled: !!outageId,
  });
};
export const useOutageDetailDevices = ({
  outageId,
  OmpId,
  page = 1,
  pageSize = 20,
  appliedFilters = [],
}: {
  outageId: number;
  page?: number;
  pageSize?: number;
  OmpId: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: [
      "GetMonitoringSystemList",
      outageId,
      page,
      pageSize,
      OmpId,
      appliedFilters,
    ],

    queryFn: () =>
      fetchOutageDetailDevices({
        outageId,
        page: page + 1,
        pageSize,
        OmpId,
        appliedFilters,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId || !!OmpId,
  });
};
export const useOutageDetailListDocuments = ({
  outageId,
  appliedFilters = [],
}: {
  outageId: number;

  appliedFilters?: TableFilter[];
  page?: any;
  pageSize?: any;
}) => {
  return useQuery({
    queryKey: ["CheckOutageDocumentList", outageId, appliedFilters],

    queryFn: () =>
      fetchOutageDetailListDocuments({
        outageId,
        appliedFilters,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId,
  });
};
export const useOutageDetailTierLists = ({
  outageId,
  page = 1,
  pageSize = 20,
  appliedFilters = [],
}: {
  outageId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: [
      "GettierListsForAnOutage",
      outageId,
      page,
      pageSize,
      appliedFilters,
    ],

    queryFn: () =>
      fetchOutageDetailTierLists({
        outageId,
        page: page + 1,
        pageSize,
        appliedFilters,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId,
  });
};
export const useOutageDetailLHoverData = ({
  outageId,
}: {
  outageId: number;
}) => {
  return useQuery({
    queryKey: ["detailHoverData", outageId],

    queryFn: () =>
      fetchOutageDetailLHoverData({
        outageId,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!outageId,
  });
};
