import { DangerSvg } from "@/assets/icons/danger-svg";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { useState } from "react";
import { RoleModal } from "./modals/role-modal";
import RolesTable from "./tables/roles-table";
import Drawer from "@/components/ui/drawer/drawer";
interface SettingsRolesTableProps {
  handlebackClick: (section: string) => void;
}
export const SettingsRolesTable = ({
  handlebackClick,
}: SettingsRolesTableProps) => {
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [rolesDrawerTitle, setRolesDrawerTitle] = useState("");
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
  };
  const handleMotifModal = () => {
    setIsNotifModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleAddUserConfirm = () => {
    setRoleModalOpen(false);
  };
  return (
    <div className="add-new-role">
      <RolesTable
        handlebackClick={handlebackClick}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setRoleModalOpen={setRoleModalOpen}
        setIsNotifModalOpen={setIsNotifModalOpen}
        setNotifText={setNotifText}
        setConfirmationModal={setConfirmationModal}
        setRolesDrawerTitle={setRolesDrawerTitle}
      />
      <NotificationModal
        isOpen={isNotifModalOpen}
        onClose={handleMotifModal}
        title={"UYARI"}
        onConfirm={handleMotifModal}
        onCancel={handleMotifModal}
        cancelButtonText={confirmationModal ? "Vazgeç" : "Tamam"}
        submitButtonText={confirmationModal ? "Sil" : ""}
        footerType={confirmationModal ? "confirmationError" : "fullNotif"}
        icon={<DangerSvg />}
      >
        <p className="settings-rol-alert-notification-body">{notifText}</p>
      </NotificationModal>
      <NotificationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"UYARI"}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        submitButtonText="Sil"
        cancelButtonText="Vazgeç"
        footerType="confirmationError"
        icon={<DangerSvg />}
      >
        <p className="settings-rol-alert-notification-body">
          Kullanıcı Mehmet Aslan’i silmek istediğinizden emin misiniz?
        </p>
      </NotificationModal>
      <Drawer
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title={rolesDrawerTitle}
        onSubmit={handleAddUserConfirm}
        closeBtnText={"İptal Et"}
        submitBtnText={"Ekle"}
      >
        <RoleModal data={{
            categories: [],
            fullControl: false
          }} />
      </Drawer>
    </div>
  );
};
