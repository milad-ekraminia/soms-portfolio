import { ColumnDef } from "@tanstack/react-table";

export type KesintiRow = {
  id: number;
  key: string;
  kesintiKodu: string;
  kademe: string;
  il: string;
  ilce: string;
  sebekeTipi: string;
  sebekeKodu: string;
  kesintiKokNedeni: string;
  sinif_kaynağa: string;
  sinif_süreye: string;
  sinif_sebebe: string;
  sinif_bildirime: string;
  baslama: string; // ISO datetime or formatted
  sonaErme: string;
  kesintiSuresiSaat: number;

  // Affected users (9) — OG / AG × Mesken, Tarımsal Sulama, Ticarethane, Sanayi
  users_og_mesken: number;
  users_ag_mesken: number;
  users_og_tarim: number;
  users_ag_tarim: number;
  users_og_ticaret: number;
  users_ag_ticaret: number;
  users_og_sanayi: number;
  users_ag_sanayi: number;

  // Energy not delivered (10) — OG / AG × Mesken, Tarımsal Sulama, Ticarethane, Sanayi (kWh)
  energy_og_mesken: number;
  energy_ag_mesken: number;
  energy_og_tarim: number;
  energy_ag_tarim: number;
  energy_og_ticaret: number;
  energy_ag_ticaret: number;
  energy_og_sanayi: number;
  energy_ag_sanayi: number;

  // Total not delivered (11)
  total_not_delivered_kwh: number;
};

