import { NoRefreshSvg } from "@/assets/icons/no-refresh-svg";
import { RefreshSvg } from "@/assets/icons/refresh-svg";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";
import { getClassNames } from "@/helpers/get-class-names";
import { setRefreshInterval } from "@/store/app/refresh-slice";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
type RefreshInterval = number | false;

const REFRESH_OPTIONS: { label: string; value: RefreshInterval }[] = [
  { label: "15 saniye", value: 15000 },
  { label: "30 saniye", value: 30000 },
  { label: "1 dakika", value: 60000 },
  { label: "Otomatik yenilemeyi durdur", value: false },
];
const formatFullDateTime = (date: Date) => {
  const d = date.toLocaleDateString("tr-TR");
  const t = date.toLocaleTimeString("tr-TR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${d} ${t}`;
};
export const Refresh = ({ pageKey }: { pageKey: string }) => {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const dispatch = useDispatch();
  const refreshInterval = useSelector(
    (state: any) => state.refresh[pageKey] ?? false
  );
  const isFetching = useIsFetching() > 0;
  const activeOption = () => {
    const selectedValue: any = REFRESH_OPTIONS.find(
      (opt) => opt.value === refreshInterval
    );
    if (!selectedValue?.value) {
      return "Kapalı";
    }
    return selectedValue?.label;
  };

  useEffect(() => {
    if (!isFetching) {
      setLastRefresh(new Date());
    }
  }, [isFetching, refreshInterval]);
  return (
    <div className="refresh-wrapper">
      <DropdownWrapper
        toggleBtn={
          <button
            style={{ backgroundColor: "unset" }}
            className="pages-header__actions-refresher"
          >
            <span className="refresh-icon">
              {activeOption() == "Kapalı" ? (
                <NoRefreshSvg />
              ) : (
                <RefreshSvg
                  className={`${isFetching ? "rotate" : ""} `}
                  stroke={
                    isFetching
                      ? "var(--fg-brand-primary-600)"
                      : "var(--fg-quaternary-500)"
                  }
                />
              )}
            </span>
            <span className="refresh-time">
              <span className="title">Otomatik Yenileme:</span>
              <span
                className={getClassNames("value", [
                  [activeOption() == "Kapalı", "disabled"],
                ])}
              >
                {activeOption()}
              </span>
            </span>
          </button>
        }
        closeButton={false}
        leftOffset={"-220px"}
        size="small"
        closeOnClick
      >
        <ul className="pages-header__actions-refresh-list">
          {REFRESH_OPTIONS.map((opt) => (
            <li
              key={opt.label}
              className={`refresh-list-item ${
                opt.value === false ? "refresh-list-item-disable" : ""
              }`}
              onClick={() =>
                dispatch(
                  setRefreshInterval({ page: pageKey, interval: opt.value })
                )
              }
            >
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      </DropdownWrapper>
      {lastRefresh && (
        <span className="refresh-last-time">
          Son Güncelleme: {formatFullDateTime(lastRefresh)}
        </span>
      )}
    </div>
  );
};
