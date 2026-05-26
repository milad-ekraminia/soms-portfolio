import { settingsTopCards } from "@/helpers/data/settings";
import "../settings.scss";
import { Button } from "@/components/ui/button/button";
import { MultiUsersSvg } from "@/assets/icons/multi-users-svg";
import { RoleSvg } from "@/assets/icons/role-svg";
import CardsWrapper from "@/components/ui/cards/cards-wrapper/cards-wrapper";
interface SettingsUserManagmentCardsProps {
  handleSectionClick: (section: string, title?: string) => void;
}
export const SettingsUserManagmentCards = ({
  handleSectionClick,
}: SettingsUserManagmentCardsProps) => {
  return (
    <div className="settings-cards">
      <h2 className="settings-cards__title">Kullanıcı Yönetimi</h2>

      <CardsWrapper variant="settings-user-cards">
        <div className="settings-bot-cards__item">
          <h2 className="settings-bot-cards__item-title">
            <MultiUsersSvg />
            <span>{settingsTopCards[0].title}</span>
          </h2>
          <div className="settings-bot-cards__item-actions">
            <Button
              variant="secondary"
              onClick={() => handleSectionClick("users-table")}
            >
              {settingsTopCards[0].btnText}
            </Button>
            <Button variant="primary">{settingsTopCards[0].title}</Button>
          </div>
        </div>
        <div className="settings-bot-cards__item">
          <div className="card-info">
            <h2 className="settings-bot-cards__item-title">
              <RoleSvg />
              <span>{settingsTopCards[1].title}</span>
            </h2>
          </div>
          <Button
            variant="secondary"
            onClick={() => handleSectionClick("roles-table")}
          >
            {settingsTopCards[1].btnText}
          </Button>
        </div>
      </CardsWrapper>
    </div>
  );
};
