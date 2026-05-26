import { Button } from "@/components/ui/button/button";
import DateInput from "@/components/ui/input/date-input/date-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { Controller } from "react-hook-form";

interface Props {
  onClick: () => void;
  control: any;
  errors: any;
}
export const DateDrawerForm = ({ onClick, control, errors }: Props) => {
  return (
    <div className="date-drawer__form">
      <div className="dates-inputs">
        <Controller
          name={`startDateTime`}
          control={control}
          render={({ field }) => (
            <DateInput
              {...field}
              dateFormat="YYYY/MM/DD HH:mm:ss"
              hasTime={true}
              label="Başlangıç Zamanı"
              value={field.value}
              onChange={(dateStr: any) => {
                field.onChange(dateStr?.format("YYYY-MM-DD HH:mm:ss"));
              }}
              error={errors?.startDateTime?.message}
            />
          )}
        />
        <Controller
          name={`endDateTime`}
          control={control}
          render={({ field }) => (
            <DateInput
              {...field}
              dateFormat="YYYY/MM/DD HH:mm:ss"
              hasTime={true}
              label="Bitiş Zamanı"
              value={field.value}
              onChange={(dateStr: any) => {
                field.onChange(dateStr?.format("YYYY-MM-DD HH:mm:ss"));
              }}
              error={errors?.endDateTime?.message}
            />
          )}
        />
      </div>
      <Controller
        name={`description`}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="Değişiklik Nedeni"
            placeholder="Program değişikliği için nedeni girin."
            value={field.value}
            textAreaHandler={field.onChange}
            error={errors?.description?.message}
          />
        )}
      />
      <Button variant="secondary-color" onClick={onClick}>
        Değişiklik Detayını Görüntüle
      </Button>
    </div>
  );
};
