import {
  OutageApiResponse,
  OutageItemType,
  ActiveUnplannedOutageResponse,
  ArchievedOutageResponse,
  EnergizedOutageResponse,
} from "@/types/components/pages/outage";

const makeItem = (id: number): OutageItemType => ({
  outageId: id,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  durationInHours: "1",
  description: `Mock outage ${id}`,
  status: 1,
  sourceLevelCode: 1,
  outageType: 2,
  triggerType: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  outageSource: null,
  reason: null,
  cause: null,
  ompId: 100 + id,
  wfmExternalId: null,
  city: "MockCity",
  district: "MockDistrict",
  neighborhood: "MockNeighborhood",
  street: `Mock Street ${id}`,
  plannedOutageReason: null,
  plannedStart: null,
  plannedEnd: null,
  gisId: `G${id}`,
  stationName: `Station ${id}`,
  componentName: `Component ${id}`,
  notificationSource: null,
  mainStep: null,
  step: null,
  totalAffectedSubscribers: 10 + id,
  activityStatus: 1,
});

export const mockOutageItems: OutageItemType[] = Array.from({ length: 30 }).map(
  (_, i) => makeItem(i + 1),
);

export const mockOutageApiResponse: OutageApiResponse = {
  data: {
    totalCount: mockOutageItems.length,
    items: mockOutageItems,
  },
  totalPages: 2,
  currentPage: 0,
};

export const mockActiveUnplannedOutage: ActiveUnplannedOutageResponse = {
  unplannedOutage: 12,
  previousUnplannedOutage: 9,
  breakdown: { İstanbul: 8, Ankara: 3, İzmir: 1 },
};

export const mockEnergizedOutage: EnergizedOutageResponse = {
  energizedOutage: 5,
  previousEnergizedOutage: 3,
  breakdown: { İstanbul: 3, Ankara: 2 },
};

export const mockArchievedOutage: ArchievedOutageResponse = {
  archievedOutage: 8,
  previousArchievedOutage: 6,
};

export const mockSmsInterruptions = {
  data: { totalCount: 7 },
};

export default {
  mockOutageApiResponse,
  mockActiveUnplannedOutage,
  mockEnergizedOutage,
  mockArchievedOutage,
  mockSmsInterruptions,
};
