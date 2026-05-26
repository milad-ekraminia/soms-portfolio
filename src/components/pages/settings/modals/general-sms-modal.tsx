import DateInput from "@/components/ui/input/date-input/date-input";
import { Input } from "@/components/ui/input/Input";

const GeneralModalSms = () => {
  return (
    <div className="general-sms">
      <Input
        label="Bir müşteriye gönderilecek SMS Sayısı"
        placeholder="SMS sayısı giriniz."
      />
      <Input
        label="SMS  Gönderilecek Müşteri Limiti"
        placeholder="SMS limiti giriniz."
      />
      <div className="general-sms__times">
        <DateInput
          disableDayPicker
          hasTime={true}
          onChange={() => {}}
          label="Rahatsız Etme"
          placeHolder="00 : 00"
        />
        <DateInput
          disableDayPicker
          hasTime={true}
          onChange={() => {}}
          label=""
          placeHolder="00 : 00"
        />
      </div>
      <DateInput
        disableDayPicker
        hasTime={true}
        onChange={() => {}}
        label="Onaylanan Kesinti SMS Gönderilme Süresi"
        placeHolder="00 : 00"
      />
    </div>
  );
};

export default GeneralModalSms;
