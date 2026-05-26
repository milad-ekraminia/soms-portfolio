import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";
import {
  ActiveUnplannedOutageResponse,
  ArchievedOutageResponse,
  EnergizedOutageResponse,
} from "@/types/components/pages/outage";
import { CardParams } from "@/types/services/cards";
import { TableFilter } from "@/types/table-filter";

export async function fetchActiveUnplannedOutage({
  referenceDate,
  dateType,
}: CardParams): Promise<ActiveUnplannedOutageResponse> {
  return await getData<ActiveUnplannedOutageResponse>({
    endPoint: `${dateType}/active-unplanned-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchEnergizedOutage({
  referenceDate,
  dateType,
}: CardParams): Promise<EnergizedOutageResponse> {
  return await getData<EnergizedOutageResponse>({
    endPoint: `${dateType}/energized-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}
export async function fetchArchiveOutageCount({
  referenceDate,
}: CardParams): Promise<ArchievedOutageResponse> {
  return await getData<ArchievedOutageResponse>({
    endPoint: `archive-outage-count`,
    type: "get",
    dataParams: { referenceDate },
  });
}
export async function fetchSmsInterruptions({
  page,
  pageSize,
  appliedFilters,
  sorting,
}: {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
}) {
  const normalizedFilters = appliedFilters.map((filter) => {
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

  const filters = [
    {
      key: "status",
      value: "1",
      filterType: "equals",
    },
    ...normalizedFilters,
  ];

  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "outageId Desc";

  return await getFormDataPost({
    endPoint: `get-sms-approval-requests`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize,
        sorting: sortingString,
      },
    },
  });
}
