import Drawer from "@/components/ui/drawer/drawer";
import Table from "../table";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
}

export const DrawerTable = ({
  data,
  columns,
  isOpen,
  onClose,
}: DrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Kesintiye Ata">
      <Table
        data={data}
        columns={columns}
        isLoading={false}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="400px"
        columnOrder={columns}
        setColumnOrder={() => {}}
      />``
    </Drawer>
  );
};
