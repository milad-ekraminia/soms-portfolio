import { TrashSvg } from "@/assets/icons/trash-svg";

export const outageAssignModalTableColumn = (onDelete:any) => [
  {
    header: "Kademe Numarası",
    accessorKey: "date",
    size: 150,
    cell: ({ row }: any) => {
      return <>{row?.index + 1}</>;
    },
  },
  {
    header: "CBS ID",
    accessorKey: "cbsId",
    flex: "unset",
    size: 200,
  },
  {
    header: "İl",
    accessorKey: "cityName",
    flex: "unset",
    size: 100,
  },
  {
    header: "İlçe",
    accessorKey: "districtName",
    flex: "unset",
    size: 100,
  },
  {
    header: "Mahalle",
    accessorKey: "neighborhoodName",
    flex: "unset",
    size: 100,
  },
  {
    header: "Planlanan Başlangıç Tarihi",
    accessorKey: "startDateTime",
    flex: "unset",
    size: 200,
  },
  {
    header: "Planlanan Bitiş Tarihi",
    accessorKey: "endDateTime",
    flex: "unset",
    size: 200,
  },
  {
    header: "Etkilenen Abone Sayısı",
    accessorKey: "reason",
    flex: "unset",
    size: 200,
  },
  {
    header: "Operasyon",
    accessorKey: "description",
    flex: "unset",
    size: 100,
    cell: ({ row }: any) => {
      return (
        <button
          onClick={() => {
            onDelete(row?.index);
          }}
          style={{ backgroundColor: "unset" }}
        >
          <TrashSvg stroke="#D92D20" />
        </button>
      );
    },
  },
];
