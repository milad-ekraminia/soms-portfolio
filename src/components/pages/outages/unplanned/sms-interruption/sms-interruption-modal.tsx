import { CheckIconSvg } from "@/assets/icons/check-svg";
import { CloseSvg } from "@/assets/icons/close-svg";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { getClassNames } from "@/helpers/get-class-names";

export const SmsInterruptionModal = ({
  status,
  setStatus,
  value,
  setValue,
}: {
  status: "true" | "false" | null;
  setStatus: any;
  value: any;
  setValue: any;
}) => {
  const statusHandler = (stat: any) => {
    setStatus(stat);
  };
  const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };
  return (
    <div className="sms-interruption-modal">
      <div className="sms-interruption-modal__status">
        <span className="title">
          <span> Yapmak istediğiniz işlemini seçiniz.</span>
          <span className="title__required">*</span>
        </span>
        <div className="options">
          <button
            onClick={() => {
              statusHandler("true");
            }}
            className={getClassNames("status-button", [
              [status == "true", "active-success"],
            ])}
          >
            <span
              className={getClassNames("icon-circle", [
                [status == "true", "active-true"],
              ])}
            >
              <CheckIconSvg
                height="20"
                width="20"
                stroke={
                  status == "true"
                    ? "var(--fg-white)"
                    : "var(--fg-tertiary-600)"
                }
              />
            </span>
            <span>Onayla</span>
          </button>
          <button
            onClick={() => {
              statusHandler("false");
            }}
            className={getClassNames("status-button", [
              [status == "false", "active-error"],
            ])}
          >
            <span
              className={getClassNames("icon-circle", [
                [status == "false", "active-error"],
              ])}
            >
              <CloseSvg
                height="20"
                width="20"
                stroke={
                  status == "false"
                    ? "var(--fg-white)"
                    : "var(--fg-tertiary-600)"
                }
              />
            </span>
            <span>Reddet</span>
          </button>
        </div>
      </div>
      <TextArea
        label="Açıklama"
        placeholder="Metin giriniz."
        value={value}
        textAreaHandler={textAreaHandler}
      />
    </div>
  );
};
