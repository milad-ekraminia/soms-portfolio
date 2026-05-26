import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { TableFilter } from "@/types/table-filter";

export async function fetchPlannedOutageDetailLogs({
  plannedOutageId,
  page,
  pageSize,
  appliedFilters = [],
}: {
  plannedOutageId: number;
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
    endPoint: `check-planned-outage-logs/${plannedOutageId}`,
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
