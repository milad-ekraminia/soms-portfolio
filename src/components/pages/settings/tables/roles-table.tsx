import Table from "@/components/ui/Table/table";

import { useState } from "react";
import RolesTableHeader from "./roles-table-header";

interface SettingsRolesTableProps {
  handlebackClick: (section: string) => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNotifModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifText: React.Dispatch<React.SetStateAction<string>>;
  setRolesDrawerTitle: React.Dispatch<React.SetStateAction<string>>;
}

const RolesTable = ({
  handlebackClick,
  setIsDeleteModalOpen,
  setRoleModalOpen,
  setIsNotifModalOpen,
  setNotifText,
  setConfirmationModal,
  setRolesDrawerTitle,
}: SettingsRolesTableProps) => {
  const handleEdit = () => {
    setRoleModalOpen(true);
    setRolesDrawerTitle("Rol ve Yetki Güncelleme");
  };
  const handleNewRole = () => {
    setRoleModalOpen(true);
    setRolesDrawerTitle("Yeni Rol Ekle");
  };
  const handleDelete = () => {
    setConfirmationModal(false);
    setNotifText("Rolü silebilmek için kullanıcı sayısı 0 olmalıdır.");

    setIsNotifModalOpen(true);
  };
  console.log("🚀 ~ handleDelete ~ handleDelete:", handleDelete, handleEdit);
  const handleMultiDelete = () => {
    if (selectedRows?.length == 1) {
      setConfirmationModal(false);
      setNotifText("Rolü silebilmek için kullanıcı sayısı 0 olmalıdır.");
    } else {
      setConfirmationModal(true);
      setNotifText(
        `${selectedRows?.length} rolü silmek istediğinizden emin misiniz?`,
      );
    }

    setIsNotifModalOpen(true);
  };

  const settingsTableColumn: any = [];
  const settingsRolesTableData: any = [];
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const selectRowsHandler = (id: number, isAll = false) => {
    if (isAll) {
      if (selectedRows?.length === settingsRolesTableData.length) {
        deselectAllRows();
      } else {
        selectAllRows();
      }
    } else {
      if (selectedRows?.includes(id)) {
        setSelectedRows(selectedRows?.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    }
  };
  const selectAllRows = () => {
    setSelectedRows(settingsRolesTableData.map((row:any) => row.id));
  };
  const deselectAllRows = () => {
    setSelectedRows([]);
  };
  return (
    <Table
      data={settingsRolesTableData}
      columns={settingsTableColumn}
      isLoading={false}
      renderLoading={() => <div>Loading...</div>}
      maxHeight="400px"
      headerChildren={
        <RolesTableHeader
          handlebackClick={handlebackClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleEdit={handleNewRole}
          selectedRows={selectedRows}
          handleDelete={handleMultiDelete}
        />
      }
      selectRowsHandler={selectRowsHandler}
      hasCheckbox
      selectedRows={selectedRows}
      columnOrder={settingsTableColumn}
      setColumnOrder={() => {}}
    />
  );
};

export default RolesTable;
