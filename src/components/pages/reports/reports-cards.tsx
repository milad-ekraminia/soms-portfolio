import "./reports.scss";
import { ReportCard } from "./report-card";
import { ReportFileSvg } from "@/assets/icons/report-file-svg";
import { ReportFileOutageSvg } from "@/assets/icons/report-file-outage-svg";
import { ReportFileOutageGlobeSvg } from "@/assets/icons/report-file-outage-globe-svg";
import { ReportsHandInHandSvg } from "@/assets/icons/reports-hand-in-hand-svg";
import { ReportsWarningSvg } from "@/assets/icons/reprots-warning-svg";
export const reportsCards = [
  {
    id: 1,
    title: "Tablo-1 Raporları",
    info: "Tablo-1 raporu kesinti kodu, kademe, kesintinin yeri,kesintinin sınıfı, kesinti süresi,kesintinin nedeni, kesintinin bölgesi,etkilenen kullanıcı sayısı ve toplam etkilenme süresi hakkında bilgileri tutar. Kapanan kesintilerin tamamı ile ilgili ilk bilgiyi veren tablodur.",
    Icon: ReportFileSvg,
  },
  {
    id: 2,
    title: "Tablo-5 Raporları",
    info: "Tablo-5 Raporları kesinti süreleri ve sıklığı ile ilgili bilgi verir. Bu bilgileri kullanıcı özelliklerine ve bildirim durumuna göre ayırarak formül hesaplamaları ile sunar.",
    Icon: ReportFileSvg,
  },
  {
    id: 3,
    title: "Tablo-3 Raporları",
    info: "Tablo-3 Raporları Dağıtım sistemini etkileyen tüm kesintiler için kesintilerden etkilenen kullanıcıların önceki yıl tüketimleri ve kesintinin oluştuğu tarih zaman bilgisine göre dağıtılmayan enerji hesaplanır ve kaydedilir.",
    Icon: ReportFileSvg,
  },
  {
    id: 9,
    title: "Tablo-4 Raporları",
    info: "Tablo-4 Raporları uzun süreli bildirimli(planlı) ve uzun süreli bildirimsiz (plansız) kesintiler için abone başına kWh cinsinden ortalama dağıtılmayan enerji bilgilerini verir.",
    Icon: ReportFileSvg,
  },
  {
    id: 4,
    title: "Uzun Süreli Kesinti Tazminat Raporları",
    info: "Uzun Süreli Kesinti Tazminat Raporu enerji sektöründe EPDK düzenlemeleri kapsamında dağıtım şirketleri tarafından hazırlanan, tüketicilere ödenmesi gereken kesinti tazminatlarının hesaplandığı resmi rapordur.",
    Icon: ReportFileOutageSvg,
    disabled: true,
  },
  {
    id: 5,
    title: "Yıllık Kesinti Tazminat Raporları",
    info: "Yıllık Kesinti Tazminat Raporu Elektrik Dağıtım ve Perakende Satış Hizmet Kalitesi Yönetmeliği kapsamında, bir dağıtım şirketinin, bir takvim yılı içinde gerçekleşen uzun süreli planlı ve plansız kesintiler nedeniyle müşterilere otomatik olarak ödediği veya faturalarına mahsup ettiği tazminatların tamamını resmi olarak belgelediği rapordur.",
    Icon: ReportFileOutageGlobeSvg,
    disabled: true,
  },
  {
    id: 6,
    title: "Mutabakatı Yapılan  Kesinti Raporları",
    info: "Mutabakat raporu, iki farklı sistem, kurum veya taraf arasında bulunan kayıtların (ör. tüketim, fatura, ödeme, tazminat, sayaç verisi, tahakkuk vb.) karşılaştırılması ve tutarlılığının teyit edilmesi amacıyla hazırlanır.",

    Icon: ReportsHandInHandSvg,
    disabled: true,
  },
  {
    id: 7,
    title: "CBS Bağlantısallık Raporları",
    info: "CBS (Coğrafi Bilgi Sistemi) bağlantısallık raporları, şebekenin doğru ve güncel şekilde modellenip modellenmediğini kontrol eden, “şebeke elemanları arasındaki bağlantıların” doğru olup olmadığını gösteren rapordur.",

    Icon: ReportsWarningSvg,
    disabled: true,
  },
];
export const ReportsCards = ({
  setTableData,
}: {
  setTableData: (data: any) => void;
}) => {
  return (
    <div className="reports-cards">
      {reportsCards?.map((item) => (
        <ReportCard key={item.id} item={item} setTableData={setTableData} />
      ))}
    </div>
  );
};