export const kesintiColumns: ColumnDef<KesintiRow>[] = [
  {
    header: "Kesinti Kodu (1)",
    accessorKey: "kesintiKodu",
    meta: { vertical: true },
  },
  { header: "KADEME (2)", accessorKey: "kademe", meta: { vertical: true } },
  {
    header: "Kesintinin Yeri (3)",
    columns: [
      { header: "İL (3A)", accessorKey: "il", meta: { vertical: true } },
      { header: "İLÇE (3B)", accessorKey: "ilce", meta: { vertical: true } },
      {
        header: "Şebeke Unsuru Tipi (3C)",
        accessorKey: "sebekeTipi",
        meta: { vertical: true },
      },
      {
        header: "Şebeke Unsuru Kodu (3D)",
        accessorKey: "sebekeKodu",
        meta: { vertical: true },
      },
    ],
  },
  {
    header: "Kesinti Kök Nedeni (4)",
    accessorKey: "kesintiKokNedeni",
    meta: { vertical: true },
  },
  {
    header: "Kesintinin Sınıfı (5)",
    columns: [
      {
        header: "Kaynağa Göre (5A)",
        accessorKey: "sinif_kaynağa",
        meta: { vertical: true },
      },
      {
        header: "Süreye Göre (5B)",
        accessorKey: "sinif_süreye",
        meta: { vertical: true },
      },
      {
        header: "Sebebe Göre (5C)",
        accessorKey: "sinif_sebebe",
        meta: { vertical: true },
      },
      {
        header: "Bildirime Göre (5D)",
        accessorKey: "sinif_bildirime",
        meta: { vertical: true },
      },
    ],
  },
  {
    header: "Kesintinin Başlama Tarih ve Zamanı (6)",
    accessorKey: "baslama",
    meta: { vertical: true },
  },
  {
    header: "Kesintinin Sona Erme Tarih ve Zamanı (7)",
    accessorKey: "sonaErme",
    meta: { vertical: true },
  },
  {
    header: "Kesinti Süresi (Saat) (8)",
    accessorKey: "kesintiSuresiSaat",
    meta: { vertical: true },
  },

  {
    header: "Kesintiden Etkilenen Kullanıcılar (9)",
    // two groups OG and AG, each with 4 categories
    columns: [
      {
        header: "Mesken",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Tarımsal Sulama",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Ticarethane",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Sanayi ",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
    ],
  },

  {
    header: "Dağıtılmayan Enerji (kWh) (10)",
    columns: [
      {
        header: "Mesken",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Tarımsal Sulama",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Ticarethane",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
      {
        header: "Sanayi ",
        meta: { vertical: true },
        columns: [
          {
            header: "OG",
            accessorKey: "OG",
          },
          {
            header: "AG",
            accessorKey: "AG",
          },
        ],
      },
    ],
  },

  {
    header: "Toplam Dağıtılmayan Enerji (kWh) (11)",
    accessorKey: "total_not_delivered_kwh",
    meta: { vertical: true },
  },
];

export const kesintiData: KesintiRow[] = Array.from({ length: 200 }, (_, i) => {
  const id = i + 1;
  const pad = (n: number) => n.toString().padStart(4, "0");
  const cities = [
    { il: "İstanbul", ilce: "Kadıköy" },
    { il: "Ankara", ilce: "Çankaya" },
    { il: "İzmir", ilce: "Konak" },
    { il: "Bursa", ilce: "Osmangazi" },
    { il: "Antalya", ilce: "Muratpaşa" },
    { il: "Diyarbakır", ilce: "Bağlar" },
    { il: "Mardin", ilce: "Artuklu" },
    { il: "Şanlıurfa", ilce: "Haliliye" },
    { il: "Siirt", ilce: "Merkez" },
    { il: "Şırnak", ilce: "Cizre" },
  ];
  const { il, ilce } = cities[i % cities.length];

  const ogOrAg = i % 2 === 0 ? "OG" : "AG";
  const kademe = String((i % 4) + 1);

  const start = new Date(2025, 9, 18, 8 + (i % 8), (i * 7) % 60, 0);
  const durationHours = (i % 6) + 1 + (i % 3) * 0.5; // 1.0h - 7.0h in 0.5 steps
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const baseUsers = 20 + (i % 10) * 10;
  const users_og_mesken =
    ogOrAg === "OG" ? baseUsers + 100 : Math.floor(baseUsers * 0.6);
  const users_ag_mesken =
    ogOrAg === "AG" ? baseUsers + 150 : Math.floor(baseUsers * 0.9);
  const users_og_tarim = Math.floor((i % 5) * 3);
  const users_ag_tarim = Math.floor((i % 7) * 2 + (ogOrAg === "AG" ? 5 : 0));
  const users_og_ticaret = Math.floor((i % 8) + 5);
  const users_ag_ticaret = Math.floor((i % 9) + 10);
  const users_og_sanayi = Math.floor((i % 3) + 1);
  const users_ag_sanayi = Math.floor((i % 4) + 2);

  const energyFactor = 3.5 + (i % 5) * 0.8;
  const energy_og_mesken = +(users_og_mesken * energyFactor * 0.1).toFixed(1);
  const energy_ag_mesken = +(users_ag_mesken * energyFactor * 0.12).toFixed(1);
  const energy_og_tarim = +(users_og_tarim * energyFactor * 0.2).toFixed(1);
  const energy_ag_tarim = +(users_ag_tarim * energyFactor * 0.22).toFixed(1);
  const energy_og_ticaret = +(users_og_ticaret * energyFactor * 0.5).toFixed(1);
  const energy_ag_ticaret = +(users_ag_ticaret * energyFactor * 0.55).toFixed(
    1
  );
  const energy_og_sanayi = +(users_og_sanayi * energyFactor * 10).toFixed(1);
  const energy_ag_sanayi = +(users_ag_sanayi * energyFactor * 12).toFixed(1);

  const total_not_delivered_kwh = +(
    energy_og_mesken +
    energy_ag_mesken +
    energy_og_tarim +
    energy_ag_tarim +
    energy_og_ticaret +
    energy_ag_ticaret +
    energy_og_sanayi +
    energy_ag_sanayi
  ).toFixed(1);

  const kokNedenleri = [
    "Hava Koşulları",
    "Ekip Çalışması",
    "Arıza",
    "Planlı Bakım",
  ];
  const sinifKaynak = ["Kaynak-A", "Kaynak-B", "Kaynak-C"];
  const sinifSure = ["Kısa", "Orta", "Uzun"];
  const sinifSebep = ["Ağaç Teması", "Cihaz Arızası", "Harici Müdahale"];
  const sinifBildirime = ["Abone", "Kurumsal", "Otomatik"];

  return {
    id,
    key: `row-${id}`,
    kesintiKodu: `K-${pad(id)}`,
    kademe,
    il,
    ilce,
    sebekeTipi: ogOrAg,
    sebekeKodu: `${ogOrAg}-${100 + (i % 900)}`,
    kesintiKokNedeni: kokNedenleri[i % kokNedenleri.length],
    sinif_kaynağa: sinifKaynak[i % sinifKaynak.length],
    sinif_süreye: sinifSure[i % sinifSure.length],
    sinif_sebebe: sinifSebep[i % sinifSebep.length],
    sinif_bildirime: sinifBildirime[i % sinifBildirime.length],
    baslama: start.toISOString().slice(0, 19),
    sonaErme: end.toISOString().slice(0, 19),
    kesintiSuresiSaat: +durationHours.toFixed(2),

    users_og_mesken,
    users_ag_mesken,
    users_og_tarim,
    users_ag_tarim,
    users_og_ticaret,
    users_ag_ticaret,
    users_og_sanayi,
    users_ag_sanayi,

    energy_og_mesken,
    energy_ag_mesken,
    energy_og_tarim,
    energy_ag_tarim,
    energy_og_ticaret,
    energy_ag_ticaret,
    energy_og_sanayi,
    energy_ag_sanayi,

    total_not_delivered_kwh,
  } as KesintiRow;
});
