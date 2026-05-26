import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import DateInput from "../date-input";
import { ChevronLeftSvg } from "@/assets/icons/chevron-left-svg";
import "./year-date-input.scss";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";

interface YearDateInputProps {
  type: "month" | "year";
}

const YearDateInput = ({ type }: YearDateInputProps) => {

  const context = useTabContext();

  const [date, setDate] = useState(new DateObject());
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

  function update(key: "year" | "month", value: number) {
    const newDate = new DateObject(date);
    newDate.add(value, key);
    setDate(newDate);
  }

  useEffect(() => {
    const today = new Date(date.toDate());
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    context?.setActiveDate(`${year}-${month}-${day}`)
  },[date])
  return type === "year" ? (
    <div className="year-date-input">
      <button onClick={() => update("year", -1)}>
        <ChevronLeftSvg />
      </button>
      <span className="year-date-input-main">
        <span>{date.year}</span>
        <DateInput
          value={date}
          onlyYearPicker
          onChange={(date) => setDate(date)}
          calendarPosition="bottom-center"
        />
      </span>
      <button className="right-arrow" onClick={() => update("year", 1)}>
        <ChevronLeftSvg />
      </button>
    </div>
  ) : (
    <div className="year-date-input">
      <button onClick={() => update("month", -1)}>
        <ChevronLeftSvg />
      </button>
      <span className="year-date-input-main">
        <span>
          <span>{months[date.month.number - 1]}</span>
          <span>{date.year}</span>
        </span>
        <DateInput
          value={date}
          onlyMonthPicker
          onChange={(date) => setDate(date)}
          calendarPosition="bottom-center"
        />
      </span>
      <button className="right-arrow" onClick={() => update("month", 1)}>
        <ChevronLeftSvg />
      </button>
    </div>
  );
};

export default YearDateInput;
