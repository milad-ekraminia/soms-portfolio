import Table from "@/components/ui/Table/table";

import { useState } from "react";
import UsersTableHeader from "./users-table-header";
interface SettingsUsersTableProps {
  handlebackClick: (section: string) => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifText: React.Dispatch<React.SetStateAction<string>>;
  setDrawerTitle: React.Dispatch<React.SetStateAction<string>>;
}
const UsersTable = ({
  handlebackClick,
  setIsDeleteModalOpen,
  setAddUserModalOpen,
  setNotifText,
  setDrawerTitle,
}: SettingsUsersTableProps) => {
  const settingsUsersTableData: any = [];
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleEdit = () => {
    setAddUserModalOpen(true);
    setDrawerTitle("Kullanıcı Güncelleme");
  };

  const handleDelete = () => {
    setNotifText(
      "Kullanıcı Mehmet Aslan’i silmek istediğinizden emin misiniz?",
    );
    setIsDeleteModalOpen(true);
  };
  const handleMultiDelete = () => {
    if (selectedRows?.length == 1) {
      setNotifText(
        "Kullanıcı Mehmet Aslan’i silmek istediğinizden emin misiniz?",
      );
    } else {
      setNotifText(
        `${selectedRows?.length} kullanıcıyı silmek istediğinizden emin misiniz?`,
      );
    }
    setIsDeleteModalOpen(true);
  };
  const selectRowsHandler = (id: number, isAll = false) => {
    if (isAll) {
      if (selectedRows?.length === settingsUsersTableData.length) {
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
    setSelectedRows(settingsUsersTableData.map((row:any) => row.id));
  };
  const deselectAllRows = () => {
    setSelectedRows([]);
  };
  const userColumn: any = [];
  console.log("🚀 ~ UsersTable ~ handleEdit:", handleEdit, handleDelete);

  return (
    <Table
      data={settingsUsersTableData}
      columns={userColumn}
      isLoading={false}
      renderLoading={() => <div>Loading...</div>}
      maxHeight="400px"
      headerChildren={
        <UsersTableHeader
          handlebackClick={handlebackClick}
          handleMultiDelete={handleMultiDelete}
          setAddUserModalOpen={setAddUserModalOpen}
          selectedRows={selectedRows}
          setDrawerTitle={setDrawerTitle}
        />
      }
      selectRowsHandler={selectRowsHandler}
      hasCheckbox
      selectedRows={selectedRows}
      columnOrder={userColumn}
      setColumnOrder={() => {}}
    />
  );
};

export default UsersTable;
