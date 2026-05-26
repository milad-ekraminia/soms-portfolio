import { TFunction } from "i18next";
import { dateFormater } from "../format-data";
import { SourceSystems } from "@/definitions/enum";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";
import { enumToOptions } from "../enum-converter";
const noop = () => {};

export const outageTreeDetailsTabs = [
  {
    title: "DETAY",
    value: "data",
    id: 1,
  },
  {
    title: "BİRLEŞTİRİLMİŞ KESİNTİLER",
    value: "interruptions",
    id: 2,
  },
  {
    title: "BİLDİRİMLER",
    value: "notifications",
    id: 3,
  },
  {
    title: "İZLEYEN CİHAZLAR",
    value: "devices",
    id: 4,
  },
];
export const detailInteruptionColumn = (
  handleRowClick: (rowData: number, type: string) => void,
  NodeElementHandler: (rowData: number, type: string) => void,
  sliceData: any,
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
    cell: ({ getValue }: any) => (
      <button
        className="outage-document-cell linked-button"
        onClick={() => handleRowClick(getValue(), "outage")}
      >
        <span>{getValue()}</span>
      </button>
    ),
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
  },

  {
    header: "Birleştiği Kesinti Numarası",
    accessorKey: "mergedOutageId",
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "mergedOutageId"
      );

      return (
        <TextFilter
          columnKey="mergedOutageId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  {
    header: "Başlangıç Zamanı",
    accessorKey: "startDateTime",
    flex: "unset",
    size: 150,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "startDateTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"startDateTime"}
        />
      );
    },
  },
  {
    header: "Bitiş Tarihi",
    accessorKey: "endDateTime",
    flex: "unset",
    size: 150,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "endDateTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"endDateTime"}
        />
      );
    },
  },
  {
    header: "OMP Numarası",
    accessorKey: "ompId",
    flex: "unset",
    size: 100,
    filterComponent: () => {
      // Find existing filter for this column
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
  {
    header: "OMP Adı",
    accessorKey: "ompName",
    flex: "unset",
    size: 100,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "ompName");

      return (
        <TextFilter
          columnKey="ompName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Birleşme Tipi",
    accessorKey: "outageStatusType",
    flex: "unset",
    size: 100,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "outageStatusType"
      );

      return (
        <TextFilter
          columnKey="outageStatusType"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "CBS ID",
    accessorKey: "cbsId",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "cbsId");

      return (
        <TextFilter
          columnKey="cbsId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "",
    accessorKey: "action",
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const rowData = row.original;
      return (
        <button
          className="outage-document-cell"
          onClick={() => {
            NodeElementHandler(rowData.outageId, "markedOutage");
          }}
          style={{
            cursor: "pointer",
            color: "#175CD3",
            background: "none",
            fontSize: "14px",
            fontWeight: "600",
          }}
          disabled={sliceData?.find((item: any) => {
            return item == row?.ompName;
          })}
        >
          Kesintiyi göster
        </button>
      );
    },
  },
];
export const notificationTabColumn = (
  handleRowClick: (id: any, rowData: any, type: string) => void,
  t: TFunction,
  NodeElementHandler: (rowData: number, type: string) => void,
  sliceData: any,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void
) => [
  {
    header: "Bildirim Numarası",
    accessorKey: "notificationId",
    flex: "unset",
    cell: ({ row }: any) => {
      const info = row.original;

      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() =>
            handleRowClick(info?.notificationId, info, "notification")
          }
        >
          <span>{info?.notificationId}</span>
        </button>
      );
    },
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "notificationId"
      );
      return (
        <TextFilter
          columnKey="notificationId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  {
    header: "Kesinti Numarası",
    accessorKey: "outageId",
    flex: "unset",
    cell: ({ row }: any) => {
      const info = row.original;

      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() => handleRowClick(info, info, "outage")}
        >
          <span>{info?.outageId}</span>
        </button>
      );
    },
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
  },

  {
    header: "Bildirim Zamanı",
    accessorKey: "startDateTime",
    flex: "unset",
    size: 150,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "startDateTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"startDateTime"}
        />
      );
    },
  },
  {
    header: "Bildirimin Kaynağı",
    accessorKey: "sourceSystemId",
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const sourceSystem = SourceSystems[row.original.sourceSystemId];
      return (
        <>
          {sourceSystem
            ? t(`Enum.${sourceSystem}`, { defaultValue: sourceSystem })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "sourceSystemId"
      );

      return (
        <MultiSelectInput
          options={enumToOptions(SourceSystems).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("sourceSystemId", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  // {
  //   header: "İl",
  //   accessorKey: "city",
  //   flex: "unset",
  //   size: 100,
  // },
  // {
  //   header: "İlçe",
  //   accessorKey: "district",
  //   flex: "unset",
  //   size: 100,
  // },
  // {
  //   header: "Mahalle ",
  //   accessorKey: "neighborhood",
  //   flex: "unset",
  //   size: 100,
  // },

  {
    header: "OMP Adı",
    accessorKey: "ompName",
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "ompName");

      return (
        <TextFilter
          columnKey="ompName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Tesisat Numarası",
    accessorKey: "installationId",
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "installationId"
      );

      return (
        <TextFilter
          columnKey="installationId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Enerji Durumu",
    accessorKey: "energyState",
    flex: "unset",
    size: 100,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "energyState"
      );

      return (
        <TextFilter
          columnKey="energyState"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "CBS ID",
    accessorKey: "cbsId",
    flex: "unset",
    size: 250,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "cbsId");

      return (
        <TextFilter
          columnKey="cbsId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "İl",
    accessorKey: "city",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
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
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
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
    accessorKey: "neighbourhood",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "neighbourhood"
      );

      return (
        <TextFilter
          columnKey="neighbourhood"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "",
    accessorKey: "action",
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const rowData = row.original;
      return (
        <button
          className="outage-document-cell"
          onClick={() => NodeElementHandler(rowData, "markedNotification")}
          style={{
            cursor: "pointer",
            color: "#175CD3",
            background: "none",
            fontSize: "14px",
            fontWeight: "600",
          }}
          disabled={sliceData?.find((item: any) => {
            return item == row.ompName;
          })}
        >
          Bildirimi Göster
        </button>
      );
    },
  },
];
export const devicesTabColumn = (
  NodeElementHandler: (rowData: number, type: string) => void,
  sliceData: any,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void
) => [
  {
    header: "Cihaz Seri Numarası",
    accessorKey: "sourceSystemDeviceId",
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "sourceSystemDeviceId"
      );
      return (
        <TextFilter
          columnKey="sourceSystemDeviceId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  {
    header: "OMP Numarası",
    accessorKey: "ompId",
    flex: "unset",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
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

  {
    header: "OMP Adı",
    accessorKey: "ompName",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "ompName");
      return (
        <TextFilter
          columnKey="ompName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "CBS ID",
    accessorKey: "cbsId",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "cbsId");
      return (
        <TextFilter
          columnKey="cbsId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Kaynak Sistem",
    accessorKey: "sourceSystemId",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "sourceSystemId"
      );
      return (
        <TextFilter
          columnKey="sourceSystemId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Enerji Gitti Bildirimi",
    accessorKey: "isIncomingFalse",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "isIncomingFalse"
      );
      return (
        <TextFilter
          columnKey="isIncomingFalse"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Enerji Geldi Bildirimi",
    accessorKey: "isIncomingTrue",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "isIncomingTrue"
      );
      return (
        <TextFilter
          columnKey="isIncomingTrue"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Periyodik Sorgu",
    accessorKey: "isCesData",
    flex: "unset",
    size: 150,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "isCESData");
      return (
        <TextFilter
          columnKey="isCESData"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "",
    accessorKey: "action",
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const rowData = row.original;
      return (
        <button
          className="outage-document-cell"
          onClick={() => NodeElementHandler(rowData, "markedDevice")}
          style={{
            cursor: "pointer",
            color: "#175CD3",
            background: "none",
            fontSize: "14px",
            fontWeight: "600",
          }}
          disabled={sliceData?.find((item: any) => {
            return item == row.ompName;
          })}
        >
          Cihazı Göster
        </button>
      );
    },
  },
];
export const detailControllsColumn = (
  NodeElementHandler: (rowData: number, type: string) => void,
  sliceData: any
) => [
  {
    header: "Cihaz Seri Numarası",
    accessorKey: "sourceSystemDeviceId",
    flex: "unset",
    // size: 200,
  },

  {
    header: "Isteğin Atıldığı zaman",
    accessorKey: "ompId",
    flex: "unset",
    // size: 200,
  },

  {
    header: "Cevabın Alındığı zaman",
    accessorKey: "ompName",
    flex: "unset",
    size: 170,
  },
  {
    header: "Durum",
    accessorKey: "cbsId",
    flex: "unset",
    size: 50,
  },
  {
    header: "Açıklama",
    accessorKey: "sourceSystemId",
    flex: "unset",
    size: 50,
  },
  {
    header: "Bildirim Numarası",
    accessorKey: "isIncomingFalse",
    flex: "unset",
    // size: 150,
  },
  {
    header: "Geliş Kanalı",
    accessorKey: "isIncomingTrue",
    flex: "unset",
    size: 80,
  },
  {
    header: "Bildirim Tipi",
    accessorKey: "isCesData",
    flex: "unset",
    size: 80,
  },
  {
    header: "",
    accessorKey: "action",
    flex: "unset",
    size: 80,
    cell: ({ row }: any) => {
      const rowData = row.original;
      return (
        <button
          className="outage-document-cell"
          onClick={() => NodeElementHandler(rowData, "markedDevice")}
          style={{
            cursor: "pointer",
            color: "#175CD3",
            background: "none",
            fontSize: "14px",
            fontWeight: "600",
          }}
          disabled={sliceData?.find((item: any) => {
            return item == row.ompName;
          })}
        >
          Noktayı göster
        </button>
      );
    },
  },
];
