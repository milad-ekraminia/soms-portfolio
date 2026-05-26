import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { NotificationGridResponse } from "@/types/components/pages/notification";
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
}): Promise<NotificationGridResponse> {
  // Normalize filters into API-friendly format
  const normalizedFilters = appliedFilters.map((filter) => {
    let normalizedValue = filter?.value;

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
    } else if (
      filter.filterType === "isNull" ||
      filter.filterType === "isNotNull"
    ) {
      normalizedValue = "";
    }

    return {
      ...filter,
      value: normalizedValue,
    };
  });

  const sortingString = sorting
    ? `${sorting.field} ${sorting.direction}`
    : "notificationId Desc";

  // Use axiosInstance directly (no manual handleResponse)
  return await getFormDataPost<NotificationGridResponse>({
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
