import { DataSettingSvg } from "@/assets/icons/data-setting-svg";
import { Button } from "@/components/ui/button/button";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
interface SettingsDataManagmentCardsProps {
  handleSectionClick: (section: string, title?: string) => void;
}
const SettingsDataManagmentCards = ({
  handleSectionClick,
}: SettingsDataManagmentCardsProps) => {
  return (
    <div className="settings-cards">
      <h2 className="settings-cards__title">
        <span> Veri Yönetimi</span>
      </h2>
      <CardsWrapper variant="settings-data-cards">
        <div className="cards-wrapper__item">
          <div className="cards-wrapper__item-info">
            <h2 className="cards-wrapper__item-info-title">KVKK Ayarları</h2>
            <div className="cards-wrapper__item-info-actions">
              <Button
                variant="secondary"
                onClick={() => handleSectionClick("kvkk")}
              >
                Ayarları Görüntüle
              </Button>
            </div>
          </div>
          <div className="cards-wrapper__item-icon">
            <DataSettingSvg width="48" height="48" stroke="#D1E9FF" />
          </div>
        </div>
      </CardsWrapper>
    </div>
  );
};

export default SettingsDataManagmentCards;
