import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";
import {
  NotificationDetail,
  NotificationDetailLog,
} from "@/types/services/notification/detail-item";
import { TableFilter } from "@/types/table-filter";

export async function fetchNotificationDetail({
  notificationId,
}: {
  notificationId: number;
}): Promise<NotificationDetail> {
  return await getData<NotificationDetail>({
    endPoint: `notification-detail-with-id/${notificationId}`,
    type: "get",
  });
}

export async function fetchNotificationDetailLogs({
  notificationId,
  page,
  pageSize,
  appliedFilters = [],
}: {
  notificationId: number;
  page: number;
  pageSize: number;
  appliedFilters?: TableFilter[] | [];
}): Promise<NotificationDetailLog> {
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
  return await getFormDataPost<NotificationDetailLog>({
    endPoint: `check-logs/${notificationId}?forOutage=false`,
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
