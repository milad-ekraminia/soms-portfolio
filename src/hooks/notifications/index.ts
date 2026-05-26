import { STALE_TIMES } from "@/helpers/data/query";
import { fetchActiveNotificationCount } from "@/services/dashboard/cards";
import {
  fetchAssignToInterruption,
  PostAssignToInterruptiopn,
} from "@/services/notifications/post-assign-to-interruption";
import {
  fetchCancelNotificationCount,
  fetchOutagesAssignedNotificationCount,
} from "@/services/notifications/cards";
import {
  PostCreatePlannedOutage,
  PostCreateUnplannedOutage,
  createUnplannedOutage,
} from "@/services/notifications/post-create-unplanned-outage.ts";
import { PostNotificationCancellation } from "@/services/notifications/post-notification-cancellation";
import { fetchNotificationGrid } from "@/services/notifications/notification-grid";
import {
  fetchSeperateInterruption,
  PostSeperateInterruption,
} from "@/services/notifications/post-separate-interruption";
import { fetchStationIdFromCbsId } from "@/services/notifications/fetch-station-id-from-cbs-id.ts";
import { fetchStationWithAddress } from "@/services/notifications/fetch-station-with-address";
import { CardParams } from "@/types/services/cards";
import { TableFilter } from "@/types/table-filter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const IS_MOCK = import.meta.env.VITE_MOCK === "true";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const mockNotifications = {
  activeNotificationCount: {
    activeNotificationCount: 28,
    previousNotificationCount: 34,
    breakdown: { scada: 10, crm: 8, osos: 10 },
  },
  cancelNotificationCount: { cancelNotificationCount: 3, previousCount: 1 },
  outagesAssignedNotificationCount: {
    outagesAssignedNotificationCount: 5,
    previousCount: 2,
  },
  grid: (page: number, pageSize: number) => {
    const totalCount = 25;
    const offset = (page - 1) * pageSize;
    const count = Math.max(0, Math.min(pageSize, totalCount - offset));

    const items = Array.from({ length: count }).map((_, i) => {
      const id = offset + i + 1;
      return {
        notificationId: id,
        sourceName: 1,
        crmExternalId: 1000 + id,
        outageId: id + 200,
        outageStatus: "Open",
        createdAt: new Date().toISOString(),
        facilityId: 500 + id,
        transformerFacilityId: 600 + id,
        subjectCode: 1,
        statusCode: 1,
        priority: 1,
        recordedAt: new Date().toISOString(),
        networkElementId: 700 + id,
        ompId: 800 + id,
        city: id % 2 === 0 ? "DİYARBAKIR" : "MARDİN",
        district: id % 2 === 0 ? "BAĞLAR" : "ARTUKLU",
        neighborhood: "Merkez",
        street: null,
        componentGisId: "",
        outageNetworkGisId: "",
        notificationNetworkGisId: "",
      };
    });

    return {
      data: { totalCount, items },
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    };
  },
};
export const useActiveNotificationCount = (params: CardParams) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["NotificationGrid"] ?? false,
  );
  return useQuery({
    queryKey: [
      "ActiveNotificationCount",
      "notification",
      params.referenceDate,
      params.dateType,
    ], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockNotifications.activeNotificationCount;
      }
      return fetchActiveNotificationCount(params);
    },
    staleTime: refreshInterval ?? STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
  });
};

export const useFetchCancelNotificationCount = () => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["NotificationGrid"] ?? false,
  );
  return useQuery({
    queryKey: ["CancelNotificationCount", "notification"], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockNotifications.cancelNotificationCount;
      }
      return fetchCancelNotificationCount();
    },
    staleTime: refreshInterval ?? STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
  });
};

export const useFetchOutagesAssignedNotificationCount = () => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["NotificationGrid"] ?? false,
  );
  return useQuery({
    queryKey: ["OutagesAssignedNotificationCount", "notification"], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockNotifications.outagesAssignedNotificationCount;
      }
      return fetchOutagesAssignedNotificationCount();
    },
    staleTime: refreshInterval ?? STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
  });
};

