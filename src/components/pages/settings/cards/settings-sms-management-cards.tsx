import "../settings.scss";
import { settingsTopCards } from "@/helpers/data/settings";
import { Button } from "@/components/ui/button/button";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
interface SettingsSmsManagmentCardsProps {
  handleSectionClick: (section: string, title?: string) => void;
}
export const SettingsSmsManagmentCards = ({
  handleSectionClick,
}: SettingsSmsManagmentCardsProps) => {
  return (
    <div className="settings-cards">
      <h2 className="settings-cards__title">
        <span>SMS Yönetimi</span>
      </h2>
      <CardsWrapper variant="settings-sms-cards">
        {settingsTopCards.map((item) => (
          <div className="cards-wrapper__item" key={item.id}>
            <div className="cards-wrapper__item-info">
              <h2 className="cards-wrapper__item-info-title">{item.title}</h2>
              <div className="cards-wrapper__item-info-actions">
                <Button
                  variant="secondary"
                  onClick={() => handleSectionClick(item.type, item?.title)}
                >
                  {item.btnText}
                </Button>
              </div>
            </div>
            <div className="cards-wrapper__item-icon"> {item.icon}</div>
          </div>
        ))}
      </CardsWrapper>
    </div>
  );
};
