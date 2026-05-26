import { enumToOptions } from "../enum-converter";
import {
  OutageActivityTypes,
  PlannedOutageStatusTypes,
  PlannedReasonTypes,
} from "@/definitions/enum";
import { dateFormater } from "../format-data";
import { TFunction } from "i18next";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";

const noop = () => {};

export const plannedOutageAwaitingColumns = (
  handleRowClick: (rowData: number) => void,
  t: TFunction,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void,
  isAwaitingTable?: boolean
) =>
  [
    {
      header: "Planlı Kesinti Numarası",
      accessorKey: "plannedOutageId",
      flex: "unset",
      size: 220,
      sortType: "numeric",
      filterComponent: () => {
        // Find existing filter for this column
        const existingFilter = appliedFilters.find(
          (f) => f.key === "plannedOutageId"
        );

        return (
          <TextFilter
            columnKey="plannedOutageId"
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
            <span>{info?.plannedOutageId}</span>
          </button>
        );
      },
    },

    {
      header: "Planlanan Başlangıç Tarihi",
      accessorKey: "plannedStartDate",
      size: 250,
      cell: (info: any) => {
        const raw = info.getValue();
        if (!raw) return "-";
        return dateFormater(raw);
      },
      filterComponent: () => {
        const filter = appliedFilters.find(
          (f) => f.key === "plannedStartDate" && f.filterType === "between"
        );

        const value = (filter?.value ?? { start: "", end: "" }) as {
          start?: string;
          end?: string;
        };

        return (
          <DateRangeFilter
            onFilterChange={onFilterChange ?? noop}
            value={value}
            type={"plannedStartDate"}
          />
        );
      },
    },
    {
      header: "Planlanan Bitiş Tarihi",
      accessorKey: "plannedEndDate",
      size: 250,
      cell: ({ getValue }: any) => {
        const raw = getValue();
        if (!raw) return "-";
        return dateFormater(raw);
      },
      filterComponent: () => {
        const filter = appliedFilters.find(
          (f) => f.key === "plannedEndDate" && f.filterType === "between"
        );

        const value = (filter?.value ?? { start: "", end: "" }) as {
          start?: string;
          end?: string;
        };

        return (
          <DateRangeFilter
            onFilterChange={onFilterChange ?? noop}
            value={value}
            type={"plannedEndDate"}
          />
        );
      },
    },
    {
      header: "Planlanan Kesinti Süresi (S)",
      accessorKey: "durationInHours",
      size: 250,
      sortType: "numeric",

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

    !isAwaitingTable
      ? {
          header: "Planlanan Kesinti Durumu ",
          accessorKey: "statusCode",
          size: 200,
          cell: ({ row }: any) => {
            const translated =
              PlannedOutageStatusTypes[row.original.statusCode];

            return <>{translated ? t(`Enum.${translated}`) : "-"}</>;
          },
          filterComponent: () => {
            const existingFilter = appliedFilters.find(
              (f) => f.key === "statusCode"
            );
            const options = enumToOptions(PlannedOutageStatusTypes)
              ?.filter((item) => item?.id != 1)
              .map((o) => ({
                ...o,
                displayName: t(`Enum.${o.displayName}`),
              }));
            return (
              <MultiSelectInput
                options={options}
                placeholder="Seçiniz"
                setValue={(value: any) =>
                  onFilterChange?.("statusCode", "equals", value)
                }
                selected={existingFilter?.value as any}
              />
            );
          },
        }
      : null,
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
      header: "Planlı Kesinti Nedeni",
      accessorKey: "outageReasonCode",
      size: 250,
      cell: ({ row }: any) => {
        const key = PlannedReasonTypes[row.original.outageReasonCode];
        return <>{key ? t(`Enum.${key}`) : "-"}</>;
      },
      filterComponent: () => {
        const existingFilter = appliedFilters.find(
          (f) => f.key === "outageReasonCode"
        );

        return (
          <MultiSelectInput
            options={enumToOptions(PlannedReasonTypes).map((o) => ({
              ...o,
              displayName: t(`Enum.${o.displayName}`),
            }))}
            placeholder="Seçiniz"
            setValue={(value: any) =>
              onFilterChange?.("outageReasonCode", "equals", value)
            }
            selected={existingFilter?.value as any}
          />
        );
      },
    },

    {
      header: "CBS Numarası",
      accessorKey: "cbsid",
      size: 200,
      filterComponent: () => {
        const existingFilter = appliedFilters.find((f) => f.key === "cbsid");

        return (
          <TextFilter
            columnKey="cbsid"
            value={(existingFilter?.value as string) ?? ""}
            filterType={existingFilter?.filterType ?? "equals"}
            onFilterChange={onFilterChange ?? noop}
          />
        );
      },
    },

    {
      header: "Etkilenen abone Sayısı",
      accessorKey: "affectedCustomerCount", // Numeric Input
      size: 200,
      sortType: "numeric",
      filterComponent: () => {
        const existingFilter = appliedFilters.find(
          (f) => f.key === "affectedCustomerCount"
        );

        return (
          <TextFilter
            columnKey="affectedCustomerCount"
            value={(existingFilter?.value as string) ?? ""}
            filterType={existingFilter?.filterType ?? "equals"}
            onFilterChange={onFilterChange ?? noop}
          />
        );
      },
    },
  ].filter(Boolean) as any;