export const useNotificationCards = (params: CardParams) => {
  const active = useActiveNotificationCount(params);
  const cancel = useFetchCancelNotificationCount();
  const outages = useFetchOutagesAssignedNotificationCount();

  return {
    activeNotificationCount: active,
    cancelNotificationCount: cancel,
    outagesAssignedNotificationCount: outages,
  };
};

export const useNotifcation = (
  page: number = 1,
  pageSize: number = 20,
  appliedFilters: TableFilter[] = [],
  sorting?: { field: string; direction: "Asc" | "Desc" } | null,
) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["NotificationGrid"] ?? false,
  );

  return useQuery({
    queryKey: ["NotificationGrid", page, pageSize, appliedFilters, sorting],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockNotifications.grid(page + 1, pageSize);
      }
      const response = await fetchNotificationGrid({
        page: page + 1, // careful: page indexing here
        pageSize,
        appliedFilters,
        sorting,
      });

      return response;
    },
    staleTime: refreshInterval ?? STALE_TIMES.MEDIUM,
    refetchInterval: refreshInterval || undefined,
  });
};
const keysToInvalidate = [
  ["NotificationGrid"],
  ["ActiveNotificationCount"],
  ["CancelNotificationCount"],
  ["OutagesAssignedNotificationCount"],
];
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostNotificationCancellation,
    onSuccess: () => {
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key }),
      );
    },
  });
};
export const useUnplannedOutageFromExistingNotifications = () => {
  return useMutation({
    mutationFn: createUnplannedOutage,
  });
};
export const useCreateUnplannedOutage = () => {
  return useMutation({
    mutationFn: PostCreateUnplannedOutage,
  });
};
export const useCreatePlannedOutage = () => {
  return useMutation({
    mutationFn: PostCreatePlannedOutage,
  });
};

export const useStationIdFromCbsId = ({
  cbsIds,
  enabled = true,
}: {
  cbsIds: any;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["GetStationIdFromGisId", cbsIds],
    queryFn: () =>
      fetchStationIdFromCbsId({
        cbsIds,
      }),
    enabled: enabled && cbsIds?.length > 0,
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
  });
};
export const useStationWithAddress = ({
  city,
  district,
  neighborhood,
  stationId,
}: {
  city: string;
  district: string;
  neighborhood: string;
  stationId: string | number;
}) => {
  return useQuery({
    queryKey: ["StationWithAddress", city, district, neighborhood],
    queryFn: () =>
      fetchStationWithAddress({
        stationId,
      }),
    enabled: !!city && !!district && !!neighborhood && !!stationId, // only run if all are filled
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
  });
};
export const useAssignToInterruption = ({
  notificationsId,
  outageId,
}: {
  notificationsId: number[];
  outageId?: number;
}) => {
  return useQuery({
    queryKey: ["ConnectNotificationChange", notificationsId, outageId],
    queryFn: () =>
      fetchAssignToInterruption({
        notificationsId,
        outageId,
      }),
    enabled: notificationsId?.length > 0 && !!outageId,
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
  });
};
export const useAssignToInterruptionPost = () => {
  return useMutation({
    mutationFn: PostAssignToInterruptiopn,
  });
};
export const useSeperateInterruption = ({
  notificationsId,
  outageId,
}: {
  notificationsId: number[];
  outageId?: number;
}) => {
  return useQuery({
    queryKey: ["ConnectNotificationChange", notificationsId, outageId],
    queryFn: () =>
      fetchSeperateInterruption({
        notificationsId,
        outageId,
      }),
    enabled: notificationsId?.length > 0 && !!outageId,
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
  });
};
export const useSeperateToInterruptionPost = () => {
  return useMutation({
    mutationFn: PostSeperateInterruption,
  });
};
