import { PdfFileSvg } from "@/assets/icons/pdf-file-svg";
import { TrashSvg } from "@/assets/icons/trash-svg";
import { dateFormater } from "../format-data";
import {
  DocumentTypes,
  OutageCauseTypes,
  OutageReasonTypes,
  OutageSourceTypes,
  SourceSystems,
} from "@/definitions/enum";
import { TFunction } from "i18next";
import { DownloadSvgIcon } from "@/assets/icons/download-svg-icon";
import { XlsFileSvg } from "@/assets/icons/xls-file-svg";
import { JpegFileSvg } from "@/assets/icons/jpeg-file-svg";
import { DocxFileSvg } from "@/assets/icons/docx-file-svg";
import { AlertSvg } from "@/assets/icons/alert-svg";
import { TableFilter } from "@/types/table-filter";
import {
  DateRangeFilter,
  TextFilter,
} from "@/components/ui/Table/filter-items/filter-items";
import MultiSelectInput from "@/components/ui/input/multi-select-input/multi-select-input";
import { enumToOptions } from "../enum-converter";
const noop = () => {};

export const drawerFormsSelectOptions = [
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

export const outageDetailsTabs = [
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
  {
    title: "KADEME LİSTESİ",
    value: "levels",
    id: 5,
  },
  {
    title: "DOKÜMANLAR",
    value: "documents",
    id: 6,
  },
  {
    title: "LOG DETAYI",
    value: "logs",
    id: 7,
  },
];

export const getOutageDetailsColumns = ({
  onDelete,
  onDownload,
  t,
  appliedFilters = [],
  onFilterChange,
}: {
  onDelete: (id: number) => void;
  onDownload: (id: number) => void;
  t: TFunction;
  appliedFilters?: TableFilter[];
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void;
}) => [
  {
    header: "Doküman Id",
    accessorKey: "id",
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const info = row?.original;
      const itemType = DocumentTypes[info?.documentTypeId];
      const iconHandler = () => {
        let icon = <DocxFileSvg />;
        if (itemType == "Pdf") icon = <PdfFileSvg />;
        else if (itemType == "Xlsx") icon = <XlsFileSvg />;
        else if (itemType == "Jpg") icon = <JpegFileSvg />;
        return icon;
      };

      return (
        <div className="outage-document-cell">
          {iconHandler()}
          <span>{info?.id}</span>
        </div>
      );
    },
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "id");
      return (
        <TextFilter
          columnKey="id"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Doküman Adı",
    accessorKey: "fileName",
    flex: "unset",
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "fileName");
      return (
        <TextFilter
          columnKey="fileName"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Doküman Tipi",
    accessorKey: "documentTypeId",
    flex: "unset",
    cell: ({ row }: any) => {
      const documentTypeId = DocumentTypes[row?.original?.documentTypeId];
      return (
        <>
          {documentTypeId
            ? t(`Enum.${documentTypeId}`, { defaultValue: documentTypeId })
            : "-"}
        </>
      );
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "documentTypeId"
      );

      return (
        <MultiSelectInput
          options={enumToOptions(DocumentTypes).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange?.("documentTypeId", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
  {
    header: "Doküman Boyutu",
    accessorKey: "documentSize",
    flex: "unset",
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find(
        (f) => f.key === "documentSize"
      );
      return (
        <TextFilter
          columnKey="documentSize"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "Oluşturulma Tarihi",
    accessorKey: "creationTime",
    flex: "unset",
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";

      return dateFormater(raw);
    },
    filterComponent: () => {
      const filter = appliedFilters.find(
        (f) => f.key === "creationTime" && f.filterType === "between"
      );

      const value = (filter?.value ?? { start: "", end: "" }) as {
        start?: string;
        end?: string;
      };

      return (
        <DateRangeFilter
          onFilterChange={onFilterChange ?? noop}
          value={value}
          type={"creationTime"}
        />
      );
    },
  },
  {
    header: "Dokümanı Oluşturan",
    accessorKey: "userId",
    flex: "unset",
    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "userId");
      return (
        <TextFilter
          columnKey="userId"
          value={(existingFilter?.value as string) ?? ""}
          filterType={existingFilter?.filterType ?? "equals"}
          onFilterChange={onFilterChange ?? noop}
        />
      );
    },
  },
  {
    header: "İşlemler",
    accessorKey: "actions",
    flex: "unset",
    cell: ({ row }: any) => (
      <div className="outage-document-column-action">
        <button
          title="Sil"
          className="submit"
          onClick={() => onDelete(row.original.id)}
        >
          <TrashSvg stroke="#D92D20" />
        </button>
        <button
          title="İndir"
          className="submit"
          onClick={() => onDownload(row.original.id)}
        >
          <DownloadSvgIcon stroke="#1570EF" />
        </button>
      </div>
    ),
  },
];

export const detailsOutageData = [
  {
    id: 1,
    title: "Kesinti Numarası",
    value: "outageId",
  },
  {
    id: 2,
    title: "İstasyon Adı",
    value: "stationName",
  },
  {
    id: 3,
    title: "Kesinti Noktası",
    value: "ompName",
  },
  {
    id: 4,
    title: "Seviye",
    value: "treeLevel",
  },
  {
    id: 5,
    title: "Kesinti Durumu",
    value: "outageStatusTypeId",
  },
  {
    id: 6,
    title: "Kesinti Kaynağı",
    value: "parentStationName",
  },
  {
    id: 11,
    title: "Kesinti Nedeni",
    value: "outageReasonTypeId",
  },
  {
    id: 12,
    title: "Kesinti Sebebi",
    value: "outageCauseTypeId",
  },
  {
    id: 7,
    title: "Üst Kesinti Noktası",
    value: "parentOmpName",
  },
  {
    id: 8,
    title: "CBS ID",
    value: "cbsId",
  },
  {
    id: 9,
    title: "Şikayet Türü",
    value: "subjectTypeId",
  },
  {
    id: 10,
    title: "Etkilenen Abone Sayısı",
    value: "affectedCustomerCount",
    Icon: <AlertSvg width="16" height="16" stroke="#344054" />,
  },
];
export const plannedDetailsOutageData = [
  {
    id: 1,
    title: "Planlı Kesinti Numarası",
    value: "plannedOutageId",
  },
  {
    id: 2,
    title: "Planlanan Başlangıç Zamanı",
    value: "plannedStartDateTime",
  },
  {
    id: 3,
    title: "Planlanan Bitiş Zamanı",
    value: "plannedEndDateTime",
  },
  {
    id: 4,
    title: "Etkilenen Abone Sayısı",
    value: "affectedCustomerCount",
  },
  {
    id: 5,
    title: "İstasyon Adı",
    value: "stationName",
  },
  {
    id: 6,
    title: "Kesinti Noktası",
    value: "ompName",
  },
  {
    id: 11,
    title: "Planlı Kesinti Durumu",
    value: "plannedOutageStatusTypeId",
  },
  {
    id: 12,
    title: "CBS ID",
    value: "cbsId",
  },
];
export const detailsOutageDataSimplified = [
  {
    id: 1,
    title: "Kesinti Numarası",
    value: "outageId",
  },
  {
    id: 5,
    title: "Kesinti Durumu",
    value: "outageStatusTypeId",
  },
  {
    id: 2,
    title: "Kesinti Başlangıç Zamanı",
    value: "startDateTime",
  },
  {
    id: 3,
    title: "Kesinti Bitiş Zamanı",
    value: "endDateTime",
  },

  {
    id: 6,
    title: "Kesinti Kaynağı",
    value: "parentStationName",
  },
  {
    id: 11,
    title: "Kesinti Nedeni",
    value: "outageReasonTypeId",
  },
  {
    id: 12,
    title: "Kesinti Sebebi",
    value: "outageCauseTypeId",
  },

  {
    id: 9,
    title: "Şikayet Türü",
    value: "subjectTypeId",
  },
];
export const detailsLocationData = [
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
    value: "neighbourhood",
  },
];
export const detailsDateData = [
  {
    id: 1,
    title: "Başlangıç Zamanı",
    value: "startDateTime",
  },
  {
    id: 2,
    title: "Bitiş Zamanı",
    value: "endDateTime",
  },
  {
    id: 3,
    title: "Kesinti Süresi",
    value: "durationInHours",
  },
];
export const detailsCompletionData = [
  {
    id: 1,
    title: "Şebeke Unsuru",
    value: "TM",
  },
  {
    id: 2,
    title: "Kesinti Sebebi",
    value: "Dışsal",
  },
  {
    id: 3,
    title: "Kesinti Tipi",
    value: "Bildirimsiz",
  },
  {
    id: 4,
    title: "Kesinti Kaynağı",
    value: "İletim",
  },
  {
    id: 5,
    title: "Kesintinin Nesne Türü",
    value: "Kesici",
  },
];
export const redirectOutage = [
  {
    title: "İl",
    value: "Diyarbakır",
  },
  { title: "İlçe", value: "Sur" },
];
export const detailsWorkOrdersData = [
  {
    id: 1,
    title: "İş Emri Numarası",
    value: "wfmExternalId",
  },
  {
    id: 2,
    title: "Durumu",
    value: "workForceStatusTypeId",
  },
  {
    id: 3,
    title: "Tahmini Enerjilendirilme Zamanı",
    value: "estimatedEnergizationDateTime",
  },
];
export const detailInteruptionTabColumn = (
  handleRowClick: (id: any, rowData: any, type: string) => void,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void,
  drawerType?: "outage" | "plannedOutage"
) => [
  {
    header: "Kesinti Numarası",
    accessorKey: drawerType == "outage" ? "outageId" : "plannedOutageId",
    flex: "unset",
    size: 200,
    cell: ({ row }: any) => {
      const info = row.original;
      const key = drawerType == "outage" ? "outageId" : "plannedOutageId";
      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() =>
            handleRowClick(
              info?.[key],
              info,
              drawerType == "outage" ? "outage" : "plannedOutage"
            )
          }
        >
          <span>{info?.[key]}</span>
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
    size: 150,
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
    size: 150,
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
];

export const notificationTabColumn = (
  handleRowClick: (id: any, rowData: any, type: string) => void,
  t: TFunction,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void,
  drawerType?: "outage" | "plannedOutage"
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
    accessorKey: drawerType == "outage" ? "outageId" : "plannedOutageId",
    flex: "unset",
    cell: ({ row }: any) => {
      const info = row.original;
      const key = drawerType == "outage" ? "outageId" : "plannedOutageId";
      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() =>
            handleRowClick(
              info?.[key],
              info,
              drawerType == "outage" ? "outage" : "plannedOutage"
            )
          }
        >
          <span>{info?.[key]}</span>
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
    size: 150,
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
];

export const devicesTabColumn = (
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
    accessorKey: "isCESData",
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
];

export const stepsTabColumn = (
  handleRowClick: (id: any, rowData: number, type: string) => void
) => [
  {
    header: "Kademe No",
    accessorKey: "outageNo",
    flex: "unset",
    size: 200,
    sortType: "numeric", // Sort behavior
  },
  {
    header: "Kesinti Numarası",
    accessorKey: "outageNumber",
    flex: "unset",
    size: 200,
    sortType: "numeric",
    cell: ({ row }: any) => {
      const info = row.original;

      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() => handleRowClick(info?.outageNumber, info, "outage")}
        >
          <span>{info?.outageNumber}</span>
        </button>
      );
    },
  },
  {
    header: "Başlangıç Tarihi",
    accessorKey: "outageStartTime",
    flex: "unset",
    size: 250,
  },

  {
    header: "Bitiş Tarihi",
    accessorKey: "estimatedOutageEndTime",
    flex: "unset",
    size: 250,
  },
  {
    header: "İl",
    accessorKey: "province",
    flex: "unset",
  },
  {
    header: "İlçe",
    accessorKey: "district",
    flex: "unset",
  },
  {
    header: "Mahalle",
    accessorKey: "neighbourhood",
    flex: "unset",
  },

  {
    header: "CBS ID",
    accessorKey: "cbsId",
    flex: "unset",
  },
  {
    header: "OMP ID",
    accessorKey: "ompId",
    flex: "unset",
  },
  {
    header: "OMP Adı",
    accessorKey: "ompName",
    flex: "unset",
  },
];

