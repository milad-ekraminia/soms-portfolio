import { DownloadSvg } from "@/assets/icons/download-svg";
import { RefreshSvg } from "@/assets/icons/refresh-svg";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import Tabs from "@/components/ui/tabs/tabs";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "./list-item";
import Pagination from "@/components/ui/Table/pagination/Pagination";
import { useOutageByFilter } from "@/hooks/ogss/outage/use-outage-by-filter";
import DateInput from "@/components/ui/input/date-input/date-input";
import { getTodayRange } from "@/helpers/get-today-range";

const tabs = [
  { id: 0, title: "Aktif Kesintiler", active: true, value: "active" },
  { id: 1, title: "Pasif Kesintiler", active: false, value: "passive" },
];
const selectOptions = [
  {
    displayName: "Kesinti Numarasıyla",
    value: 1,
    id: 1,
  },
  {
    displayName: "Bildirim Numarasıyla",
    value: 2,
    id: 2,
  },
  {
    displayName: "Omp Adıyla",
    value: 3,
    id: 3,
  },
  {
    displayName: "Başlangıç Zamanıyla",
    value: 4,
    id: 4,
  },
];
export const ListSideBar = () => {
  const { startOfDay, endOfDay } = getTodayRange();

  const [activeTab, setActiveTab] = useState("active");
  const [chosenValue, setChosenValue] = useState(selectOptions[0].value);
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const defaultFilters = useMemo(
    () => [
      {
        key: "StartDateTime",
        value: startOfDay,
        filterType: "greaterthanorequals",
      },
      { key: "EndDateTime", value: endOfDay, filterType: "lesserthanorequals" },
    ],
    [activeTab]
  );
  useEffect(() => {
      const noSearchFilters =
        !inputValue && !startDate && !endDate && !hasSearched;
          if (noSearchFilters) {

    applyFilter.mutate({
      appliedFilters: defaultFilters,
      page: 1,
      pageSize: 20,
      isActive: activeTab === "active",
      sorting:'id'
    })}
  }, [activeTab]);
  const handleSelectChange = (value: string) => {
    const numericValue = Number(value);
    setChosenValue(numericValue);
    // Reset form state on change
    setInputValue("");
    setStartDate("");
    setEndDate("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const applyFilter = useOutageByFilter();
  const { data, isPending, isSuccess } = applyFilter;

  const handleSearch = (
    isNewPage?: boolean,
    pageNumber?: number,
    manualPageSize?: number
  ) => {
    const filters = [];
    let sorting = "";

    if (chosenValue === 1) {
      filters.push({ key: "Id", value: inputValue, filterType: "equals" });
      sorting = "Id DESC";
    } else if (chosenValue === 2) {
      filters.push({
        key: "notificationId",
        value: inputValue,
        filterType: "equals",
      });
      sorting = "Id";
    } else if (chosenValue === 3) {
      filters.push({ key: "ompName", value: inputValue, filterType: "equals" });
      sorting = "Id";
    } else if (chosenValue === 4) {
      filters.push({
        key: "StartDateTime",
        value: startDate,
        filterType: "greaterthanorequals",
      });
      filters.push({
        key: "EndDateTime",
        value: endDate,
        filterType: "lesserthanorequals",
      });
      sorting = "Id";
    }

    setHasSearched(true);
    if (!isNewPage) {
      setPage(1);
      setPageSize(20);
      applyFilter.mutate({
        appliedFilters: filters,
        page: 1, // 👈 Always start at first page
        pageSize: 20,
        isActive: activeTab === "active",
        sorting,
      });
    } else {
      applyFilter.mutate({
        appliedFilters: filters,
        page: pageNumber ?? 1,
        pageSize: manualPageSize ?? pageSize,
        isActive: activeTab === "active",
        sorting,
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (hasSearched) {
      handleSearch(true, newPage);
    }
  };
  const handlePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);

    if (hasSearched) {
      handleSearch(true, 1, value);
    }
  };

  return (
    <div className="list-sidebar">
      <div className="tab-container">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      </div>
      <div className="list-sidebar__filter-section">
        <SelectInput
          setValue={handleSelectChange}
          options={selectOptions?.map((option) => ({
            displayName: `${option.displayName} Ara`,
            value: option.value,
            id: option.id,
          }))}
          placeholder="Filtre Seçenekleri"
          selected={chosenValue}
        />
        {chosenValue == 4 ? (
          <>
            <DateInput
              dateFormat="YYYY/MM/DD HH:mm:ss"
              onChange={(value) => {
                const newStart = value?.format("YYYY-MM-DD HH:mm:ss") || "";
                setStartDate(newStart);
              }}
              label="Başlangıç Tarihi Seçiniz"
              value={startDate}
              hasClearBtn
            />
            <DateInput
              dateFormat="YYYY/MM/DD HH:mm:ss"
              onChange={(value) => {
                const newEnd = value?.format("YYYY-MM-DD HH:mm:ss") || "";
                setEndDate(newEnd);
              }}
              label="Bitiş Tarihi Seçiniz"
              value={endDate}
              hasClearBtn
            />
          </>
        ) : (
          <Input
            label={selectOptions[chosenValue - 1]?.displayName}
            placeholder={
              chosenValue == 1
                ? "Kesinti Numarası Giriniz"
                : chosenValue == 2
                  ? "Bildirim Numarası Giriniz"
                  : "OMP Adı Giriniz"
            }
            onChange={handleInputChange}
            value={inputValue}
          />
        )}
        <Button
          variant="primary"
          onClick={() => {
            handleSearch(false, 1, 10);
          }}
        >
          Ara
        </Button>
      </div>
      <div className="list-sidebar__actions">
        <Button variant="secondary">
          <DownloadSvg stroke="#344054" />
        </Button>
        <Button variant="secondary">
          <RefreshSvg stroke="#344054" />
        </Button>
      </div>
      <div className="list-sidebar__list">
        {isPending && (
          <div style={{ color: "var(--text-secondary-700)" }}>Loading...</div>
        )}
        {isSuccess &&
          data?.data?.items?.map((item: any) => (
            <ListItem key={item.id} data={item} />
          ))}
        {isSuccess && data?.data?.items?.length === 0 && (
          <div>sonuç bulunamadı</div>
        )}
      </div>
      {isSuccess && data?.data?.items?.length > 0 && (
        <div className="list-sidebar__footer">
          <Pagination
            currentPage={page ?? 1}
            totalPages={data?.totalPages ?? 1}
            onPageChange={handlePageChange}
            hasCount={true}
            isFullWidth={false}
            setPageSize={handlePageSize}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
};
