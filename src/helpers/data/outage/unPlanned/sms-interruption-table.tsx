import {
  ApprovalTriggerRuleType,
  MessageCategorieses,
} from "@/definitions/enum";
import { TFunction } from "i18next";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";
import { enumToOptions } from "@/helpers/enum-converter";
import { dateFormater } from "@/helpers/format-data";
const noop = () => {};

export const smsInterupttionColumns = (
  handleIdClick: (rowData: any) => void,
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
    header: "SMS Kategorisi",
    accessorKey: "smsCategory",
    size: 150,
    cell: ({ row }: any) => {
      const smsCategoryEnum = MessageCategorieses[row.original.outageType];
      return (
        <>
          {smsCategoryEnum
            ? t(`Enum.${smsCategoryEnum}`, { defaultValue: smsCategoryEnum })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "smsCategory"
      );
      return (
        <MultiSelectInput
          options={enumToOptions(MessageCategorieses).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("smsCategory", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Onaya Sunulduğu Tarih",
    accessorKey: "requestedAt",
    size: 150,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "requestedAt" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"requestedAt"}
        />
      );
    },
  },
  {
    header: "Onaya Sunulma Sebebi",
    accessorKey: "approvalTriggerRule",
    size: 150,
    cell: ({ row }: any) => {
      const approvalTriggerRuleEnum =
        ApprovalTriggerRuleType[row.original.approvalTriggerRule];
      return (
        <>
          {approvalTriggerRuleEnum
            ? t(`Enum.${approvalTriggerRuleEnum}`, {
                defaultValue: approvalTriggerRuleEnum,
              })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "approvalTriggerRule"
      );
      return (
        <MultiSelectInput
          options={enumToOptions(ApprovalTriggerRuleType).map((o) => {

            return {
              ...o,
              displayName: t(`Enum.${o.displayName}`),
            };
          })}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("approvalTriggerRule", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
];
