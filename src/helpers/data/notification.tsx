import { dateFormater } from "../format-data";
import {
  NotificationStatus,
  PriorityTypes,
  SourceSystems,
  SubjectTypes,
} from "@/definitions/enum";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import { enumToOptions } from "../enum-converter";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";

const noop = () => {};

export const notificationColumns = (
  handleRowClick: (rowData: number) => void,
  t: any,
  appliedFilters: TableFilter[] = [],
  onFilterChange: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void
) => [
  {
    header: "Bildirim Numarası",
    accessorKey: "notificationId",
    size: 200,
    filterComponent: () => {
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
    cell: ({ row }: any) => {
      const info = row.original;
      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() => handleRowClick(info)}
        >
          <span>{info?.notificationId}</span>
        </button>
      );
    },
  },
  // 3. Kaynak Kodu - Dropdown
  {
    header: "Kaynak Kodu",
    accessorKey: "sourceName",
    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const sourceKey = SourceSystems[raw?.sourceName]; // e.g., "WFM"
      const translated = sourceKey
        ? t(`Enum.${sourceKey}`, { defaultValue: sourceKey })
        : "-";
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "sourceName");

      return (
        <MultiSelectInput
          options={enumToOptions(SourceSystems).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange("sourceName", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },

  // 5. Crm Dış Id - Dropdown
  {
    header: "Kaynak Sistem Numarası",
    size: 200,
    accessorKey: "crmExternalId",
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "crmExternalId"
      );

      return (
        <TextFilter
          columnKey="crmExternalId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  // 8. Kesinti ID - Dropdown
  {
    header: "Kesinti Numarası",
    accessorKey: "outageId",
    size: 200,

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
  },

  {
    header: "Bağlantı Durumu",
    accessorKey: "outageStatus",
    cell: ({ row }: any) => {
      const raw = row.original;
      const translated = raw?.outageStatus
        ? t(`Enum.${raw?.outageStatus}`)
        : "-";
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "outageStatus"
      );

      return (
        <MultiSelectInput
          options={[
            {
              displayName: "Bağlı",
              value: "OutageRelated",
              id: "OutageRelated",
            },
            {
              displayName: "Bağlı Değil",
              value: "NotOutageRelated",
              id: "notOutageRelated",
            },
          ]}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange("outageStatus", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Durum Kodu",
    accessorKey: "statusCode",
    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const statusCode = NotificationStatus[raw?.statusCode]; // e.g., "WFM"
      const translated = statusCode
        ? t(`Enum.${statusCode}`, { defaultValue: statusCode })
        : "-";
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "statusCode");

      return (
        <MultiSelectInput
          options={enumToOptions(NotificationStatus).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange("statusCode", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  // 10. Oluşturulma Tarihi - Datepicker
  {
    header: "Oluşturulma Tarihi",
    accessorKey: "createdAt",
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "createdAt" && f.filterType === "between"
      );

      const value = (filter?.value ?? {}) as { start?: string; end?: string };

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
    header: "Kayıt Tarihi",
    accessorKey: "recordedAt",
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "recordedAt" && f.filterType === "between"
      );

      const value = (filter?.value ?? {}) as { start?: string; end?: string };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"recordedAt"}
        />
      );
    },
  },

  // 12. Şehir - Dropdown
  {
    header: "Şehir",
    accessorKey: "city",
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
  // 1. İlçe - Dropdown
  {
    header: "İlçe",
    accessorKey: "district",
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
  // 2. Mahalle/Semt - Input
  {
    header: "Mahalle",
    accessorKey: "neighborhood",
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

  // 6. Tesisat Id - Input
  {
    header: "Tesisat Numarası",
    accessorKey: "facilityId",
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "facilityId");

      return (
        <TextFilter
          columnKey="facilityId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  // 7. Trafo Tesisat Numarası (OSOS) - Input
  {
    header: "Trafo Tesisat Numarası (OSOS)",
    accessorKey: "transformerFacilityId",
    size: 250,
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "transformerFacilityId"
      );

      return (
        <TextFilter
          columnKey="transformerFacilityId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },

  // 9. Bildirim Konu Kodu - Dropdown
  {
    header: "Bildirim Konu Kodu",
    accessorKey: "subjectCode",
    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const subjectCode = SubjectTypes[raw?.subjectCode]; // e.g., "WFM"
      const translated = subjectCode
        ? t(`Enum.${subjectCode}`, { defaultValue: subjectCode })
        : "-";
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "subjectCode"
      );

      return (
        <MultiSelectInput
          options={enumToOptions(SubjectTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange("subjectCode", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },

  // 12. Öncelik - Dropdown
  {
    header: "Öncelik",
    accessorKey: "priority",
    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const priority = PriorityTypes[raw?.priority]; // e.g., "WFM"
      const translated = priority
        ? t(`Enum.${priority}`, { defaultValue: priority })
        : "-";
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "priority");

      return (
        <MultiSelectInput
          options={enumToOptions(PriorityTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) => onFilterChange("priority", "equals", value)}
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  // 14. Şebeke Unsuru Id - Input
  {
    header: "Şebeke Unsuru Numarası",
    accessorKey: "outageNetworkGisId",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "outageNetworkGisId"
      );

      return (
        <TextFilter
          columnKey="outageNetworkGisId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  // 15. Bileşen CBS Id - Input
  {
    header: "Bileşen CBS Numarası",
    accessorKey: "notificationNetworkGisId",
    size: 200,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "notificationNetworkGisId"
      );

      return (
        <TextFilter
          columnKey="notificationNetworkGisId"
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
    header: "Operasyon Merkezi",
    accessorKey: "operationCenterName",
    size: 200,

    cell: ({ row }: any) => {
      const raw = row.original?.operationCenterName; // your ISO date string

      return <>{raw ?? "-"}</>;
    },
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "operationCenterName"
      );

      return (
        <TextFilter
          columnKey="operationCenterName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
];
export const createUnplannedOutageSelectOptions = [
  {
    il: [
      { displayName: "Diyarbakır", value: 1, id: 1 },
      { displayName: "Şırnak", value: 2, id: 2 },
      { displayName: "Batman", value: 3, id: 3 },
    ],
    ilce: [
      { displayName: "Kayapınar", value: 1, id: 1 },
      { displayName: "İdlib", value: 2, id: 2 },
      { displayName: "Gercüş", value: 3, id: 3 },
    ],
    mahale: [
      { displayName: "Acıbadem", value: 1, id: 1 },
      { displayName: "Bahçelievler", value: 2, id: 2 },
      { displayName: "Alsancak", value: 3, id: 3 },
    ],
    sokak: [
      { displayName: "Bağdat Caddesi", value: 1, id: 1 },
      { displayName: "Atatürk Bulvarı", value: 2, id: 2 },
      { displayName: "Kıbrıs Şehitleri Caddesi ", value: 3, id: 3 },
    ],
    istasyon: [
      { displayName: "A1", value: 1, id: 1 },
      { displayName: "A34", value: 2, id: 2 },
      { displayName: "Z22", value: 3, id: 3 },
    ],
    hucre: [
      { displayName: "H1", value: 1, id: 1 },
      { displayName: "B12", value: 2, id: 2 },
      { displayName: "C23", value: 3, id: 3 },
    ],
    cbs: [
      { displayName: "200", value: 1, id: 1 },
      { displayName: "BAH1", value: 2, id: 2 },
      { displayName: "XYZ", value: 3, id: 3 },
    ],
    onem: [
      { displayName: "Acil", value: 1, id: 1 },
      { displayName: "Önemli", value: 2, id: 2 },
      { displayName: "Acil Değil", value: 3, id: 3 },
      { displayName: "Önemsiz", value: 4, id: 4 },
    ],
  },
  {
    onem: [
      { displayName: "Acil", value: 1, id: 1 },
      { displayName: "Önemli", value: 2, id: 2 },
      { displayName: "Acil Değil", value: 3, id: 3 },
      { displayName: "Önemsiz", value: 4, id: 4 },
    ],
    kesinti: [
      { displayName: "Mütaahit Çalışması", value: 1, id: 1 },
      { displayName: "Bakım Çalışması", value: 2, id: 2 },
      { displayName: "Tesis Yapım İşi", value: 3, id: 3 },
    ],
  },
];

export const interuptionsNotificationColumn = [
  {
    header: "Değişen Bilgiler",
    accessorKey: "bilgiler",
    flex: "unset",
    size: 220,
  },
  {
    header: "Mevcut Durum",
    accessorKey: "mevcut",
    flex: "unset",
    size: 220,
    cell: (info: any) => {
      const raw = info.getValue();
      if (raw === null || raw === undefined || raw === "") return "-";
      if (typeof raw === "string" && /\d{4}-\d{2}-\d{2}T/.test(raw)) {
        return dateFormater(raw);
      }
      return raw;
    },
  },
  {
    header: "Yeni Durum",
    accessorKey: "yeni",
    flex: "unset",
    size: 220,
    cell: (info: any) => {
      const raw = info.getValue();
      if (raw === null || raw === undefined || raw === "") return "-";
      if (typeof raw === "string" && /\d{4}-\d{2}-\d{2}T/.test(raw)) {
        return dateFormater(raw);
      }
      return raw;
    },
  },
];

export const notificationDetailsData = [
  {
    id: 1,
    title: "Bildirim Numarası",
    value: "notificationId",
  },
  {
    id: 5,
    title: "Kesinti Numarası",
    value: "outageId",
  },
  {
    id: 2,
    title: "İstasyon ID",
    value: "istasyonId",
  },
  {
    id: 3,
    title: "Hücre ID",
    value: "hucreId",
  },
  {
    id: 4,
    title: "Seviye",
    value: "treeLevel",
  },

  {
    id: 7,
    title: "Bildirimin Kaynağı",
    value: "sourceName",
  },
];
export const notificationDetailsLocationData = [
  {
    id: 1,
    title: "İl",
    value: "city",
  },
  {
    id: 2,
    title: "İlçe",
    value: "district",
  },
  {
    id: 3,
    title: "Mahalle",
    value: "neighborhood",
  },
  {
    id: 4,
    title: "Cadde/Sokak",
    value: "street",
  },
];
export const notificationDetailsTableColumn = (
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void
) => [
  {
    header: "Kullanıcı",
    accessorKey: "kullanici",
    flex: "unset",
    size: 50,
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "kullanici");
      return (
        <TextFilter
          columnKey="kullanici"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Tarih",
    accessorKey: "tarih",
    flex: "unset",
    sortType: "numeric", // Sort behavior
    size: 50,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "tarih" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"tarih"}
        />
      );
    },
  },
  {
    header: "Açıklama",
    accessorKey: "aciklama",
    flex: "unset",
    sortType: "numeric", // Sort behavior
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "aciklama");
      return (
        <TextFilter
          columnKey="aciklama"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
];

export const cancelationReasonsOptions = [
  {
    displayName: "Bildirimleri Açığa Çıkar",
    value: 1,
    id: 1,
  },
  {
    displayName: "Bildirimleri İptal Et",
    value: 2,
    id: 2,
  },
];
