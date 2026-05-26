import MainLayout from "@/components/layouts/page-layout/main-layout";
import FilterBox from "@/components/pages/life-cycle/filter-box";
import InfoBox from "@/components/pages/life-cycle/info-box";
import { useState } from "react";

const YasamDongusu = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [outageNumber, setOutageNumber] = useState<number | null>(null);

  return (
    <MainLayout
      title="Yaşam Döngüsü"
      hasNotification={false}
      className="layout__page__life-cycle"
    >
      <FilterBox
        outageNumber={outageNumber}
        setOutageNumber={setOutageNumber}
      />
      <InfoBox
        outageNumber={outageNumber}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </MainLayout>
  );
};

export default YasamDongusu;
