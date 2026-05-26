import { ArrowUpRight } from "@/assets/icons/arrow-up-right-svg";
import { CursurSwipeLeftSvg } from "@/assets/icons/cursur-swipe-left-svg";
import { CursurSwipeRightSvg } from "@/assets/icons/cursur-swipe-right-svg";
import { DocumentSvg } from "@/assets/icons/document-svg";
import { EarthLocationSvg } from "@/assets/icons/earth-location-svg";
import { FolderCloseSvg } from "@/assets/icons/folder-close-svg";
import { MinusCalenderSvg } from "@/assets/icons/minus-calender-svg";
import { getClassNames } from "@/helpers/get-class-names";
interface OperationsProps {
  selectedRows: number[];
  optionsHandler: (type: string) => void;
  data: any;
}

const NotificationOperationsContent = ({
  selectedRows,
  optionsHandler,
  data,
}: OperationsProps) => {
  console.log("🚀 ~ NotificationOperationsContent ~ data:", data, selectedRows);
  return (
    <div className="menu-container">
      <button
        className={getClassNames("menu-item", [
          [true, "disabled"],
          [true, "bottom-disabled"],
        ])}
        onClick={() => {
          optionsHandler("Plansız");
        }}
        disabled={true}
      >
        <div className="menu-item__tooltip-bottom">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <MinusCalenderSvg />
            <span>Plansız Kesinti Oluştur</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [
          [true, "disabled"],
          [true, "bottom-disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("ata");
        }}
      >
        <div className="menu-item__tooltip-bottom">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <CursurSwipeRightSvg />
            <span>Kesintiye Ata</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [[true, "disabled"]])}
        disabled={true}
        onClick={() => {
          optionsHandler("ayir");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <CursurSwipeLeftSvg />
            <span>Kesintiden Ayır</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          // [selectLength == 0, "disabled"],
          [true, "disabled"],
        ])}
        // disabled={selectLength == 0}
        disabled={true}
        onClick={() => {
          optionsHandler("map");
        }}
      >
        <div className="menu-item__tooltip">
          {/* <span>{tooltipHandler("one")} </span> */}
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <EarthLocationSvg />
            <span>Bildirimi Haritada Göster</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [[true, "disabled"]])}
        disabled={true}
        onClick={() => {
          optionsHandler("data");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <DocumentSvg />
            <span>Bildirimi Detayına Git</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [[true, "disabled"]])}
        disabled={true}
        onClick={() => {
          optionsHandler("notif");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderCloseSvg />
            <span> Bildirimi İptal Et</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [[true, "disabled"]])}
        disabled={true}
        onClick={() => {
          optionsHandler("forward");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <ArrowUpRight />
            <span> Bildirimi Farklı Birime Yönlendir</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default NotificationOperationsContent;
