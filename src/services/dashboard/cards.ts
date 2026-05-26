import { getData } from "@/lib/api-method/api-method-functions";
import {
  EnergizedOutageCard,
  NotificationCard,
  PlannedOutageCard,
  unPlannedOutageCard,
} from "@/types/components/pages/dashboard";
import { CardParams } from "@/types/services/cards";

export async function fetchActiveNotificationCount({
  referenceDate,
  dateType,
}: CardParams): Promise<NotificationCard> {
  return await getData<NotificationCard>({
    endPoint: `${dateType}/active-notification-count`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchActivePlannedOutage({
  referenceDate,
  dateType,
}: CardParams): Promise<PlannedOutageCard> {
  return await getData<PlannedOutageCard>({
    endPoint: `${dateType}/active-planned-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchActiveUnplannedOutage({
  referenceDate,
  dateType,
}: CardParams): Promise<unPlannedOutageCard> {
  return await getData<unPlannedOutageCard>({
    endPoint: `${dateType}/active-unplanned-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchEnergizedOutage({
  referenceDate,
  dateType,
}: CardParams): Promise<EnergizedOutageCard> {
  return await getData<EnergizedOutageCard>({
    endPoint: `${dateType}/energized-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}
