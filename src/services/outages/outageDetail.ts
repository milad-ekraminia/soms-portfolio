import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";

export async function fetchOutageDetailWithOutage({
  outageId,
}: {
  outageId: number;
}) {
  return await getData({
    endPoint: `outage-detail-with-outage-id/${outageId}`,
    type: "get",
  });
}
export async function fetchOutageDetailCombinedDeductions({
  outageId,
  page,
  pageSize,
}: {
  outageId: number;
  page: number;
  pageSize: number;
}) {
  return await getFormDataPost({
    endPoint: `check-merged-outages-from-outage/${outageId}`,
    type: "post",
    // dataParams: {
    //   SkipCount: page,
    //   MaxResultCount: pageSize,
    //   OutageId: outageId,
    // },
    formData: {
      filtersAndSorting: {
        filters: [
          {
            key: "",
            value: "",
            filterType: "",
          },
        ],
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailNotifications({
  outageId,
  page,
  pageSize,
}: {
  outageId: number;
  page: number;
  pageSize: number;
}) {
  return await getFormDataPost({
    endPoint: `check-notifications-for-an-outage/${outageId}`,
    type: "post",
    // dataParams: {
    //   SkipCount: page,
    //   MaxResultCount: pageSize,
    //   OutageId: outageId,
    // },
    formData: {
      filtersAndSorting: {
        filters: [
          {
            key: "",
            value: "",
            filterType: "",
          },
        ],
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailLogs({
  outageId,
  page,
  pageSize,
}: {
  outageId: number;
  page: number;
  pageSize: number;
}) {
  return await getFormDataPost({
    endPoint: `check-logs/${outageId}?forOutage=true`,
    type: "post",
    formData: {
      filtersAndSorting: {
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailDevices({
  outageId,
  page,
  pageSize,
  OmpId,
}: {
  outageId: number;
  OmpId: number;
  page: number;
  pageSize: number;
}) {
  return await getFormDataPost({
    endPoint: `check-monitoring-system-list?outageId=${outageId}&ompId=${OmpId}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters: [
          {
            key: "",
            value: "",
            filterType: "",
          },
        ],
        pageNumber: page,
        pageSize: pageSize,
        sorting: "",
      },
    },
  });
}
export async function fetchOutageDetailListDocuments({
  outageId,
}: {
  outageId: number;
}) {
  return await getFormDataPost({
    endPoint: `check-outage-document-list/${outageId}`,
    type: "post",
    formData: {
      filters: [
        // {
        //   key: "OutageId",
        //   value: `${outageId}`,
        //   filterType: "equals",
        // },
      ],
    },
  });
}
export async function fetchOutageDetailAddress({
  stationId,
}: {
  stationId: number;
}) {
  return await getData({
    endPoint: `address-with-station-id/${stationId}`,
    type: "get",
    dataParams: {},
  });
}
