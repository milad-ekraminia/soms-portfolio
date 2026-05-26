import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { PlannedOutageApiResponse } from "@/types/components/pages/outage/planned-outage";
import { TableFilter } from "@/types/table-filter";

export async function fetchOutageApprovedGrid({
  page,
  pageSize,
  appliedFilters,
  sorting,
}: {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
}): Promise<PlannedOutageApiResponse> {
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

  const hasStatusFilter = normalizedFilters.some(
    (filter) => filter.key === "statusCode"
  );

  const filters = hasStatusFilter
    ? normalizedFilters
    : [
        {
          key: "statusCode",
          value: "2,3,4,5",
          filterType: "equals",
        },
        ...normalizedFilters,
      ];

  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "plannedOutageId Desc";

  return await getFormDataPost<PlannedOutageApiResponse>({
    endPoint: `planned-status-list`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: sortingString,
      },
    },
  });
}
