import CardWithLoader from "@/components/ui/cards/card-with-loader";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
import { Card } from "@/components/ui/cards/card";
import { calculateChange } from "@/helpers/calculateChange";
import { useDashboardCards } from "@/hooks/dashboard";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { CardsDetail } from "@/components/ui/cards/cards-detail";

const DashboardCards = () => {
  const context = useTabContext();
  const response = useDashboardCards({
    referenceDate: context?.activeDate,
    dateType: context?.activePeriod ?? 1,
  });

  const cardConfigs = [
    {
      key: "activeUnplannedOutage",
      title: "Devam Eden Plansız Kesinti",
      loader: response?.activeUnplannedOutage?.isLoading,
      current: response?.activeUnplannedOutage?.data?.unplannedOutage,
      previous: response?.activeUnplannedOutage?.data?.previousUnplannedOutage,
      theme: "redGreen",
      detailComponent: (
        <CardsDetail
          type="unplanned-outage"
          data={{ ...response?.activeUnplannedOutage?.data?.breakdown }}
        />
      ),
    },
    {
      key: "activePlannedOutage",
      title: "Devam Eden Planlı Kesinti",
      loader: response?.activePlannedOutage?.isLoading,
      current: response?.activePlannedOutage?.data?.plannedOutage,
      previous: response?.activePlannedOutage?.data?.previousPlannedOutage,
      theme: "redwithyellow",
      detailComponent: (
        <CardsDetail
          type="unplanned-outage"
          data={{ ...response?.activePlannedOutage?.data?.breakdown }}
        />
      ),
    },
    {
      key: "energizedOutage",
      title: "Enerjilendirilen Kesinti",
      loader: response?.energizedOutage?.isLoading,
      current: response?.energizedOutage?.data?.energizedOutage,
      previous: response?.energizedOutage?.data?.previousEnergizedOutage,
      theme: "yellowwithred",
      data: response,
      detailComponent: (
        <CardsDetail
          type="unplanned-outage"
          data={{ ...response?.energizedOutage?.data?.breakdown }}
        />
      ),
    },
    {
      key: "activeNotificationCount",
      title: "Aktif Bildirim",
      loader: response?.activeNotificationCount?.isLoading,
      current: response?.activeNotificationCount?.data?.activeNotificationCount,
      previous:
        response?.activeNotificationCount?.data?.previousNotificationCount,
      theme: "blue",
      detailComponent: (
        <CardsDetail
          type="notification"
          data={{ ...response?.activeNotificationCount?.data?.breakdown }}
        />
      ),
    },
  ];

  return (
    <CardsWrapper variant="dashboard">
      {cardConfigs.map(
        ({ key, title, current, previous, loader, theme, detailComponent }) => {
          if (loader) return <CardWithLoader key={key} />;
          if (current == null || previous == null) return null;

          const { percentageChange, isIncrease } = calculateChange(
            current,
            previous
          );

          return (
            <Card
              key={key}
              title={title}
              count={current}
              periodicCount={previous}
              percent={percentageChange}
              chartStatus={isIncrease}
              theme={theme}
              hasInfo={true}
              detailComponent={detailComponent}
            />
          );
        }
      )}
    </CardsWrapper>
  );
};

export default DashboardCards;
