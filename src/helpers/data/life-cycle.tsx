import { OutageTableMockDataType } from "@/types/components/pages/life-cycle";

export const stepData = (handleRowClick: (rowData: number, type: string) => void) => [
  {
    title: "Bildirim Detayları",
    tabs: [
      {
        title: "Doğrulanmış Bildirimler",
        value: "VerifiedNotifications",
        id: 1,
      },
      {
        title: "Asılsız Bildirimler",
        value: "FalseNotifications",
        id: 2,
      },
    ],
    data: [
      [
        {
          id: 1,
          name: "12345",
          age: 98765,
          occupation: "12.03.2025 10:00:00",
          location: "Açık",
          department: "CRM",
          salary: "0012345678",
          email: "OMP-001",
          phone: "Elektrik Kesintisi",
          startDate: "356789123456789",
          status: "Active",
          status1: "Active",
          status2: "Active",
          status3: "Active",
          status4: "Active",
        },
        {
          id: 2,
          name: "54321",
          age: 56789,
          occupation: "27.03.2025 12:29:00",
          location: "Kapalı",
          department: "SCADA",
          salary: "0098765432",
          email: "OMP-123",
          phone: "Arıza Bildirimi",
          startDate: "356123987654321",
          status: "Active",
          status1: "Active",
          status2: "Active",
          status3: "Active",
          status4: "Active",
        },
        {
          id: 3,
          name: "67890",
          age: 43210,
          occupation: "30.03.2025 15:33:00",
          location: "Beklemede",
          department: "OSOS",
          salary: "0076543210",
          email: "OMP-789",
          phone: "Bakım Çalışması",
          startDate: "356456123789456",
        },
      ],
      [
        {
          id: 1,
          name: "Asılsız",
          age: 98765,
          occupation: "11.03.2025 19:11:00",
          location: "Açık",
          department: "CRM",
          salary: "0012345678",
          email: "OMP-001",
          phone: "Elektrik Kesintisi",
          startDate: "356789123456789",
          status: "Active",
          status1: "Active",
          status2: "Active",
          status3: "Active",
          status4: "Active",
        },
        {
          id: 2,
          name: "Asılsız",
          age: 56789,
          occupation: "18.03.2025 22:09:00",
          location: "Kapalı",
          department: "SCADA",
          salary: "0098765432",
          email: "OMP-123",
          phone: "Arıza Bildirimi",
          startDate: "356123987654321",
          status: "Active",
          status1: "Active",
          status2: "Active",
          status3: "Active",
          status4: "Active",
        },
        {
          id: 3,
          name: "Asılsız",
          age: 43210,
          occupation: "19.03.2025 11:00:00",
          location: "Beklemede",
          department: "OSOS",
          salary: "0076543210",
          email: "OMP-789",
          phone: "Bakım Çalışması",
          startDate: "356456123789456",
        },
      ],
    ],
    columns: [
      [
        {
          header: "Bildirim Numarası",
          accessorKey: "name",
          cell: ({ getValue }: any) => (
            <button
              className="outage-document-cell linked-button"
              onClick={() => handleRowClick(getValue(), "notification")}
            >
              <span>{getValue()}</span>
            </button>
          ),
        },
        {
          header: "Kesinti Numarası",
          accessorKey: "age",
          cell: ({ getValue }: any) => (
            <button
              className="outage-document-cell linked-button"
              onClick={() => handleRowClick(getValue(), "outage")}
            >
              <span>{getValue()}</span>
            </button>
          ),
        },
        { header: "Bildirim Zamanı", accessorKey: "occupation" },
        { header: "Durum", accessorKey: "location" },
        { header: "Geçiş Kanalı", accessorKey: "department" },
        { header: "Tesisat Numarası", accessorKey: "salary" },
        { header: "OMP Adı", accessorKey: "email" },
        { header: "Bildirim Tipi", accessorKey: "phone" },
        { header: "Modem IMEI", accessorKey: "startDate" },
      ],
      [
        { header: "Doğrulama Türü ", accessorKey: "name" },
        {
          header: "Bildirim Numarası",
          accessorKey: "startDate",
          cell: ({ getValue }: any) => (
            <button
              className="outage-document-cell linked-button"
              onClick={() => handleRowClick(getValue(), "notification")}
            >
              <span>{getValue()}</span>
            </button>
          ),
        },
        {
          header: "Kesinti Numarası",
          accessorKey: "age",
          cell: ({ getValue }: any) => (
            <button
              className="outage-document-cell linked-button"
              onClick={() => handleRowClick(getValue(), "outage")}
         
            >
              <span>{getValue()}</span>
            </button>
          ),
        },
        { header: "Bildirim Zamanı", accessorKey: "occupation" },
        { header: "Durum", accessorKey: "location" },
        { header: "Geçiş Kanalı", accessorKey: "department" },
        { header: "Tesisat Numarası", accessorKey: "salary" },
        { header: "OMP Adı", accessorKey: "email" },
        { header: "Bildirim Tipi", accessorKey: "phone" },
      ],
    ],
  },
  {
    title: "Kesinti Detayları",
    tabs: [
      {
        title: "Kesinti Bilgileri",
        value: "OutageInformation",
        id: 1,
      },
      {
        title: "Otomatik Birleşme",
        value: "AutomaticMerge",
        id: 2,
      },
    ],
    data: [
      [
        {
          id: 1,
          name: "12345678",
          age: 424354,
          occupation: "2024-10-22 14:00:00",
          location: "2024-10-22 16:00:00",
          department: "233400",
          salary: "BDHD32",
          email: "Ortak Ata",
        },
        {
          id: 2,
          name: "12345678",
          age: 424354,
          occupation: "2024-10-22 14:00:00",
          location: "2024-10-22 16:00:00",
          department: "265641",
          salary: "FHGKD23",
          email: "Ortak Ata",
        },
      ],
    ],
    columns: [
      [
        { header: "Alt Kesinti Numarası", accessorKey: "name" },
        {
          header: "Birleştiği Kesinti Numarası",
          accessorKey: "age",
          size: 200,
        },
        { header: "Başlangıç Zamanı", accessorKey: "occupation" },
        { header: "Bitiş Zamanı", accessorKey: "location" },
        { header: "OMP Numarası", accessorKey: "department" },
        { header: "OMP Adı", accessorKey: "salary" },
        { header: "CBS ID", accessorKey: "email" },
      ],
    ],
  },
  {
    title: "Etkilenen Tesisatlar Özetleri",
    tabs: [],
    data: [
      [
        {
          id: 1,
          name: "12345678",
          age: 424354,
          occupation: "Babak",
          location: "5306565656",
          department: "mesken",
          salary: "Batman",
          email: "Beşiri",
          phone: "xxxxxxx",
        },
        {
          id: 1,
          name: "12345678",
          age: 566354,
          occupation: "Saeed",
          location: "5305646554",
          department: "mesken",
          salary: "Batman",
          email: "Beşiri",
          phone: "xxxxxxx",
        },
        {
          id: 1,
          name: "12345678",
          age: 678954,
          occupation: "Ali",
          location: "5306576764",
          department: "mesken",
          salary: "Batman",
          email: "Beşiri",
          phone: "xxxxxxx",
        },
      ],
    ],
    columns: [
      [
        { header: "Tesisat No", accessorKey: "name" },
        { header: "Sözleşme No", accessorKey: "age" },
        { header: "Abone Adı", accessorKey: "occupation" },
        { header: "Abone İletişim No", accessorKey: "location" },
        { header: "Abone Tarife Tipi", accessorKey: "department" },
        { header: "Abone İl", accessorKey: "salary" },
        { header: "Abone İlçe", accessorKey: "email" },
        { header: "Abone Mahalle", accessorKey: "phone" },
      ],
    ],
  },
  {
    title: "Raporlara etkisi",
    tabs: [
      {
        title: "Tablo 0-1",
        value: "Table-1",
        id: 1,
      },
      {
        title: "Tablo 0-5",
        value: "Table-5",
        id: 2,
      },
      {
        title: "Tablo 0-3-4",
        value: "Table-3-4",
        id: 3,
      },
      {
        title: "Tazminat Raporları",
        value: "CompensationReports",
        id: 4,
      },
    ],
    data: [
      [
        {
          id: 1,
          name: "12345",
          age: 1,
          occupation: "Diyarbakır",
          location: "Kayapınar",
          department: "DM-KÖK",
          salary: "56658-DM/KÖK",
          email: "Dağıtım",
          phone: "Uzun",
          startDate: "Dışsal",
          status: "Evet",
        },
      ],
    ],
    columns: [
      [
        { header: "Kesinti Kodu", accessorKey: "name" },
        { header: "Kademe", accessorKey: "age" },
        { header: "il", accessorKey: "occupation" },
        { header: "İlçe", accessorKey: "location" },
        { header: "Şebeke Tipi Unsuru", accessorKey: "department" },
        { header: "Şebeke Unsuru Kodu", accessorKey: "salary" },
        { header: "Kaynağa Göre", accessorKey: "email" },
        { header: "Süreye Göre", accessorKey: "phone" },
        { header: "Sebebe Göre", accessorKey: "startDate" },
        { header: "Süreye Göre", accessorKey: "status" },
      ],
    ],
  },
];

