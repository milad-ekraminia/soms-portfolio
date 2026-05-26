import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";
import { OutageNodeDetail } from "@/types/components/pages/ogss/ogss";
import { TableFilter } from "@/types/table-filter";

export async function fetchOutageDetailWithOutage({
  outageId,
}: {
  outageId: number;
}): Promise<OutageNodeDetail> {
  return await getData<OutageNodeDetail>({
    endPoint: `outage-detail-with-outage-id/${outageId}`,
    type: "get",
  });
}
export async function fetchOutageDetailWithOmp({
  outageId,
  ompId,
}: {
  outageId: number;
  ompId: number;
}): Promise<OutageNodeDetail> {
  return await getData<OutageNodeDetail>({
    endPoint: `omp-network-detail?ompId=${ompId}&outageId=${outageId}`,
    type: "get",
  });
}
export async function fetchOutageDetailCombinedDeductions({
  outageId,
  page,
  pageSize,
  appliedFilters,
}: {
  outageId: number;
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[] | [];
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  return await getFormDataPost({
    endPoint: `check-merged-outages-from-outage/${outageId}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailNotifications({
  outageId,
  page,
  pageSize,
  appliedFilters,
  sorting,
}: {
  outageId: number;
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[] | [];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "notificationId Desc";
  return await getFormDataPost({
    endPoint: `check-notification-grid`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters: [
          ...filters,
          {
            key: "outageId",
            filterType: "equals",
            value: `${outageId}`,
          },
        ],
        pageNumber: page,
        pageSize: pageSize,
        sorting: sortingString,
      },
    },
  });
}
export async function fetchOutageDetailLogs({
  outageId,
  page,
  pageSize,
  appliedFilters = [],
}: {
  outageId: number;
  page: number;
  pageSize: number;
  appliedFilters?: TableFilter[] | [];
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  return await getFormDataPost({
    endPoint: `check-logs/${outageId}?forOutage=true`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailDevices({
  outageId,
  page,
  pageSize,
  OmpId,
  appliedFilters,
}: {
  outageId: number;
  OmpId: number;
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[] | [];
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  return await getFormDataPost({
    endPoint: `check-monitoring-system-list?outageId=${outageId}&ompId=${OmpId}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailListDocuments({
  outageId,
  appliedFilters = [],
}: {
  outageId: number;
  appliedFilters?: TableFilter[];
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  return await getFormDataPost({
    endPoint: `check-outage-document-list/${outageId}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
      },
    },
  });
}
export async function fetchOutageDetailAddress({
  stationId,
}: {
  stationId: number;
}) {
  return await getData({
    endPoint: `address-with-station-id/${stationId}`,
    type: "get",
    dataParams: {},
  });
}
export async function fetchOutageDetailTierLists({
  outageId,
  page,
  pageSize,
  appliedFilters,
}: {
  outageId: number;
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[] | [];
}) {
  const filters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    } else if (
      filter.filterType === "between" &&
      typeof filter.value === "object" &&
      filter.value !== null &&
      ("start" in filter.value || "end" in filter.value)
    ) {
      const start = filter.value.start || "";
      const end = filter.value.end || "";
      normalizedValue = `${start},${end}`;
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });
  return await getFormDataPost({
    endPoint: `get-outage-step-list/${outageId}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
