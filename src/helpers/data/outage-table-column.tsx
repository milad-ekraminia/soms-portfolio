import { enumToOptions } from "../enum-converter";
import {
  OutageActivityTypes,
  OutageCauseTypes,
  OutageReasonTypes,
  OutageSourceTypes,
  OutageStatusTypes,
} from "@/definitions/enum";
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

export const outageColumns = (
  handleRowClick: (rowData: OutageItemType) => void,
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
      // Find existing filter for this column
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
          onClick={() => handleRowClick(info)}
        >
          <span>{info?.outageId}</span>
        </button>
      );
    },
  },
  {
    header: "İş Emri Numarası",
    accessorKey: "wfmExternalId", // (Input)
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "wfmExternalId"
      );

      return (
        <TextFilter
          columnKey="wfmExternalId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
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
    header: "Bitiş Tarihi",
    accessorKey: "endTime",
    size: 250,
    cell: ({ getValue }: any) => {
      const raw = getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "endTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"endTime"}
        />
      );
    },
  },
  {
    header: "Kesinti Süresi (S)",
    accessorKey: "durationInHours",
    size: 150,
    /* cell: ({ row }: any) => {
      const start: any = new Date(row.original.startTime);
      const end: any = new Date(row.original.endTime);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return "-";

      const diffInSeconds = Math.floor(
        (end.getTime() - start.getTime()) / 1000
      );
      if (diffInSeconds < 0) return "-";

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    }, */
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "durationInHours"
      );

      return (
        <TextFilter
          columnKey="durationInHours"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
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
    header: "Açıklama",
    accessorKey: "description",
    size: 200,
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "description"
      );

      return (
        <TextFilter
          columnKey="description"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Durum Kodu",
    accessorKey: "status",
    size: 150,
    cell: ({ row }: any) => {
      const translated = OutageStatusTypes[row.original.status];
      return <>{translated ? t(`Enum.${translated}`) : "-"}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "status");

      return (
        <MultiSelectInput
          options={enumToOptions(OutageStatusTypes)
            .filter((o) => o.displayName !== "Energized")
            .map((o) => ({
              ...o,
              displayName: t(`Enum.${o.displayName}`),
            }))}
          placeholder="Seçiniz"
          setValue={(value: any) => onFilterChange?.("status", "equals", value)}
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  /*  {
    header: "Planlı Kesinti Neden Kodu",
    accessorKey: "plannedOutageReason",
    size: 250,
    cell: ({ row }: any) => {
      const key = PlannedReasonTypes[row.original.plannedOutageReason];
      return <>{key ? t(`Enum.${key}`) : "-"}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "plannedOutageReason"
      );

      return (
        <MultiSelectInput
          options={enumToOptions(PlannedReasonTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("plannedOutageReason", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Planlanan Başlangıç",
    accessorKey: "plannedStart",
    size: 250,
    cell: ({ getValue }: any) => {
      const raw = getValue();
      return raw && dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "plannedStart" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"plannedStart"}
        />
      );
    },
  },
  {
    header: "Planlanan Bitiş",
    accessorKey: "plannedEnd",
    size: 250,
    cell: ({ getValue }: any) => {
      const raw = getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "plannedEnd" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"plannedEnd"}
        />
      );
    },
  }, */
  {
    header: "Kesinti Kaynağı",
    accessorKey: "outageSource", // Dropdown
    size: 250,
    cell: ({ row }: any) => {
      const source = OutageSourceTypes[row.original.outageSource];
      return (
        <>{source ? t(`Enum.${source}`, { defaultValue: source }) : "-"}</>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "outageSource"
      );

      return (
        <TextFilter
          columnKey="outageSource"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Kesinti Nedeni",
    accessorKey: "reason",
    size: 180,
    cell: ({ row }: any) => {
      const reason = OutageReasonTypes[row.original.reason];
      return (
        <>{reason ? t(`Enum.${reason}`, { defaultValue: reason }) : "-"}</>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "reason");
      return (
        <MultiSelectInput
          options={enumToOptions(OutageReasonTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) => onFilterChange?.("reason", "equals", value)}
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Kesinti Sebebi",
    accessorKey: "cause", // Dropdown
    size: 180,
    cell: ({ row }: any) => {
      const cause = OutageCauseTypes[row.original.cause];
      return <>{cause ? t(`Enum.${cause}`, { defaultValue: cause }) : "-"}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "cause");
      return (
        <MultiSelectInput
          options={enumToOptions(OutageCauseTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) => onFilterChange?.("cause", "equals", value)}
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Arşiv Durumu",
    accessorKey: "activityStatus", // Dropdown
    size: 180,
    cell: ({ row }: any) => {
      const activityStatus = OutageActivityTypes[row.original.activityStatus];
      return (
        <>
          {activityStatus
            ? t(`Enum.${activityStatus}`, { defaultValue: activityStatus })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "activityStatus"
      );
      return (
        <MultiSelectInput
          options={enumToOptions(OutageActivityTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("activityStatus", "equals", value)
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
    header: "Oluşturulma Tarihi",
    accessorKey: "createdAt",
    size: 250,
    cell: ({ getValue }: any) => {
      const raw = getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "createdAt" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"createdAt"}
        />
      );
    },
  },

  {
    header: "Güncelleme Tarihi",
    accessorKey: "updatedAt",
    flex: "unset",
    size: 250,
    cell: (info: any) => {
      const raw = info.getValue();

      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "updatedAt" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"updatedAt"}
        />
      );
    },
  },
  {
    header: "Etkilenen Müşteri Sayısı",
    accessorKey: "totalAffectedSubscribers", // Numeric Input
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
  /* {
    header: "Kesinti Şebeke Unsuru GIS Adı",
    accessorKey: "gisId1", // Text input
    size: 250,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "gisId1");

      return (
        <TextFilter
          columnKey="gisId1"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  }, */
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
    header: "Kullanıcı Adı",
    accessorKey: "customUserName", // Derived column
    size: 150,
    cell: () => "System",
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "customUserName"
      );

      return (
        <TextFilter
          columnKey="customUserName"
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
