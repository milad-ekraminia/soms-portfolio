import {Card} from "@/components/ui/cards/card";
import CardWithLoader from "@/components/ui/cards/card-with-loader";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
import { calculateChange } from "@/helpers/calculateChange";
import { getTodayDate } from "@/helpers/get-today-date";
import { useUnplannedOutageCards } from "@/hooks/unPlanned-outage";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";

const UnplannedOutageCards = () => {
  const context = useTabContext();
  const response = useUnplannedOutageCards({
    referenceDate: getTodayDate("-"),
    dateType: context?.activePeriod ?? 1,
  });

  const cardConfigs = [
    {
      key: "activeUnplannedOutage",
      title: "Devam Eden Plansız Kesinti Sayısı",
      loader: response?.activeUnplannedOutage?.isLoading,
      current: response?.activeUnplannedOutage?.data?.unplannedOutage,
      previous: response?.activeUnplannedOutage?.data?.previousUnplannedOutage,
    },
    {
      key: "energizedOutage",
      title: "Enerjilendirilen Kesinti Sayısı",
      loader: response?.energizedOutage?.isLoading,
      current: response?.energizedOutage?.data?.energizedOutage,
      previous: response?.energizedOutage?.data?.previousEnergizedOutage,
    },
    {
      key: "archiveOutageCount",
      title: "Arşivlenen Kesinti Sayısı",
      loader: response?.archiveOutageCount?.isLoading,
      current: response?.archiveOutageCount?.data?.archievedOutage,
      previous: response?.archiveOutageCount?.data?.previousArchievedOutage,
    },
  ];

  return (
    <CardsWrapper variant="notification-outage">
      {cardConfigs.map(({ key, title, current, previous, loader }) => {
        if (loader) return <CardWithLoader key={key} />;
        // if (current == null || previous == null) return null;

        const { percentageChange, isIncrease } = calculateChange(
          current,
          previous
        );

        return (
          <Card
            key={key}
            title={title}
            count={current}
            periodicCount={previous ?? 0}
            percent={percentageChange}
            chartStatus={isIncrease}
          />
        );
      })}
    </CardsWrapper>
  );
};

export default UnplannedOutageCards;
