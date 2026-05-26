import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { TableFilter } from "@/types/table-filter";
interface DataParams {
  startDateTime?: string;
  endDateTime?: string;
  description?: string;
}
interface Params {
  dataParams: DataParams;
  outageId: any;
}
interface NotificationImpact {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
  dataParams: DataParams;
  outageId: any;
}

export async function PostDateChangeNotificationImpact({
  dataParams,
  outageId,
  page,
  pageSize,
  appliedFilters,
  sorting,
}: NotificationImpact) {
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

  const filters = [...normalizedFilters];

  const sortingString = sorting ? `${sorting.field} ${sorting.direction}` : "";

  return await getFormDataPost({
    endPoint: `outage-dates-change-notification-impact`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filtersAndSorting: {
          filters,
          pageNumber: page,
          pageSize,
          sorting: sortingString,
        },
      },
      outageId,
      startDateTime: dataParams?.startDateTime,
      endDateTime: dataParams?.endDateTime,
    },
  });
}
export async function PostDateChange({ dataParams, outageId }: Params) {
  return await getFormDataPost({
    endPoint: `outage-dates-change`,
    type: "post",
    formData: {
      outageId,
      ...dataParams,
    },
  });
}
