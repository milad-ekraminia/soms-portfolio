import Drawer from "@/components/ui/drawer/drawer";
import Details from "./details/details";
interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues: {
    title: string;
    type: string;
  };
  notificationId: number;
}
const DetailsDrawer = ({
  isOpen,
  onClose,
  drawerValues,
  notificationId,
}: DetailsDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={drawerValues?.title}
      hasFooter={false}
      size={"lg"}
    >
      <div className="outage-details-drawer">
        <Details notificationId={notificationId} />
      </div>
    </Drawer>
  );
};

export default DetailsDrawer;
