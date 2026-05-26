import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { TableFilter } from "@/types/table-filter";

export async function fetchOutageApprovedGrid({
  page,
  pageSize,
  appliedFilters,
}: {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
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

  const hasStatusFilter = normalizedFilters.some(
    (filter) => filter.key === "StatusCode"
  );

  const filters = hasStatusFilter
    ? normalizedFilters
    : [
        {
          key: "StatusCode",
          value: "2",
          filterType: "equals",
        },
        ...normalizedFilters,
      ];

  return await getFormDataPost({
    endPoint: `planned-status-list`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: "outageId",
      },
    },
  });
}
