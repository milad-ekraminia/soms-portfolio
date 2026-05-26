import Drawer from "@/components/ui/drawer/drawer";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import Table from "@/components/ui/Table/table";
import { useState } from "react";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  columns: any;
}

export const DrawerTable = ({
  data,
  columns,
  isOpen,
  onClose,
}: DrawerProps) => {
  const [chosenValue, setChosenValue] = useState<number>();
  const [showNotification, setShowNotification] = useState(false);
  const submitHandler = () => {
    setShowNotification(true);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Kesintiye Ata"
        onSubmit={submitHandler}
      >
        <Table
          data={data}
          columns={columns}
          isLoading={false}
          renderLoading={() => <div>Loading...</div>}
          maxHeight="400px"
          selectedItem={chosenValue}
          setRadioSelect={setChosenValue}
          hasRadio
          columnOrder={columns}
          setColumnOrder={() => {}}
        />
      </Drawer>
      <NotificationModal
        isOpen={showNotification}
        onClose={() => {
          setShowNotification(false);
        }}
        title={"Kesintiden Ayır"}
        description={"Kesintiden ayırmak istiyor musunuz?"}
        onConfirm={() => {
          setShowNotification(false);
        }}
        onCancel={() => {
          setShowNotification(false);
        }}
        submitButtonText="Devam Et"
        cancelButtonText="Vazgeç"
        footerType="confirmationNotif"
      >
        <p className="operation-notif-body">
          Seçtiğiniz <button className="item-id">1234</button> numaralı bildirim{" "}
          <button className="item-id">3456</button> numaralı kesinti ile
          eşleştirilecektir. Onaylıyor musunuz?
        </p>
      </NotificationModal>
    </>
  );
};