export const consensusDetailsCardData = {
  title: "Mutabakat",
  data: {
    details: [
      {
        title: "Kesinti Mütabakat Numarası",
        value: 1235647,
      },
      {
        title: "SOMS Kesinti Numarası",
        value: 12345,
        type: "link",
      },
      {
        title: "Tesisat Numarası",
        value: 1174856,
      },
      {
        title: "Kofre Numarası",
        value: 1254647,
      },
      {
        title: "Toplam Tesisat Adedi",
        value: 2580,
      },
    ],
    dates: [
      {
        title: "Sayaç Kesintisi Başlangıç Zamanı",
        value: "15.03.2024 15:03:00",
      },
      {
        title: "Sayaç Kesinti Bitiş Zamanı",
        value: "15.03.2024 18:09:00",
      },
      {
        title: "Osos Kesinti Başlangıç Zamanı",
        value: "15.03.2024 18:09:00",
      },
      {
        title: "Osos Kesintisi Bitiş Zamanı",
        value: "15.03.2024 19:09:00",
      },
    ],
  },
};
export const outageDetailsCardData = {
  data: {
    details: [
      {
        title: "Kesinti Numarası",
        value: 24215852,
        type: "link",
      },
      {
        title: "İstasyon ID",
        value: "TBC524",
      },
      {
        title: "Hücre ID",
        value: "H3",
      },
      {
        title: "Seviye",
        value: 57,
      },
      {
        title: "İzlenme Durumu",
        value: 1,
      },
      {
        title: "Üst İstasyon Adı",
        value: "TAD593",
      },
      {
        title: "Üst Hücresi",
        value: "H1",
      },
      {
        title: "CBS ID",
        value: 123456,
      },
    ],
    location: [
      {
        title: "İl",
        value: "Diyarbakır",
      },
      {
        title: "İlçe",
        value: "Kayapınar",
      },
      {
        title: "Mahalle",
        value: "Peyas",
      },
      {
        title: "Cadde",
        value: "Kayapınar",
      },
      {
        title: "Sokak",
        value: "470",
      },
      {
        title: "Bina No",
        value: "10",
      },
      {
        title: "Açık Adres",
        value: "Peyas Mah. 470. Sk. XX Market yanı Kayapınar/Diyarbakır ",
      },
    ],
  },
};
export const outageMockData: OutageTableMockDataType[] = [
  {
    outageNumber: 16792,
    ompId: 156421,
    gisId: 789111,
    outageStartDate: "02-02-2024 15:03",
    outageEndDate: "02-06-2024 15:03",
  },
  {
    outageNumber: 1964,
    ompId: 558421,
    gisId: 78331,
    outageStartDate: "02-10-2024 15:03",
    outageEndDate: "02-10-2024 15:03",
  },
  {
    outageNumber: 16744,
    ompId: 156421,
    gisId: 789111,
    outageStartDate: "26-01-2024 15:03",
    outageEndDate: "16-11-2024 15:03",
  },
  {
    outageNumber: 5548,
    ompId: 65659,
    gisId: 789325,
    outageStartDate: "30-02-2024 15:03",
    outageEndDate: "22-06-2024 15:03",
  },
  {
    outageNumber: 55241,
    ompId: 77481,
    gisId: 33251,
    outageStartDate: "20-07-2024 15:03",
    outageEndDate: "21-08-2024 15:03",
  },
];
