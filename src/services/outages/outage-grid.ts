import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { OutageApiResponse } from "@/types/components/pages/outage";
import { TableFilter } from "@/types/table-filter";

export async function fetchOutageGrid({
  page,
  pageSize,
  appliedFilters,
  sorting,
}: {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
}): Promise<OutageApiResponse> {
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
    (filter) => filter.key === "outageType"
  );

  const filters = hasStatusFilter
    ? normalizedFilters
    : [
        {
          key: "outageType",
          value: "2",
          filterType: "equals",
        },
        ...normalizedFilters,
      ];

  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "outageId Desc";

  return await getFormDataPost<OutageApiResponse>({
    endPoint: `check-outage-grid`,
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
