import { useState } from "react";
import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { NoPowerSvg } from "@/assets/icons/no-power-svg";
import { CursurSwipeRightSvg } from "@/assets/icons/cursur-swipe-right-svg";
import { EarthLocationSvg } from "@/assets/icons/earth-location-svg";
import { DocumentSvg } from "@/assets/icons/document-svg";
import { FolderCloseSvg } from "@/assets/icons/folder-close-svg";
import { MinusCalenderSvg } from "@/assets/icons/minus-calender-svg";
import { AddCalenderSvg } from "@/assets/icons/add-calender-svg";
import { ListSvg } from "@/assets/icons/list-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import "./operations.scss";
export const Operations = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableDrawer, setTableDrawer] = useState(false);
  const [treeChartModal, setTreeChartModal] = useState(false);
  const [modalValues, setModalValues] = useState({
    title: "",
    description: "",
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalValues({ title: "", description: "" });
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const optionsHandler = (option: string) => {
    switch (option) {
      case "notif":
        setIsModalOpen(!isModalOpen);
        setModalValues({
          title: "modal title",
          description: "modal desc",
        });
        break;
      case "table":
        setTableDrawer(!tableDrawer);
        setModalValues({
          title: "modal title",
          description: "modal desc",
        });
        break;
      case "tree":
        setTreeChartModal(!treeChartModal);
        setModalValues({
          title: "modal title",
          description: "modal desc",
        });
        break;
    }
  };
  const content = (
    <div className="menu-container">
      <button className="menu-item" onClick={toggleDropdown}>
        <div className={`menu-item-text ${isDropdownOpen ? "active" : ""}`}>
          <div className="menu-item-text-title">
            <NoPowerSvg />
            <span>Kesintiye Ata</span>
          </div>
          <span className={`icon ${isDropdownOpen ? "open" : ""}`}>
            <ChevronDownSvg />
          </span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <button
              className="dropdown-item"
              onClick={() => {
                optionsHandler("Plansız");
              }}
            >
              <MinusCalenderSvg />
              <span>Plansız Kesinti Oluştur</span>
            </button>
            <button
              className="dropdown-item disabled"
              onClick={() => {
                optionsHandler("Planlı");
              }}
            >
              <AddCalenderSvg />
              <span>Planlı Kesinti Oluştur</span>
            </button>
          </div>
        )}
      </button>
      <button
        className="menu-item"
        onClick={() => {
          optionsHandler("notif");
        }}
      >
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <CursurSwipeRightSvg />
            <span>Kesintiye Ata</span>
          </div>
        </div>
      </button>
      <button
        className="menu-item"
        onClick={() => {
          optionsHandler("table");
        }}
      >
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <CursurSwipeRightSvg />
            <span>Kesintiden Ayır</span>
          </div>
        </div>
      </button>
      <button
        className="menu-item"
        onClick={() => {
          optionsHandler("tree");
        }}
      >
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <EarthLocationSvg />
            <span>Bildirimi Haritada Göster</span>
          </div>
        </div>
      </button>
      <button className="menu-item">
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <DocumentSvg />
            <span>Bildirimi Detayına Git</span>
          </div>
        </div>
      </button>
      <button
        className="menu-item"
        onClick={() => {
          optionsHandler("notif");
        }}
      >
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderCloseSvg />
            <span> Bildirimi İptal Et</span>
          </div>
        </div>
      </button>
    </div>
  );
  return (
    <>
      <DropdownWrapper
        title={
          <div className="operation-title">
            <span>Operasyonlar</span>
            <div className="operation-title-amount">6 Bildirim</div>
          </div>
        }
        toggleBtn={
          <Button onClick={() => {}} variant="secondary" leftIcon={<ListSvg />}>
            <span>Operasyonlar</span>
          </Button>
        }
        closeButton={true}
        leftOffset="-100px"
      >
        {content}
      </DropdownWrapper>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalValues.title}
        description={modalValues.description}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        submitButtonText="Devam Et"
        cancelButtonText="Vazgeç"
        footerType="confirmationNotif"
      >
        <p className="operation-notif-body">
          Seçtiğiniz 1234 numaralı bildirim 3456 numaralı kesinti ile
          eşleştirilecektir. Onaylıyor musunuz?
        </p>
      </NotificationModal>
    </>
  );
};
