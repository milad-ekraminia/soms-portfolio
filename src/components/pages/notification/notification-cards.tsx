import { ActiveNotificationCardSvg } from "@/assets/icons/active-notification-card-svg";
import { CancelledNotificationSvg } from "@/assets/icons/cancelled-notification-svg";
import { NoPowerSvg } from "@/assets/icons/no-power-svg";
import CardWithLoader from "@/components/ui/cards/card-with-loader";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
import { Card } from "@/components/ui/cards/card";
import { calculateChange } from "@/helpers/calculateChange";
import { getTodayDate } from "@/helpers/get-today-date";
import { useNotificationCards } from "@/hooks/notifications";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { CardsDetail } from "@/components/ui/cards/cards-detail";
import { useMemo } from "react";

const NotificationCards = () => {
  const context = useTabContext();
  const params = useMemo(
    () => ({
      referenceDate: getTodayDate("-"),
      dateType: context?.activePeriod ?? 1,
    }),
    [context?.activePeriod],
  );
  const response = useNotificationCards(params);

  const cardConfigs = [
    {
      key: "activeUnplannedOutage",
      title: "Aktif Bildirim Sayısı",
      loader: response?.activeNotificationCount?.isLoading,
      current: response?.activeNotificationCount?.data?.activeNotificationCount,
      previous:
        response?.activeNotificationCount?.data?.previousNotificationCount,
      icon: (
        <ActiveNotificationCardSvg width="48" height="48" stroke="#2E90FA" />
      ),
      theme: "blue",
      // icon: <ActiveNotificationCardSvg  />,
      hasInfo: true,

      detailComponent: (
        <CardsDetail
          type="notification"
          data={{ ...response?.activeNotificationCount?.data?.breakdown }}
        />
      ),
    },
    {
      key: "activePlannedOutage",
      title: "İptal Edilen Bildirim Sayısı",
      loader: response?.cancelNotificationCount?.isLoading,
      current: response?.cancelNotificationCount?.data?.cancelNotificationCount,
      previous: response?.cancelNotificationCount?.data?.previousCount,
      icon: <NoPowerSvg width="48" height="48" stroke="#FDB022" />,
      theme: "yellow",
      hasInfo: true,

      // icon: <CancelledNotificationSvg />,
    },
    {
      key: "energizedOutage",
      title: "Kesintiye Atanan Bildirim Sayısı",
      loader: response?.outagesAssignedNotificationCount?.isLoading,
      current:
        response?.outagesAssignedNotificationCount?.data
          ?.outagesAssignedNotificationCount,
      previous: response?.outagesAssignedNotificationCount?.data?.previousCount,
      icon: (
        <CancelledNotificationSvg width="48" height="48" stroke="#9B8AFB" />
      ),
      theme: "purple",
      hasInfo: true,

      // icon: <AssignedNotificationSvg  />,
    },
  ];

  return (
    <CardsWrapper variant="notification-outage">
      {cardConfigs.map(
        ({
          key,
          title,
          current,
          previous,
          icon,
          loader,
          hasInfo,
          theme,
          detailComponent,
        }) => {
          if (loader) return <CardWithLoader key={key} />;
          if (current == null || previous == null) return null;

          const { percentageChange, isIncrease } = calculateChange(
            current,
            previous,
          );

          return (
            <Card
              key={key}
              title={title}
              count={current}
              periodicCount={previous}
              percent={percentageChange}
              chartStatus={isIncrease}
              svgIcon={icon}
              hasInfo={hasInfo ?? false}
              theme={theme}
              detailComponent={detailComponent}
            />
          );
        },
      )}
    </CardsWrapper>
  );
};

export default NotificationCards;
