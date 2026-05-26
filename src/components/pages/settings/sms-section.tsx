import { useState } from "react";
import { ListMessages } from "./messages/list-messages";
import { ShownMessagesSection } from "./messages/shown-messages-section";
import { Message, Messages } from "@/types/components/pages/settings";
interface SmsSectionProps {
  handlebackClick: (section: string) => void;
  title: string;
  type:string;
  tabList: {
    title: string;
    value: string;
    id: number;
  }[];
}
export const SmsSection = ({ handlebackClick, title, tabList,type }: SmsSectionProps) => {
  console.log("🚀 ~ SmsSection ~ title:", title, tabList);
  // will add type after api
  const [chosenSms, setChosenSms] = useState<Messages>({});
  const handleChosenSms = (sms: Message, section?: string) => {
    setChosenSms((prev) => ({
      ...prev,
      [section || 'test']: sms,
    }));
  };
  return (
    <div className="sms-section">
      <ShownMessagesSection
        chosenSms={chosenSms}
        handlebackClick={handlebackClick}
      />
      <ListMessages
        handleChosenSms={handleChosenSms}
        chosenSms={chosenSms}
        setChosenSms={setChosenSms}
        type={type as "planned" | "unPlanned"}
      />
    </div>
  );
};
