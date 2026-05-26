import { DocumentSvg } from "@/assets/icons/document-svg";
import { EarthLocationSvg } from "@/assets/icons/earth-location-svg";
import { FolderArchiveSvg } from "@/assets/icons/folder-archive-svg";
import { FolderCloseSvg } from "@/assets/icons/folder-close-svg";
import { NetworkSvg } from "@/assets/icons/network-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { OutageEnergySvg } from "@/assets/icons/outage-energy-svg";
import { OutageItemType } from "@/types/components/pages/outage";
import { MergeOutageSvg } from "@/assets/icons/merge-outage-svg";
import { MinusCalenderSvg } from "@/assets/icons/minus-calender-svg";
import { FolderCheckMarkSvg } from "@/assets/icons/folder-check-mark-svg";

import { EmailSvg } from "@/assets/icons/email-svg";
import { UnArchiveSvg } from "@/assets/icons/un-archive-svg";

interface OperationsProps {
  selectedRows: number[];
  optionsHandler: (type: string, selectedRows?: number[]) => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerValues: React.Dispatch<
    React.SetStateAction<{
      title: string;
      type: string;
      formType: string;
      description?: string;
    }>
  >;
  isDrawerOpen: boolean;
  outageData: OutageItemType[] | undefined;
}
const OutageOperationContent = ({
  selectedRows,
  optionsHandler,
  setDrawerValues,
  setIsDrawerOpen,
  isDrawerOpen,
  outageData,
}: OperationsProps) => {

  const chosenData = outageData?.find(
    (item: OutageItemType) => selectedRows[0] == item.outageId,
  );
  const createOutageHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setDrawerValues({
      title: "Plansız Kesinti Oluştur",
      formType: "plansız",
      type: "form",
    });
  };
  const selectLength = selectedRows?.length;
  const canArchive = () => {
    let status = true;
    selectedRows?.map((row) => {
      const outageItem = outageData?.find(
        (item: OutageItemType) => row == item.outageId,
      );
      if (outageItem?.status != 3) status = false;
      else status = true;
    });

    return status;
  };
  const showArchive = () => {
    let status = true;
    selectedRows?.map((row) => {
      const outageItem = outageData?.find(
        (item: OutageItemType) => row == item.outageId,
      );
      if (outageItem?.activityStatus != 0) status = false;
    });

    return status;
  };
  const showUnArchive = () => {
    let status = true;
    selectedRows?.map((row) => {
      const outageItem = outageData?.find(
        (item: OutageItemType) => row == item.outageId,
      );
      if (outageItem?.activityStatus != 5) status = false;
    });

    return status;
  };
  const canMerge = () => {
    let status = true;
    selectedRows?.map((row) => {
      const outageItem = outageData?.find(
        (item: OutageItemType) => row == item?.outageId,
      );
      if (outageItem?.status != 1) status = false;
      else status = true;
    });

    return status;
  };

  return (
    <div className="menu-container">
      <button
        className={getClassNames("menu-item", [
          [selectLength != 0, "disabled"],
          [selectLength != 0, "bottom-disabled"],
          [true, "bottom-disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          createOutageHandler();
        }}
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
          [selectLength != 1, "disabled"],
          [selectLength != 1, "bottom-disabled"],
          [true, "bottom-disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("tree");
        }}
      >
        <div className="menu-item__tooltip-bottom">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <NetworkSvg stroke="#475467" />
            <span>Kesintiyi Ağaçta Göster</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length != 1 || chosenData?.status != 1, "disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("create-rank");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderCheckMarkSvg />
            <span>Kademe Oluştur</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [
          [
            selectLength != 1 ||
              !chosenData?.outageId ||
              chosenData?.status != 1,
            "disabled",
          ],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("energy");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <OutageEnergySvg />
            <span> Kesintiye Enerji Ver</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [
          [selectLength != 1, "disabled"],
          [true, "disabled"],
        ])}
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
            <span>Kesintinin Detayına Git</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          // [selectLength != 1, "disabled"],
          [true, "disabled"],
        ])}
        // disabled={selectLength != 1}
        disabled={true}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <EarthLocationSvg />
            <span>Kesintiyi Haritada Göster</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          [selectLength < 1 || chosenData?.status == 8, "disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("cancel-notif", selectedRows);
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderCloseSvg />
            <span> Kesintiyi İptal Et</span>
          </div>
        </div>
      </button>
      {showArchive() && (
        <button
          className={getClassNames("menu-item", [
            [selectLength < 1 || !canArchive(), "disabled"],
            [true, "disabled"],
          ])}
          disabled={true}
          onClick={() => {
            optionsHandler("archive-notif");
          }}
        >
          <div className="menu-item__tooltip">
            <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
          </div>
          <div className="menu-item-text">
            <div className="menu-item-text-title">
              <FolderArchiveSvg />
              <span> Kesintiyi Arşivle</span>
            </div>
          </div>
        </button>
      )}
      {showUnArchive() && (
        <button
          className={getClassNames("menu-item", [
            [selectLength < 1 || !canArchive(), "disabled"],
            [true, "disabled"],
          ])}
          disabled={true}
          onClick={() => {
            optionsHandler("un-archive-notif");
          }}
        >
          <div className="menu-item__tooltip">
            <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
          </div>
          <div className="menu-item-text">
            <div className="menu-item-text-title">
              <UnArchiveSvg />
              <span> Kesintiyi Arşivden Kaldır</span>
            </div>
          </div>
        </button>
      )}
      <button
        className={getClassNames("menu-item", [
          [selectLength < 2 || !canMerge(), "disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("merge-outages");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <MergeOutageSvg />
            <span> Kesintileri Birleştir</span>
          </div>
        </div>
      </button>

      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length != 1 || chosenData?.status != 1, "disabled"],
          [true, "disabled"],
        ])}
        disabled={true}
        onClick={() => {
          optionsHandler("unplanned-sms");
        }}
      >
        <div className="menu-item__tooltip">
          <span>Bu operasyon ilerleyen versiyonlarda aktif olacaktır.</span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <EmailSvg />
            <span> Manuel SMS Gönder</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default OutageOperationContent;
