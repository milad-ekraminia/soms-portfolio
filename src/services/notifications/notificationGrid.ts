import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { TableFilter } from "@/types/table-filter";

export async function fetchNotificationGrid({
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
    let normalizedValue = filter?.value;

    // If value is an array (e.g. multi-select), join with comma
    if (Array.isArray(filter?.value)) {
      normalizedValue = filter?.value.join(",");
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
    } else if (
      filter.filterType == "isNull" ||
      filter.filterType == "isNotNull"
    ) {
      normalizedValue = ``;
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
        filters: [...normalizedFilters],
        pageNumber: page,
        pageSize: pageSize,
        sorting: sortingString,
      },
    },
  });
}
