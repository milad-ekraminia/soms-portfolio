import { getFormDataPost } from "@/lib/api-method/api-method-functions";
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
}) {
  const normalizedFilters = appliedFilters.map((filter) => {
    let normalizedValue = filter.value;

    // If value is an array (e.g. multi-select), join with comma
    if (Array.isArray(filter.value)) {
      normalizedValue = filter.value.join(",");
    }

    // If it's a date range object, convert to "start,end"
    else if (
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

  // Check if "status" filter exists in user-applied filters
  const hasStatusFilter = normalizedFilters.some(
    (filter) => filter.key === "outageType"
  );

  const filters = hasStatusFilter
    ? normalizedFilters
    : [
        {
          key: "outageType",
          value: "2", // default filter for plansiz kesintiler page
          filterType: "equals",
        },
        ...normalizedFilters,
      ];

  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "outageId Desc"; 

  return await getFormDataPost({
    endPoint: `check-outage-grid`,
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
