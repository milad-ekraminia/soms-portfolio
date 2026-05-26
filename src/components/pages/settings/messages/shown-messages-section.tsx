import { Button } from "@/components/ui/button/button";
import IphoneMockUp from "@/assets/images/iPhone mockup.svg";
import IphoneMockUpDark from "@/assets/images/iPhonemockupDark.svg";
import { MessageShape } from "@/assets/icons/messagee-shape";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";
import { replacePlaceholders } from "@/helpers/sms-id-to-place-holder";
import { useSelector } from "react-redux";
// will add type after api
interface ShownMessagesSectionProps {
  chosenSms: any;
  handlebackClick: (section: string) => void;
}
export const ShownMessagesSection = ({
  chosenSms,
  handlebackClick,
}: ShownMessagesSectionProps) => {
    const smsPreview = replacePlaceholders(chosenSms);
    const theme = useSelector((state: any) => state.theme?.mode || "light");

  return (
    <div className="mock-up">
      <div className="mock-up__header">
        <div className="mock-up__header-title">
          <Button
            leftIcon={<ArrowLeftSvg stroke="var(--fg-secondary-700)" />}
            variant="secondary"
            onClick={() => handlebackClick("")}
          ></Button>
          <h3 className="mock-up__header-title-text">Şablon Önizleme</h3>
        </div>
      </div>
      <div className="mock-up__content">
        <div className="mock-up__content-img-wrapper">
          <img
            src={theme === "dark" ? IphoneMockUpDark : IphoneMockUp}
            alt="mock-up"
            className="mock-up-img"
          />
          {chosenSms && (
            <div className="sms-texts">
              <div className="date">
                <span>Today 3:25 PM</span>
              </div>
              <div className="sms-texts-item">
                <span className="description">{smsPreview}</span>
                <div className="message-shape">
                  <MessageShape />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
