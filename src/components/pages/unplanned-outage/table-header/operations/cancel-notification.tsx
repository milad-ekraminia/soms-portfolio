import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { cancelationReasonsOptions } from "@/helpers/data/notification";
import { JSX } from "react";

interface CancelNotificationProps {
  cancelationStep: number;
  modalValues?: {
    title: string;
    type: string;
    text: JSX.Element | null;
    description: string;
  };
  handleCloseModal: () => void;
  formValues: { reason: number; description: string };
  setFormValues: React.Dispatch<
    React.SetStateAction<{ reason: number; description: string }>
  >;
  chosenRows: number[];
  setChosenRows: React.Dispatch<React.SetStateAction<number[]>>;
}
const CancelNotification = ({
  modalValues,
  cancelationStep,
  formValues,
  setFormValues,
}: CancelNotificationProps) => {
  const handleChange = (key: "reason" | "description", value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const renderContent = () => {
    if (cancelationStep == 0 || modalValues?.type != "cancel-notif") {
      return <p className="operation-notif-body">{modalValues?.text}</p>;
    } else {
      return (
        <div className="outage-cancelation__reason">
          <SelectInput
            placeholder="İptal Nedeni seçiniz"
            label="İptal Nedeni"
            setValue={(value: string) => handleChange("reason", value)}
            options={cancelationReasonsOptions ?? []}
          />
          <TextArea
            label="Açıklama"
            placeholder="Metin giriniz."
            value={formValues.description}
            textAreaHandler={(e) => handleChange("description", e.target.value)}
          />
        </div>
      );
    }
  };

  return renderContent();
};
export default CancelNotification;
