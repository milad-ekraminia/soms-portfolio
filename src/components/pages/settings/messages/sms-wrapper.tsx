import { useState } from "react";
import { ShownMessagesSection } from "../messages/shown-messages-section";
import { ListMessages } from "./list-messages";
import { convertIdsToPlaceholders } from "@/helpers/sms-id-to-place-holder";
interface SmsSectionProps {
  handlebackClick: (section: string) => void;
  type: "unPlanned" | "planned";
}
export const SmsSection = ({ handlebackClick, type }: SmsSectionProps) => {
  // will add type after api
  const [chosenSms, setChosenSms] = useState<any>();
  const handleChosenSms = (sms: string) => {
    setChosenSms(sms);
  };
  return (
    <div className="sms-section">
      <ShownMessagesSection
        chosenSms={convertIdsToPlaceholders(chosenSms?.content)}
        handlebackClick={handlebackClick}
      />
      <ListMessages
        handleChosenSms={handleChosenSms}
        chosenSms={chosenSms}
        setChosenSms={setChosenSms}
        type={type}
      />
    </div>
  );
};
