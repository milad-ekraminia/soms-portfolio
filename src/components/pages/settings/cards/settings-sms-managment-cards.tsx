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
      <h2 className="settings-cards_title">SMS Yönetimi</h2>
      <CardsWrapper variant="settings-sms-cards">
        {settingsTopCards.map((item) => (
          <div className="settings-top-cards" key={item.id}>
            <div className="settings-top-cards__item">
              <div className="settings-top-cards__item-info">
                {item.icon}
                <h2 className="card-title">{item.title}</h2>
              </div>
              <div className="settings-top-cards__item-actions">
                <Button
                  variant="secondary"
                  onClick={() => handleSectionClick(item.type, item?.title)}
                >
                  {item.btnText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardsWrapper>
    </div>
  );
};
