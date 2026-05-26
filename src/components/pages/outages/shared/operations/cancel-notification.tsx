import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { cancelationReasonsOptions } from "@/helpers/data/notification";
import { JSX } from "react";
import { Controller } from "react-hook-form";

interface CancelNotificationProps {
  cancelationStep: number;
  modalValues?: {
    title: string;
    type: string;
    text: JSX.Element | null;
    description: string;
  };
  handleCloseModal: () => void;
  control: any;
  errors: any;
  chosenRows: number[];
  setChosenRows: React.Dispatch<React.SetStateAction<number[]>>;
}
const CancelNotification = ({
  modalValues,
  cancelationStep,
  control,
  errors,
}: CancelNotificationProps) => {
  const renderContent = () => {
    if (cancelationStep == 0 || modalValues?.type != "cancel-notif") {
      return <p className="operation-notif-body">{modalValues?.text}</p>;
    } else {
      return (
        <div className="outage-cancelation__reason">
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                placeholder="İptal Nedeni seçiniz"
                label="İptal Nedeni"
                options={cancelationReasonsOptions ?? []}
                selected={field.value}
                setValue={field.onChange}
                error={errors.reason?.message}
                required={true}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Açıklama"
                placeholder="Metin giriniz."
                error={errors.description?.message}
              />
            )}
          />
        </div>
      );
    }
  };

  return renderContent();
};
export default CancelNotification;
