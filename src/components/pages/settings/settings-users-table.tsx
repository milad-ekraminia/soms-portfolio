import { DangerSvg } from "@/assets/icons/danger-svg";

import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";

import { useState } from "react";
import { AddNewUser } from "./modals/add-new-user";
import UsersTable from "./tables/users-table";
import Drawer from "@/components/ui/drawer/drawer";

interface SettingsUsersTableProps {
  handlebackClick: (section: string) => void;
}
export const SettingsUsersTable = ({
  handlebackClick,
}: SettingsUsersTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [notifText, setNotifText] = useState("");

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
  };
  const handleAddUserCloseModal = () => {
    setAddUserModalOpen(false);
  };

  const handleAddUserConfirm = () => {
    setAddUserModalOpen(false);
  };

  return (
    <>
      <UsersTable
        handlebackClick={handlebackClick}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setAddUserModalOpen={setAddUserModalOpen}
        setNotifText={setNotifText}
        setDrawerTitle={setDrawerTitle}
      />
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
        <p className="settings-rol-alert-notification-body">{notifText}</p>
      </NotificationModal>
      <Drawer
        isOpen={addUserModalOpen}
        onClose={handleAddUserCloseModal}
        title={drawerTitle}
        onSubmit={handleAddUserConfirm}
        closeBtnText={"Vazgeç"}
        submitBtnText={"Kaydet"}
      >
        <AddNewUser />
      </Drawer>
    </>
  );
};
