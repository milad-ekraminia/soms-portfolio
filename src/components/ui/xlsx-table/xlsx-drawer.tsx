import React from "react";
import Drawer from "@/components/ui/drawer/drawer";
import { XlsxNestedTable } from "./xlsx-table";

export interface KesintiRow {
  kesintiKodu: string;
  kademe: string;
  il: string;
  ilce: string;
  sebekeTipi: string;
  sebekeKodu: string;
  kesintiKokNedeni: string;
  sinif_kaynaga: string;
  sinif_sureye: string;
  sinif_sebebe: string;
  sinif_bildirime: string;
  baslama: string;
  sonaErme: string;
  kesintiSuresiSaat: number;
  mesken_og: number;
  mesken_ag: number;
  total_not_delivered_kwh: number;
}

export const kesintiColumns = [
  { label: "Kesinti Kodu (1)", key: "kesintiKodu", vertical: true },
  { label: "KADEME (2)", key: "kademe", vertical: true },
  {
    label: "Kesintinin Yeri (3)",
    children: [
      { label: "İL (3A)", key: "il", vertical: true },
      { label: "İLÇE (3B)", key: "ilce", vertical: true },
      { label: "Şebeke Unsuru Tipi (3C)", key: "sebekeTipi", vertical: true },
      { label: "Şebeke Unsuru Kodu (3D)", key: "sebekeKodu", vertical: true },
    ],
  },
  {
    label: "Kesintinin Kök Nedeni (4)",
    key: "kesintiKokNedeni",
    vertical: true,
  },
  {
    label: "Kesintinin Sınıfı (5)",
    children: [
      { label: "Kaynağa Göre (5A)", key: "sinif_kaynaga", vertical: true },
      { label: "Süreye Göre (5B)", key: "sinif_sureye", vertical: true },
      { label: "Sebebe Göre (5C)", key: "sinif_sebebe", vertical: true },
      { label: "Bildirime Göre (5D)", key: "sinif_bildirime", vertical: true },
    ],
  },
  {
    label: "Kesintinin Başlama Tarih ve Zamanı (6)",
    key: "baslama",
    vertical: true,
  },
  {
    label: "Kesintinin Sona Erme Tarih ve Zamanı (7)",
    key: "sonaErme",
    vertical: true,
  },
  {
    label: "Kesinti Süresi (Saat) (8)",
    key: "kesintiSuresiSaat",
    vertical: true,
  },
  {
    label: "Kesintiden Etkilenen Kullanıcılar (9)",

    children: [
      {
        label: "Mesken",
        vertical: true,

        children: [
          { label: "OG", key: "mesken_og" },
          { label: "AG", key: "mesken_ag" },
        ],
      },
      {
        label: "Tarımsal Sulama",
        vertical: true,

        children: [
          { label: "OG", key: "tarimsal_og" },
          { label: "AG", key: "tarimsal_ag" },
        ],
      },
      {
        label: "Ticarethane",
        vertical: true,

        children: [
          { label: "OG", key: "ticarethane_og" },
          { label: "AG", key: "ticarethane_ag" },
        ],
      },
      {
        label: "Sanayi",
        vertical: true,

        children: [
          { label: "OG", key: "sanayi_og" },
          { label: "AG", key: "sanayi_ag" },
        ],
      },
    ],
  },
  {
    label: "Dağıtılmayan Enerji (kWh) (10)",
    children: [
      {
        label: "Mesken",
        vertical: true,

        children: [
          { label: "OG", key: "enerji_mesken_og" },
          { label: "AG", key: "enerji_mesken_ag" },
        ],
      },
      {
        label: "Tarımsal Sulama",
        vertical: true,

        children: [
          { label: "OG", key: "enerji_tarimsal_og" },
          { label: "AG", key: "enerji_tarimsal_ag" },
        ],
      },
      {
        label: "Ticarethane",
        vertical: true,

        children: [
          { label: "OG", key: "enerji_ticarethane_og" },
          { label: "AG", key: "enerji_ticarethane_ag" },
        ],
      },
      {
        label: "Sanayi",
        vertical: true,

        children: [
          { label: "OG", key: "enerji_sanayi_og" },
          { label: "AG", key: "enerji_sanayi_ag" },
        ],
      },
    ],
  },
  {
    label: "Toplam Dağıtılmayan Enerji (kWh) (11)",
    key: "total_not_delivered_kwh",
    vertical: true,
  },
];

