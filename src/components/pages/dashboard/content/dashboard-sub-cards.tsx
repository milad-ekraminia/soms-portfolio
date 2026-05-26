import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
import OutageRateCard from "../sub-cards/outage-rate-card";
import SubscribersCountCard from "../sub-cards/subscribers-count-card";

const DashboardSubCards = () => {
  return (
    <CardsWrapper variant="subs">
      <SubscribersCountCard />
      <OutageRateCard />
    </CardsWrapper>
  );
};

export default DashboardSubCards;
