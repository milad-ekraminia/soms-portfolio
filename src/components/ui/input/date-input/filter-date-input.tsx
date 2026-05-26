import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "./date-input.scss";
import { CalendarSvg } from "@/assets/icons/calendar-svg";
import { ClockSvg } from "@/assets/icons/clock-svg";
import { Button } from "../../button/button";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const FilterDateInput = ({
  label,
  value,
  onChange,
  dateFormat = "YYYY-MM-DD HH:mm",
  minDate = new Date("1900-01-01"),
  hasTime = true,
  disableDayPicker = false,
  hideSeconds = false,
  minuteStep = 5,
  placeHolder = "Tarih seçiniz",
  disabled = false,
  hasClearBtn = false,
  error,
  required = false,
}: {
  label?: string;
  value?: Date | DateObject | string | null;
  onChange: (value: DateObject | null) => void;
  dateFormat?: string;
  minDate?: Date;
  hasTime?: boolean;
  disableDayPicker?: boolean;
  hideSeconds?: boolean;
  minuteStep?: number;
  placeHolder?: string;
  disabled?: boolean;
  hasClearBtn?: boolean;
  error?: string;
  required?: boolean;
}) => {
  const pickerRef = useRef<any>(null);
  const shouldCloseRef = useRef(false);
  const theme = useSelector((state: any) => state.theme?.mode || "light");

  const [tempValue, setTempValue] = useState<DateObject | null>(
    value ? new DateObject(value as any) : null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const FooterButtons = ({ position }: { position?: string }) => {
    console.log("🚀 ~ FooterButtons ~ position:", position)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px",
          gap: "10px",
          backgroundColor: "transparent",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            shouldCloseRef.current = true;
            setTempValue(value ? new DateObject(value as any) : null);
            pickerRef.current?.closeCalendar();
          }}
        >
          Kapat
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            shouldCloseRef.current = true;
            onChange(tempValue);
            pickerRef.current?.closeCalendar();
          }}
        >
          Seç
        </Button>
      </div>
    );
  };
  useEffect(() => {
    setTempValue(value ? new DateObject(value as any) : null);
  }, [value]);
  return (
    <div className="date-input">
      {label && (
        <label className="date-input__label">
          {label}
          {required && <span className="date-input__required">*</span>}
        </label>
      )}

      <DatePicker
        ref={pickerRef}
        value={tempValue}
        className={theme === "dark" ? "bg-dark" : ""}
        onChange={(date) => {
          setTempValue(date as DateObject | null);
        }}
        onOpen={() => {
          shouldCloseRef.current = false;
        }}
        onClose={() => {
          // Prevent closing if not triggered by button click
          if (!shouldCloseRef.current) {
            return false; // Prevent calendar from closing
          }
          // Allow closing if triggered by button
          shouldCloseRef.current = false;
        }}
        format={dateFormat}
        minDate={minDate}
        disableDayPicker={disableDayPicker}
        plugins={
          hasTime
            ? [
                <TimePicker
                  key="time"
                  position="bottom"
                  hideSeconds={hideSeconds}
                  mStep={minuteStep}
                />,
                <FooterButtons key="footer" position="bottom" />,
              ]
            : [<FooterButtons key="footer" position="bottom" />]
        }
        render={(value, openCalendar) => (
          <div className={`custom-date-input ${error ? "has-error" : ""}`}>
            <input
              placeholder={placeHolder}
              onClick={openCalendar}
              value={value}
              readOnly
              disabled={disabled}
            />

            {hasClearBtn && value && !disabled && (
              <button
                type="button"
                className="date-clear-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTempValue(null);
                  onChange(null);
                }}
              >
                ✕
              </button>
            )}

            {disableDayPicker ? <ClockSvg /> : <CalendarSvg />}
          </div>
        )}
      />

      {error && <p className="date-input__error">{error}</p>}
    </div>
  );
};

export default FilterDateInput;
