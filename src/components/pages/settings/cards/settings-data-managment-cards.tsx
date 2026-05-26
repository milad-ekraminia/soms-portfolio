import { SecuritySvg } from "@/assets/icons/security-svg";
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
      <h2 className="settings-cards__title">Veri Yönetimi</h2>
      <CardsWrapper variant="settings-data-cards">
        <div className="settings-top-cards">
          <div className="settings-top-cards__item">
            <div className="settings-top-cards__item-info">
              <SecuritySvg />
              <h2 className="card-title">KVKK Ayarları</h2>
            </div>
            <div className="settings-top-cards__item-actions">
              <Button
                variant="secondary"
                onClick={() => handleSectionClick("kvkk")}
              >
                Ayarları Görüntüle
              </Button>
            </div>
          </div>
        </div>
      </CardsWrapper>
    </div>
  );
};

export default SettingsDataManagmentCards;
