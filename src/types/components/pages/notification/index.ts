export type NotificationItemType = {
  notificationId: number;
  sourceName: number;
  crmExternalId: number;
  outageId: number;
  outageStatus: string; // you can replace `string` with more specific literals if known
  createdAt: string; // ISO datetime string
  facilityId: number;
  transformerFacilityId: number;
  subjectCode: number;
  statusCode: number;
  priority: number;
  recordedAt: string; // ISO datetime string
  networkElementId: number;
  ompId: number;
  city: string;
  district: string;
  neighborhood: string;
  street: string | null;
  componentGisId: string;
  outageNetworkGisId: string;
  notificationNetworkGisId: string;
};
export interface NotificationGridResponse {
  data: {
    totalCount: number;
    items: NotificationItemType[];
  };
  totalPages: number;
  currentPage: number;
}
export interface CancelNotificationCounts {
  cancelNotificationCount: number;
  previousCount: number;
  breakdown?: any;
}
export type OutagesAssignedNotificationResponse = {
  outagesAssignedNotificationCount: number;
  previousCount: number;
  breakdown?: any;
};
