import { EnergizedCardOutageSvg } from "@/assets/icons/energized-card-outage-svg";
import { FolderArchiveSvg } from "@/assets/icons/folder-archive-svg";
import { UnplannedCardSVG } from "@/assets/icons/unplanned-card-svg";
import CardWithLoader from "@/components/ui/cards/card-with-loader";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
import { Card } from "@/components/ui/cards/card";
import { calculateChange } from "@/helpers/calculateChange";
import { getTodayDate } from "@/helpers/get-today-date";
import { useUnplannedOutageCards } from "@/hooks/outage/unPlanned-outage";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { CardsDetail } from "@/components/ui/cards/cards-detail";

const UnplannedOutageCards = ({
  cardsResponse,
  // smsResponse,
  loading,
}: {
  cardsResponse?: any;
  // smsResponse?: any;
  loading?: boolean;
}) => {
  const context = useTabContext();
  const defaultResponse = useUnplannedOutageCards({
    referenceDate: getTodayDate("-"),
    dateType: context?.activePeriod ?? 1,
  });

  const response = cardsResponse ?? defaultResponse;
  // const smsHook = smsResponse
  //   ? { data: smsResponse, isLoading: !!loading }
  //   : useFetchSmsInterruptioons();
  // const { data, isLoading } = smsHook;
  const cardConfigs = [
    {
      key: "activeUnplannedOutage",
      title: "Devam Eden Plansız Kesinti Sayısı",
      loader: response?.activeUnplannedOutage?.isLoading,
      current: response?.activeUnplannedOutage?.data?.unplannedOutage,
      previous: response?.activeUnplannedOutage?.data?.previousUnplannedOutage,
      icon: <UnplannedCardSVG width="48" height="48" stroke="#F97066" />,
      theme: "redGreen",
      hasInfo: true,

      detailComponent: (
        <CardsDetail
          type="unplanned-outage"
          data={{
            ...response?.activeUnplannedOutage?.data?.breakdown,
          }}
        />
      ),
    },
    {
      key: "energizedOutage",
      title: "Enerjilendirilen Kesinti Sayısı",
      loader: response?.energizedOutage?.isLoading,
      current: response?.energizedOutage?.data?.energizedOutage,
      previous: response?.energizedOutage?.data?.previousEnergizedOutage,
      icon: <EnergizedCardOutageSvg width="48" height="48" stroke="#FDB022" />,
      theme: "yellowwithred",
      hasInfo: true,

      detailComponent: (
        <CardsDetail
          type="unplanned-outage"
          data={{
            ...response?.energizedOutage?.data?.breakdown,
          }}
        />
      ),
    },
    {
      key: "archiveOutageCount",
      title: "Arşivlenen Kesinti Sayısı",
      loader: response?.archiveOutageCount?.isLoading,
      current: response?.archiveOutageCount?.data?.archievedOutage,
      previous: response?.archiveOutageCount?.data?.previousArchievedOutage,
      icon: <FolderArchiveSvg width="48" height="48" stroke="#9B8AFB" />,
      theme: "justpurple",
    },
  ];

  return (
    <CardsWrapper variant="unplanned-outage">
      {cardConfigs.map(
        ({
          key,
          title,
          current,
          previous,
          loader,
          icon,
          theme,
          detailComponent,
          hasInfo,
        }) => {
          if (loader || (!!loading && !cardsResponse))
            return <CardWithLoader key={key} />;

          const { percentageChange, isIncrease } = calculateChange(
            current ?? 0,
            previous ?? 0,
          );

          return (
            <Card
              key={key}
              title={title}
              count={current ?? 0}
              periodicCount={previous ?? 0}
              percent={percentageChange}
              chartStatus={isIncrease}
              svgIcon={icon}
              theme={theme}
              detailComponent={detailComponent}
              hasInfo={hasInfo}
            />
          );
        },
      )}
      {/* {isLoading || (!!loading && !smsResponse) ? (
        <CardWithLoader />
      ) : (
        <SmsInterruptionCard
          title={"Plansız SMS Onay Bekleyen"}
          count={data?.data?.totalCount}
          theme={"danger"}
          svgIcon={<SmsCheckedSvg stroke="var(--utility-error-400)" />}
        />
      )} */}
    </CardsWrapper>
  );
};

export default UnplannedOutageCards;
