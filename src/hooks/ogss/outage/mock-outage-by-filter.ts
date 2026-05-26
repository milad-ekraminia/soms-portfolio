import {
  OgssOutageResponse,
  OgssOutageItem,
} from "@/types/components/pages/ogss/outage";

const createMockOutageItem = (
  id: number,
  isActive: boolean,
): OgssOutageItem => {
  const now = new Date();
  const offset = id % 10;
  const startDate = new Date(
    now.getTime() - offset * 3600 * 1000,
  ).toISOString();
  const endDate = isActive
    ? new Date(now.getTime() + (offset + 2) * 3600 * 1000).toISOString()
    : new Date(now.getTime() - (offset - 2) * 3600 * 1000).toISOString();

  return {
    id,
    ompId: 1000 + id,
    startDecisionDateTime: startDate,
    startDateTime: startDate,
    startNotificationId: 5000 + id,
    firstNotificationId: 5001 + id,
    endDateTime: endDate,
    lastNotificationId: 6000 + id,
    endNotificationId: 6001 + id,
    endDecisionDateTime: endDate,
    endUserId: isActive ? 0 : 1,
    endTypeId: isActive ? 1 : 2,
    mpiCount: 10 + id,
    mpiNotCount: 2,
    insNotCount: 1,
    versionId: 1,
    mergeType: null,
    mergedOutageId: 0,
    outageActivityTypeId: isActive ? 1 : 2,
    outageStatusTypeId: isActive ? 1 : 3,
    outageTypeId: 1,
    gisId: `GIS-${id}`,
    ompStatus: isActive ? 1 : 0,
    ompType: 1,
    stationName: `Station ${id}`,
    cellName: id % 2 === 0 ? `Cell ${id}` : null,
    ompName: isActive ? `Aktif OMP ${id}` : `Pasif OMP ${id}`,
    stationType: 1,
    stationSubType: 1,
    feedingType: 1,
    parentOmpId: 100 + id,
    treeLevel: 1,
    isLastMv: 1,
    isLastLv: 0,
    installationCount: 100 + id,
    rootId: 1,
    reliabilityPercentage: 98.5,
  };
};

export const getMockOutageByFilter = (
  isActive: boolean,
  page: number,
  pageSize: number,
): OgssOutageResponse => {
  const totalCount = isActive ? 18 : 12;
  const startId = (page - 1) * pageSize + 1;
  const endId = Math.min(totalCount, startId + pageSize - 1);
  const items = Array.from({ length: Math.max(0, endId - startId + 1) }).map(
    (_, index) => createMockOutageItem(startId + index, isActive),
  );

  return {
    data: {
      totalCount,
      items,
    },
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
    currentPage: page,
  };
};
