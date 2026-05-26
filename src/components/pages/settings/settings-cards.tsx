import { SettingsSmsManagmentCards } from "@/components/pages/settings/cards/settings-sms-management-cards";
import SettingsDataManagmentCards from "./cards/settings-data-management-cards";
interface SettingsCardsProps {
  handleSectionClick: (section: string, title?: string) => void;
}
export const SettingsCards = ({ handleSectionClick }: SettingsCardsProps) => {
  return (
    <div className="settings-cards-wrapper">
      <SettingsSmsManagmentCards handleSectionClick={handleSectionClick} />

      <SettingsDataManagmentCards handleSectionClick={() => {}} />
    </div>
  );
};
