import { getClassNames } from "@/helpers/get-class-names";
import { Message, Messages } from "@/types/components/pages/settings";
interface MessagesTabSectionProps {
  handleChosenSms: (sms: Message, section: string) => void;
  chosenSms: Messages;
  activeTab: string;
}
export const MessagesTabSection = ({
  chosenSms,
  handleChosenSms,
  activeTab,
}: MessagesTabSectionProps) => {
  return (
    <>
      <h3 className="title">Hazır Şablonlar</h3>
      {[1,2.3].map((item:any) => (
        <button
          className={getClassNames("message-item", [
            [chosenSms && chosenSms[activeTab]?.id == item?.id, "active"],
          ])}
          key={item.id}
          onClick={() => {
            handleChosenSms(item, activeTab);
          }}
        >
          <p className="message-text">test</p>
        </button>
      ))}
    </>
  );
};