export const logTabColumn = (
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
    size: 200,
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
    size: 200,

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
    size: 420,
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
export const outageArchiveTableColumns = (
  handleRowClick: (rowData: number) => void,
  t: TFunction
) => [
  {
    header: "Kesinti Numarası ",
    accessorKey: "outageId",
    flex: "unset",
    size: 200,
    sortType: "numeric",

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
    header: "İl",
    accessorKey: "city", // (Dropdown)
    flex: "unset",
    size: 150,
  },
  {
    header: "İlçe",
    accessorKey: "district", // (Dropdown)
    flex: "unset",
    size: 150,
  },
  {
    header: "Mahalle",
    accessorKey: "neighborhood", // (Input)
    flex: "unset",
    size: 150,
  },
  {
    header: "Başlangıç Zamanı",
    accessorKey: "startTime", // (Datepicker)
    flex: "unset",
    size: 250,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
  },
  {
    header: "Bitiş Zamanı",
    accessorKey: "endTime", // (Datepicker)
    flex: "unset",
    size: 250,
    cell: (info: any) => {
      const raw = info.getValue(); // your ISO date string

      // no value?
      if (!raw) return "-";
      // otherwise format as normal
      return dateFormater(raw);
    },
  },
  {
    header: "Kesinti Sebebi",
    accessorKey: "cause", // (Dropdown)
    flex: "unset",
    size: 150,

    cell: ({ row }: any) => {
      const cause = OutageCauseTypes[row.original.cause];
      return <>{cause ? t(`Enum.${cause}`, { defaultValue: cause }) : "-"}</>;
    },
  },
  {
    header: "Kesinti Kaynağı",
    accessorKey: "outageSource", // (Dropdown)
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const outageSource = OutageSourceTypes[raw?.outageSource]; // e.g., "Planned"
      const translated = outageSource
        ? t(`Enum.${outageSource}`, {
            defaultValue: outageSource,
          })
        : "-";

      return <>{translated}</>;
    },
  },
  {
    header: "Kesinti Nedeni",
    accessorKey: "reason", // (Dropdown)
    flex: "unset",
    size: 150,

    cell: ({ row }: any) => {
      const reason = OutageReasonTypes[row.original.reason];
      return (
        <>{reason ? t(`Enum.${reason}`, { defaultValue: reason }) : "-"}</>
      );
    },
  },
  {
    header: "Durum",
    accessorKey: "", // (Dropdown)
    flex: "unset",
    size: 150,
    cell: ({ row }: any) => {
      const raw = row.original;
      let shownText = true;
      if (!raw?.reason || !raw?.cause || !raw?.outageSource) {
        shownText = false;
      }
      return (
        <span style={{ color: shownText ? "#067647" : "#ce0000" }}>
          {shownText ? "ARŞİVE UYGUN" : "EKSİK VERİ VAR"}
        </span>
      );
    },
  },
];
export const outageMergeTableColumns = [
  {
    header: "CBS Numarası",
    accessorKey: "gisId",
    size: 200,
  },
  {
    header: "İstasyon Adı",
    accessorKey: "ompName", // Dropdown-ish but unclear source
    size: 250,
  },
  {
    header: "İl",
    accessorKey: "city", // (Dropdown)
    flex: "unset",
    size: 150,
  },
  {
    header: "İlçe",
    accessorKey: "district", // (Dropdown)
    flex: "unset",
    size: 150,
  },
  {
    header: "Mahalle",
    accessorKey: "neighbourhood", // (Input)
    flex: "unset",
    size: 150,
  },
  {
    header: "Başlangıç Tarihi",
    accessorKey: "notificationTime",
    size: 250,
    cell: (info: any) => {
      const raw = info.getValue();
      if (!raw) return "-";
      return dateFormater(raw);
    },
  },
];
export const tierListsTabColumn = (
  handleRowClick: (id: any, rowData: any, type: string) => void,
  appliedFilters: TableFilter[] = [],
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void,
  drawerType?: "outage" | "plannedOutage"
) => [
  {
    header: "Kademe Numarası",
    accessorKey: "stepNumber",
    flex: "unset",

    filterComponent: () => {
      // Find existing filter for this column
      const existingFilter = appliedFilters.find((f) => f.key === "stepNumber");
      return (
        <TextFilter
          columnKey="stepNumber"
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
      const key = drawerType == "outage" ? "outageId" : "plannedOutageId";
      return (
        <button
          className="outage-document-cell linked-button"
          onClick={() =>
            handleRowClick(
              info?.[key],
              info,
              drawerType == "outage" ? "outage" : "plannedOutage"
            )
          }
        >
          <span>{info?.[key]}</span>
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
    header: "Başlangıç Tarihi",
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
    header: "CBS Numarası",
    accessorKey: "gisId",
    flex: "unset",
    size: 250,
    filterComponent: () => {
      // Find existing filter for this column
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
    header: "Omp Numarası",
    accessorKey: "ompId",
    flex: "unset",
    size: 250,
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
];
export const dateChangeTabColumn = (
  handleRowClick: (rowData: number) => void,
  t: any,
  onFilterChange: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void,
  appliedFilters: TableFilter[] = []
) => [
  {
    header: "Bildirim Numarası",
    accessorKey: "id",
    size: 200,
    filterComponent: () => {
      const existingFilter = appliedFilters.find((f) => f.key === "id");

      return (
        <TextFilter
          columnKey="id"
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
          <span>{info?.id}</span>
        </button>
      );
    },
  },
  {
    header: "Şehir",
    accessorKey: "city",
    size: 100,

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
    size: 100,

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
    accessorKey: "neighbourhood",
    size: 100,

    filterComponent: () => {
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
    header: "Kaynak Kodu",
    accessorKey: "sourceSystemName",
    size: 120,

    cell: ({ row }: any) => {
      const raw = row.original; // your ISO date string
      const sourceKey = SourceSystems[raw?.sourceSystemName]; // e.g., "WFM"
      const translated = sourceKey
        ? t(`Enum.${sourceKey}`, { defaultValue: sourceKey })
        : "-";
      console.log(
        "🚀 ~ dateChangeTabColumn ~ translated:",
        translated,
        sourceKey
      );
      return <>{translated}</>;
    },
    filterComponent: () => {
      const existingFilter = appliedFilters.find(
        (f) => f.key === "sourceSystemName"
      );

      return (
        <MultiSelectInput
          options={enumToOptions(SourceSystems).map((o) => ({
            ...o,
            displayName: t(`Enum.${o.displayName}`),
          }))}
          placeholder="Seçiniz"
          setValue={(value: any) =>
            onFilterChange("sourceSystemName", "equals", value)
          }
          selected={existingFilter?.value as any}
        />
      );
    },
  },
];
