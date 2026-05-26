import { BellSvg } from "@/assets/icons/bell-svg";
import { CheckIconSvg } from "@/assets/icons/check-svg";

export const firstColumns = {
  header: "Genel",
  items: [
    {
      title: "Geldi Bildirimi",
      Icon: BellSvg,
      id: 1,
      stroke: "#D92D20",
      bg: "#FEE4E2",
    },
    {
      title: "Gitti Bildirimi",
      Icon: BellSvg,
      id: 2,
      stroke: "#079455",
      bg: "#ECFDF3",
    },
    {
      title: "Versiyon",
      id: 3,
      text: (
        <span
          style={{
            color: "#344054",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          v
        </span>
      ),
      bg: "#F2F4F7",
    },
    {
      title: "Periyodik Kontrol",
      Icon: CheckIconSvg,
      id: 4,
      stroke: "#1570EF",
      bg: "#F2F4F7",
    },
  ],
};
export const secondColumns = {
  header: "Genel",
  items: [
    {
      title: "Orta Gerilim",
      id: 1,
      bg: "#475467",
      text: (
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: "8px",
            textAlign: "center",
          }}
        >
          OG
        </span>
      ),
    },
    {
      title: "Alçak Gerilim",
      id: 2,
      bg: "#B54708",
      text: (
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: "8px",
            textAlign: "center",
          }}
        >
          AG
        </span>
      ),
    },
  ],
};
export const thirdColumns = {
  header: "İstasyon Tipleri",
  items: [
    {
      title: "SCADA",
      id: 1,
      bg: "",
      text: (
        <span
          style={{
            borderRadius: "100%",
            fontSize: "8px",
          }}
        >
          SC
        </span>
      ),
    },
    {
      title: "OSOS",
      id: 3,
      bg: "",
      text: (
        <span
          style={{
            borderRadius: "100%",
            fontSize: "8px",
          }}
        >
          OS
        </span>
      ),
    },
  ],
};

export const fourthColumns = {
  header: "İstasyon Tipleri",
  items: [
    {
      title: "Trafo Merkezi",
      id: 1,
      bg: "#194185",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "Dağıtım Merkezi",
      id: 2,
      bg: "#1849A9",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "KÖK",
      id: 3,
      bg: "#1570EF",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "IDM (Indirici Dağıtıcı Merkezi)",
      id: 4,
      bg: "#F2F4F7",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "Trafo Binası",
      id: 5,
      bg: "#2E90FA",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "DÜT",
      id: 6,
      bg: "#53B1FD",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "SDK",
      id: 7,
      bg: "#84CAFF",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "Kofre",
      id: 8,
      bg: "#75E0A7",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
    {
      title: "Tesisat",
      id: 9,
      bg: "#17B26A",
      text: (
        <span
          style={{
            width: "22px",
            height: "22px",
            textAlign: "center",
          }}
        ></span>
      ),
    },
  ],
};

export const fifthColumns = {
  header: "İstasyon Tipleri",
  items: [
    {
      title: "Ağaç İçersinde Arama",
      id: 1,
      bg: "#FEE4E2",
      color: "#B42318",
    },
    {
      title: "İzleme Sistemleri",
      id: 2,
      bg: "#D1E9FF",
      color: "#175CD3",
    },
    {
      title: "İşaretlenmiş Bildirim",
      id: 3,
      bg: "#DCFAE6",
      color: "#079455",
    },
    {
      title: "İşaretlenmiş Bildirim",
      id: 4,
      bg: "#FFE6D5",
      color: "#E62E05",
    },
    {
      title: "İşaretlenmiş İzlenen Cihaz",
      id: 5,
      bg: "#D5D9EB",
      color: "#363F72",
    },
  ],
};
