import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "./date-input.scss";
import { CalendarSvg } from "@/assets/icons/calendar-svg";
import { ClockSvg } from "@/assets/icons/clock-svg";
import { useSelector } from "react-redux";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const DateInput = ({
  periodType = "",
  dateFormat,
  label,
  minDate = new Date("1900-01-01"),
  value,
  name,
  onChange,
  hasAllOption = true,
  hasMax = false,
  disableDayPicker = false,
  hasTime = true,
  placeHolder = "Tarih seçiniz",
  onlyMonthPicker,
  onlyYearPicker,
  range = false,
  calendarPosition,
  error,
  hideSeconds = false,
  minuteStep = 5,
  disabled = false,
  hasClearBtn = false,
  required = false,
}: {
  periodType?: string;
  dateFormat?: string;
  label?: string;
  minDate?: Date;
  value?: Date | string | DateObject;
  name?: string;
  onChange: (e: any) => void;
  hasAllOption?: boolean;
  hasMax?: boolean;
  disableDayPicker?: boolean;
  hasTime?: boolean;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  range?: boolean;
  hideSeconds?: boolean;
  placeHolder?: string;
  calendarPosition?: string;
  error?: string;
  minuteStep?: number;
  disabled?: boolean;
  hasClearBtn?: boolean;
  required?: boolean;
}) => {
    const theme = useSelector((state: any) => state.theme?.mode || "light");

  const periodTypeDataValue = hasAllOption
    ? parseInt(periodType)
    : parseInt(periodType) + 1;

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const weekDays = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  const getDateValue = () => {
    if (typeof value === "string" && value.includes("T")) {
      if (periodTypeDataValue === 1) {
        return new Date(new Date(value).setMinutes(0));
      }
      return new Date(value);
    }
    return value;
  };

  const effectiveFormat = disableDayPicker ? "HH:mm" : dateFormat;

  return (
    <div className="date-input">
      {label && (
        <label htmlFor={name} className="date-input__label">
          {label}
          {required && <span className="date-input__required">*</span>}
        </label>
      )}
      <DatePicker
        className={`test ${theme === "dark" ? "bg-dark" : ""}`}
        onlyMonthPicker={onlyMonthPicker}
        disableDayPicker={disableDayPicker}
        onlyYearPicker={onlyYearPicker}
        months={months}
        weekDays={weekDays}
        minDate={minDate}
        maxDate={hasMax ? new Date() : undefined}
        value={getDateValue()}
        onChange={onChange}
        format={effectiveFormat}
        range={range}
        calendarPosition={calendarPosition}
        style={{ width: "100%" }}
        plugins={
          !onlyMonthPicker && !onlyYearPicker && (disableDayPicker || hasTime)
            ? [
                <TimePicker
                  key={"timePicker"}
                  position="bottom"
                  hideSeconds={hideSeconds}
                  mStep={minuteStep}
                  style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: "100%",
                  }}
                />,
              ]
            : []
        }
        render={(value, openCalendar) => {
          return (
            <div className={`custom-date-input ${error ? "has-error" : ""}`}>
              <input
                placeholder={placeHolder}
                onClick={openCalendar}
                onChange={() => {}}
                value={value}
                disabled={disabled}
                style={{ width: "100%" }}
              />
              {value && !disabled && hasClearBtn && (
                <button
                  type="button"
                  className="date-clear-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(null);
                  }}
                >
                  ✕
                </button>
              )}
              {disableDayPicker ? <ClockSvg /> : <CalendarSvg />}
            </div>
          );
        }}
      />
      {error && <p className="date-input__error">{error}</p>}
    </div>
  );
};

export default DateInput;
