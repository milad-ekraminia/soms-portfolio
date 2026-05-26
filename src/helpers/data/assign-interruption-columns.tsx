import { enumToOptions } from "../enum-converter";
import { OutageTypes } from "@/definitions/enum";
import { dateFormater } from "../format-data";
import { TFunction } from "i18next";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";
import { OutageItemType } from "@/types/components/pages/outage";

const noop = () => {};

export const assignInterupttionColumns = (
  handleIdClick: (rowData: OutageItemType) => void,
  t: TFunction,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void
) => [
  {
    header: "Kesinti Numarası",
    accessorKey: "outageId",
    flex: "unset",
    size: 200,
    sortType: "numeric",
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "outageId");
      return (
        <TextFilter
          columnKey="outageId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },

    cell: ({ row }: any) => {
      const info = row.original;

      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() => handleIdClick(info)}
        >
          <span>{info?.outageId}</span>
        </button>
      );
    },
  },
  {
    header: "Başlangıç Tarihi",
    accessorKey: "startTime",
    size: 250,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "startTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"startTime"}
        />
      );
    },
  },
  {
    header: "Şehir",
    accessorKey: "city",
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "city");

      return (
        <TextFilter
          columnKey="city"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "İlçe",
    accessorKey: "district",
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "district");

      return (
        <TextFilter
          columnKey="district"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Mahalle",
    accessorKey: "neighborhood",
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "neighborhood"
      );

      return (
        <TextFilter
          columnKey="neighborhood"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Kesinti Tipi",
    accessorKey: "outageType", // Dropdown
    size: 180,
    cell: ({ row }: any) => {
      const outageType = OutageTypes[row.original.outageType];
      return (
        <>
          {outageType
            ? t(`Enum.${outageType}`, { defaultValue: outageType })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "outageType");
      return (
        <MultiSelectInput
          options={enumToOptions(OutageTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("outageType", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "CBS Numarası",
    accessorKey: "gisId",
    size: 200,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "gisId");

      return (
        <TextFilter
          columnKey="gisId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Etkilenen Abone Sayısı",
    accessorKey: "totalAffectedSubscribers",
    size: 200,
    sortType: "numeric",
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "totalAffectedSubscribers"
      );

      return (
        <TextFilter
          columnKey="totalAffectedSubscribers"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "İstasyon İsmi",
    accessorKey: "stationName", // Dropdown-ish but unclear source
    size: 150,
    cell: ({ row }: any) => {
      const stationName = row.original.stationName ?? "-";
      const componentName = row.original.componentName ?? "-";
      return `${stationName} / ${componentName}`;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "stationName"
      );

      return (
        <TextFilter
          columnKey="stationName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  {
    header: "Kademe",
    accessorKey: "step", // Text input
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "step");

      return (
        <TextFilter
          columnKey="step"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Ana Kademe",
    accessorKey: "mainStep", // Text input
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "mainStep");

      return (
        <TextFilter
          columnKey="mainStep"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  {
    header: "Omp Numarası",
    accessorKey: "ompId", // Text input
    size: 150,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "ompId");

      return (
        <TextFilter
          columnKey="ompId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
];
