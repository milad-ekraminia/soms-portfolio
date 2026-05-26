export interface NotificationDetail {
  notificationId: number;
  sourceName: number;
  crmExternalId: number;
  outageId: number;
  outageStatus: string;
  createdAt: string; // ISO date string
  facilityId: number;
  transformerFacilityId: number;
  subjectCode: number;
  statusCode: number;
  priority: number;
  recordedAt: string; // ISO date string
  networkElementId: number;
  ompId: number;
  city: string;
  district: string;
  neighborhood: string;
  street: string | null;
  componentGisId: string;
  outageNetworkGisId: string;
  notificationNetworkGisId: string;
  modemIMEI: number;
  hucreId: string | null;
  istasyonId: string;
  treeLevel: number;
}
export interface NotificationLog {
  tarih: string; // ISO date string
  aciklama: string;
  kullanici: string;
  olayTipi: number;
}
export interface NotificationDetailLog {
  data: {
    totalCount: number;
    items: NotificationLog[];
  };
  totalPages: number;
  currentPage: number;
}