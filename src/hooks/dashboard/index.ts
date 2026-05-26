import { STALE_TIMES } from "@/helpers/data/query";
import {
  fetchActiveNotificationCount,
  fetchActivePlannedOutage,
  fetchActiveUnplannedOutage,
  fetchEnergizedOutage,
} from "@/services/dashboard/cards";
import {
  fetchNotificationByCity,
  fetchNotificationSourceSystemCount,
  fetchPlumbedNotificationRate,
} from "@/services/dashboard/notifications-tab";
import {
  fetchCountByHourWithCity,
  fetchNotificationSourceRate,
} from "@/services/dashboard/fetch-notification-source-rate";
import { fetchNumberOfOutagesCityAndDistrict } from "@/services/dashboard/fetch-number-of-outages-city-and-district";
import {
  fetchNumberOfInterruptionsByDay,
  fetchOutageByCityWithHour,
} from "@/services/dashboard/outages-tab";
import { fetchPlannedAndUnplannedOutageRate } from "@/services/dashboard/fetch-planned-and-unplanned-outage-rate";
import { fetchSubscriberWithoutEnergyCount } from "@/services/dashboard/fetch-subscriber-without-energy-count";
import { CardParams } from "@/types/services/cards";
import { numberOfInterruptionsByDayParams } from "@/types/services/chart.type";
import { useQueries, useQuery } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_MOCK === "true";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const mock = {
  activeUnplannedOutage: {
    unplannedOutage: 12,
    previousUnplannedOutage: 8,
    breakdown: { critical: 3, major: 5, minor: 4 },
  },
  activePlannedOutage: {
    plannedOutage: 4,
    previousPlannedOutage: 6,
    breakdown: { scheduled: 4 },
  },
  activeNotificationCount: {
    activeNotificationCount: 28,
    previousNotificationCount: 34,
    breakdown: { scada: 10, crm: 8, osos: 10 },
  },
  energizedOutage: {
    energizedOutage: 7,
    previousEnergizedOutage: 5,
    breakdown: { restoredQuick: 4 },
  },
  subscriberWithoutEnergy: {
    affectedByTheOutageCount: 1200,
    totalSubscriberCount: 125000,
  },
  outageSummarySubCard: {
    totalOutage: 16,
    plannedOutageCount: 4,
    unplannedOutageCount: 12,
    previousTotalOutage: 20,
    previousPlannedOutageCount: 5,
    previousUnplannedOutageCount: 15,
  },
  numberOfOutagesCityAndDistrict: [
    {
      il: "DİYARBAKIR",
      totalOutageCount: 12,
      plannedOutageCount: 3,
      unplannedOutageCount: 9,
      activeOutageCount: 15,
      totalNotifications: 42,
      ilceler: [
        {
          ilce: "ÇÜNGÜŞ",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 2,
        },
        {
          ilce: "ÇERMİK",
          totalOutageCount: 2,
          plannedOutageCount: 0,
          unplannedOutageCount: 2,
          activeOutageCount: 1,
          totalNotifications: 6,
        },
        {
          ilce: "ERGANİ",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
        {
          ilce: "ÇINAR",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
        {
          ilce: "BAĞLAR",
          totalOutageCount: 2,
          plannedOutageCount: 1,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 8,
        },
        {
          ilce: "KAYAPINAR",
          totalOutageCount: 2,
          plannedOutageCount: 1,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 7,
        },
        {
          ilce: "YENİŞEHİR",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 4,
        },
        {
          ilce: "SUR",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 5,
        },
        {
          ilce: "BİSMİL",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 2,
        },
        {
          ilce: "SİLVAN",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 2,
        },
        {
          ilce: "HAZRO",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
        {
          ilce: "KULP",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
        {
          ilce: "LİCE",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
        {
          ilce: "HANİ",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
        {
          ilce: "EĞİL",
          totalOutageCount: 0,
          plannedOutageCount: 0,
          unplannedOutageCount: 0,
          activeOutageCount: 0,
          totalNotifications: 1,
        },
      ],
    },
    {
      il: "MARDİN",
      totalOutageCount: 9,
      plannedOutageCount: 2,
      unplannedOutageCount: 7,
      activeOutageCount: 300,
      totalNotifications: 28,
      ilceler: [
        {
          ilce: "ARTUKLU",
          totalOutageCount: 3,
          plannedOutageCount: 1,
          unplannedOutageCount: 2,
          activeOutageCount: 1,
          totalNotifications: 10,
        },
        {
          ilce: "KIZILTEPE",
          totalOutageCount: 2,
          plannedOutageCount: 0,
          unplannedOutageCount: 2,
          activeOutageCount: 1,
          totalNotifications: 6,
        },
        {
          ilce: "MAZIDAĞI",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 4,
        },
        {
          ilce: "DERİK",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
      ],
    },
    {
      il: "ŞANLIURFA",
      totalOutageCount: 6,
      plannedOutageCount: 1,
      unplannedOutageCount: 5,
      activeOutageCount: 150,
      totalNotifications: 18,
      ilceler: [
        {
          ilce: "BİRECİK",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
        {
          ilce: "SURUÇ",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 2,
        },
      ],
    },
    {
      il: "BATMAN",
      totalOutageCount: 4,
      plannedOutageCount: 1,
      unplannedOutageCount: 3,
      activeOutageCount: 70,
      totalNotifications: 12,
      ilceler: [
        {
          ilce: "BEŞİRİ",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 4,
        },
        {
          ilce: "SASON",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
        {
          ilce: "KOZLUK",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 3,
        },
      ],
    },
    {
      il: "SİİRT",
      totalOutageCount: 3,
      plannedOutageCount: 0,
      unplannedOutageCount: 3,
      activeOutageCount: 0,
      totalNotifications: 9,
      ilceler: [
        {
          ilce: "BAYKAN",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
        {
          ilce: "ŞİRVAN",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
        {
          ilce: "PERVARİ",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 3,
        },
      ],
    },
    {
      il: "ŞIRNAK",
      totalOutageCount: 2,
      plannedOutageCount: 0,
      unplannedOutageCount: 2,
      activeOutageCount: 1,
      totalNotifications: 6,
      ilceler: [
        {
          ilce: "CİZRE",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 1,
          totalNotifications: 3,
        },
        {
          ilce: "İDİL",
          totalOutageCount: 1,
          plannedOutageCount: 0,
          unplannedOutageCount: 1,
          activeOutageCount: 0,
          totalNotifications: 3,
        },
      ],
    },
  ],
  notificationSourceRate: {
    scadaOutageCount: 10,
    ososOutageCount: 6,
    crmOutageCount: 4,
    scadaNotificationCount: 12,
    ososNotificationCount: 8,
    crmNotificationCount: 6,
  },
  notificationSourceSystemCount: [
    {
      city: "DİYARBAKIR",
      districts: [
        {
          district: "ÇÜNGÜŞ",
          outages: [],
          totalCount: 2,
          totalNotifications: 2,
        },
        {
          district: "ÇERMİK",
          outages: [],
          totalCount: 6,
          totalNotifications: 6,
        },
        {
          district: "ERGANİ",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        {
          district: "ÇINAR",
          outages: [],
          totalCount: 1,
          totalNotifications: 1,
        },
      ],
      totalCityNotifications: 12,
      ososNotifications: 4,
      scadaNotifications: 5,
      totalNotifications: 12,
      crmNotifications: 3,
    },
    {
      city: "MARDİN",
      districts: [
        {
          district: "ARTUKLU",
          outages: [],
          totalCount: 10,
          totalNotifications: 10,
        },
        {
          district: "KIZILTEPE",
          outages: [],
          totalCount: 6,
          totalNotifications: 6,
        },
      ],
      totalCityNotifications: 16,
      ososNotifications: 6,
      scadaNotifications: 6,
      totalNotifications: 16,
      crmNotifications: 4,
    },
    {
      city: "ŞANLIURFA",
      districts: [
        {
          district: "BİRECİK",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        {
          district: "SURUÇ",
          outages: [],
          totalCount: 2,
          totalNotifications: 2,
        },
      ],
      totalCityNotifications: 5,
      ososNotifications: 2,
      scadaNotifications: 2,
      totalNotifications: 5,
      crmNotifications: 1,
    },
    {
      city: "BATMAN",
      districts: [
        {
          district: "BEŞİRİ",
          outages: [],
          totalCount: 4,
          totalNotifications: 4,
        },
        {
          district: "SASON",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        {
          district: "KOZLUK",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
      ],
      totalCityNotifications: 10,
      ososNotifications: 3,
      scadaNotifications: 4,
      totalNotifications: 10,
      crmNotifications: 3,
    },
    {
      city: "SİİRT",
      districts: [
        {
          district: "BAYKAN",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        {
          district: "ŞİRVAN",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        {
          district: "PERVARİ",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
      ],
      totalCityNotifications: 9,
      ososNotifications: 3,
      scadaNotifications: 3,
      totalNotifications: 9,
      crmNotifications: 3,
    },
    {
      city: "ŞIRNAK",
      districts: [
        {
          district: "CİZRE",
          outages: [],
          totalCount: 3,
          totalNotifications: 3,
        },
        { district: "İDİL", outages: [], totalCount: 3, totalNotifications: 3 },
      ],
      totalCityNotifications: 6,
      ososNotifications: 2,
      scadaNotifications: 2,
      totalNotifications: 6,
      crmNotifications: 2,
    },
  ],
  countByHourWithCity: [
    { durationGroup: "00-06", count: 2 },
    { durationGroup: "06-12", count: 5 },
    { durationGroup: "12-18", count: 6 },
  ],
  outageByCityWithHour: [
    {
      city: "DİYARBAKIR",
      totalOutages: 12,
      hoursGroups: [
        { durationGroup: "00-06", count: 2 },
        { durationGroup: "06-12", count: 4 },
        { durationGroup: "12-18", count: 6 },
      ],
      districts: [
        {
          district: "ÇÜNGÜŞ",
          outages: [
            { sourceIds: [1], totalOutages: 1, durationGroup: "00-06" },
          ],
          totalCount: 1,
        },
        {
          district: "ÇERMİK",
          outages: [
            { sourceIds: [2], totalOutages: 2, durationGroup: "06-12" },
          ],
          totalCount: 2,
        },
      ],
    },
    {
      city: "MARDİN",
      totalOutages: 9,
      hoursGroups: [
        { durationGroup: "00-06", count: 1 },
        { durationGroup: "06-12", count: 3 },
        { durationGroup: "12-18", count: 5 },
      ],
      districts: [
        {
          district: "ARTUKLU",
          outages: [
            { sourceIds: [3], totalOutages: 3, durationGroup: "12-18" },
          ],
          totalCount: 3,
        },
      ],
    },
    {
      city: "ŞANLIURFA",
      totalOutages: 6,
      hoursGroups: [
        { durationGroup: "06-12", count: 2 },
        { durationGroup: "12-18", count: 4 },
      ],
      districts: [
        {
          district: "BİRECİK",
          outages: [
            { sourceIds: [4], totalOutages: 1, durationGroup: "12-18" },
          ],
          totalCount: 1,
        },
      ],
    },
    {
      city: "BATMAN",
      totalOutages: 4,
      hoursGroups: [
        { durationGroup: "00-06", count: 1 },
        { durationGroup: "12-18", count: 3 },
      ],
      districts: [
        {
          district: "BEŞİRİ",
          outages: [
            { sourceIds: [5], totalOutages: 1, durationGroup: "00-06" },
          ],
          totalCount: 1,
        },
      ],
    },
    {
      city: "SİİRT",
      totalOutages: 3,
      hoursGroups: [
        { durationGroup: "06-12", count: 1 },
        { durationGroup: "12-18", count: 2 },
      ],
      districts: [
        {
          district: "BAYKAN",
          outages: [
            { sourceIds: [6], totalOutages: 1, durationGroup: "06-12" },
          ],
          totalCount: 1,
        },
      ],
    },
    {
      city: "ŞIRNAK",
      totalOutages: 2,
      hoursGroups: [{ durationGroup: "12-18", count: 2 }],
      districts: [
        {
          district: "CİZRE",
          outages: [
            { sourceIds: [7], totalOutages: 1, durationGroup: "12-18" },
          ],
          totalCount: 1,
        },
      ],
    },
  ],
};

export const useActiveUnplannedOutage = (params: CardParams) => {
  return useQuery({
    queryKey: ["ActiveUnplannedOutage", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.activeUnplannedOutage;
      }
      return fetchActiveUnplannedOutage(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useActivePlannedOutage = (params: CardParams) => {
  return useQuery({
    queryKey: ["ActivePlannedOutage", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.activePlannedOutage;
      }
      return fetchActivePlannedOutage(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useActiveNotificationCount = (params: CardParams) => {
  return useQuery({
    queryKey: ["ActiveNotificationCount", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.activeNotificationCount;
      }
      return fetchActiveNotificationCount(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useEnergizedOutage = (params: CardParams) => {
  return useQuery({
    queryKey: ["EnergizedOutage", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.energizedOutage;
      }
      return fetchEnergizedOutage(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useDashboardCards = (params: CardParams) => {
  return {
    activeNotificationCount: {
      data: useActiveNotificationCount(params).data,
      isLoading: useActiveNotificationCount(params).isLoading,
      error: useActiveNotificationCount(params).error,
    },
    activePlannedOutage: {
      data: useActivePlannedOutage(params).data,
      isLoading: useActivePlannedOutage(params).isLoading,
      error: useActivePlannedOutage(params).error,
    },
    activeUnplannedOutage: {
      data: useActiveUnplannedOutage(params).data,
      isLoading: useActiveUnplannedOutage(params).isLoading,
      error: useActiveUnplannedOutage(params).error,
    },
    energizedOutage: {
      data: useEnergizedOutage(params).data,
      isLoading: useEnergizedOutage(params).isLoading,
      error: useEnergizedOutage(params).error,
    },
  };
};

export const useAsideChartApi = (params: CardParams) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["NotificationSourceRate", params],
        queryFn: async () => {
          if (IS_MOCK) {
            await delay(1000);
            return mock.notificationSourceRate;
          }
          return fetchNotificationSourceRate(params);
        },
        retry: false,
      },
      {
        queryKey: ["CountByHourWithCity"],
        queryFn: async () => {
          if (IS_MOCK) {
            await delay(1000);
            return mock.countByHourWithCity;
          }
          return fetchCountByHourWithCity();
        },
        retry: false,
      },
    ],
  });

  const [getNotificationSourceRate, getCountByHourWithCity] = results;

  return {
    getNotificationSourceRate,
    getCountByHourWithCity,
  };
};

export const usePlannedAndUnplannedOutageRate = (params: CardParams) => {
  return useQuery({
    queryKey: ["PlannedAndUnplannedOutageRate", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.outageSummarySubCard;
      }
      return fetchPlannedAndUnplannedOutageRate(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const usePlumbedNotificationRate = () => {
  return useQuery({
    queryKey: ["PlumbedNotificationRate"],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.notificationSourceRate;
      }
      return fetchPlumbedNotificationRate();
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useNumberOfOutagesCityAndDistrict = (params: CardParams) => {
  return useQuery({
    queryKey: ["NumberOfOutagesCityAndDistrict", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.numberOfOutagesCityAndDistrict;
      }
      return fetchNumberOfOutagesCityAndDistrict(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useSubscriberWithoutEnergyCount = () => {
  return useQuery({
    queryKey: ["SubscriberWithoutEnergyCount"], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.subscriberWithoutEnergy;
      }
      return fetchSubscriberWithoutEnergyCount();
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useNumberOfInterruptionsByDay = (
  params: numberOfInterruptionsByDayParams,
) => {
  return useQuery({
    queryKey: ["NumberOfInterruptionsByDay", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.countByHourWithCity;
      }
      return fetchNumberOfInterruptionsByDay(params);
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useNotificationSourceSystemCount = () => {
  return useQuery({
    queryKey: ["NotificationSourceSystemCount"], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.notificationSourceSystemCount;
      }
      return fetchNotificationSourceSystemCount();
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useNotificationByCity = (
  params: numberOfInterruptionsByDayParams,
) => {
  return useQuery({
    queryKey: ["NotificationByCity", params], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.outageByCityWithHour;
      }
      return fetchNotificationByCity({
        dataParams: {
          start: params.start,
          end: params.end,
        },
      });
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};

export const useGetOutageByCityWithHourGroup = () => {
  return useQuery({
    queryKey: ["GetOutageByCityWithHourGroup"], // cache will vary by param
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mock.outageByCityWithHour;
      }
      return fetchOutageByCityWithHour();
    },
    staleTime: STALE_TIMES.SHORT, // 15 seconds
  });
};