const data = [
  {
    kesintiKodu: "97082",
    kademe: "DM",
    il: "MARDİN",
    ilce: "DARGEÇİT",
    sebekeTipi: "OG",
    sebekeKodu: "2033120",
    kesintiKokNedeni: "Bakım Çalışması",
    sinif_kaynağa: "Planlı",
    sinif_süreye: "Kısa",
    sinif_sebebe: "Onarım",
    sinif_bildirime: "Dahili",
    baslama: "2025-10-29 08:00",
    sonaErme: "2025-10-29 12:00",
    kesintiSuresiSaat: 4,
    mesken_og: 4,
    mesken_ag: 12,
    tarimsal_og: 2,
    tarimsal_ag: 6,
    ticarethane_og: 3,
    ticarethane_ag: 7,
    sanayi_og: 1,
    sanayi_ag: 3,
    enerji_mesken_og: 200,
    enerji_mesken_ag: 400,
    enerji_tarimsal_og: 150,
    enerji_tarimsal_ag: 250,
    enerji_ticarethane_og: 120,
    enerji_ticarethane_ag: 220,
    enerji_sanayi_og: 300,
    enerji_sanayi_ag: 600,
    total_not_delivered_kwh: 2240,
  },
  {
    kesintiKodu: "97083",
    kademe: "TM",
    il: "ŞANLIURFA",
    ilce: "HİLVAN",
    sebekeTipi: "AG",
    sebekeKodu: "2033121",
    kesintiKokNedeni: "Trafo Arızası",
    sinif_kaynağa: "Arıza",
    sinif_süreye: "Uzun",
    sinif_sebebe: "Kablo Hasarı",
    sinif_bildirime: "Acil",
    baslama: "2025-10-28 22:00",
    sonaErme: "2025-10-29 03:30",
    kesintiSuresiSaat: 5.5,
    mesken_og: 6,
    mesken_ag: 15,
    tarimsal_og: 1,
    tarimsal_ag: 5,
    ticarethane_og: 2,
    ticarethane_ag: 4,
    sanayi_og: 1,
    sanayi_ag: 1,
    enerji_mesken_og: 320,
    enerji_mesken_ag: 520,
    enerji_tarimsal_og: 100,
    enerji_tarimsal_ag: 180,
    enerji_ticarethane_og: 200,
    enerji_ticarethane_ag: 260,
    enerji_sanayi_og: 350,
    enerji_sanayi_ag: 550,
    total_not_delivered_kwh: 2480,
  },
  {
    kesintiKodu: "97084",
    kademe: "DM",
    il: "BATMAN",
    ilce: "BEŞİRİ",
    sebekeTipi: "OG",
    sebekeKodu: "2033122",
    kesintiKokNedeni: "Hat Yenileme",
    sinif_kaynağa: "Planlı",
    sinif_süreye: "Orta",
    sinif_sebebe: "Yatırım",
    sinif_bildirime: "Planlı",
    baslama: "2025-10-27 09:00",
    sonaErme: "2025-10-27 14:30",
    kesintiSuresiSaat: 5.5,
    mesken_og: 8,
    mesken_ag: 25,
    tarimsal_og: 3,
    tarimsal_ag: 8,
    ticarethane_og: 4,
    ticarethane_ag: 9,
    sanayi_og: 2,
    sanayi_ag: 4,
    enerji_mesken_og: 300,
    enerji_mesken_ag: 600,
    enerji_tarimsal_og: 250,
    enerji_tarimsal_ag: 300,
    enerji_ticarethane_og: 280,
    enerji_ticarethane_ag: 340,
    enerji_sanayi_og: 450,
    enerji_sanayi_ag: 700,
    total_not_delivered_kwh: 3220,
  },
];

export const XlsxDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}> = ({ isOpen, onClose, title = "XLSX Önizleme" }) => {
  // keep table mounted always
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // delay CSS display to next tick so animation doesn’t block render
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      hasFooter={false}
    >
      <div
        style={{
          height: 600,
          overflow: "auto",
          display: visible ? "block" : "none",
        }}
      >
        <XlsxNestedTable
          title="TABLO-3 DAĞITILMAYAN ENERJİ"
          columns={kesintiColumns}
          data={data}
        />
      </div>
    </Drawer>
  );
};