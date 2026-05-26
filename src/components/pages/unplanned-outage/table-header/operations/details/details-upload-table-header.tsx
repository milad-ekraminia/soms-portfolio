
import { UploadSvgIcon } from "@/assets/icons/upload-svg-icon";
import { Button } from "@/components/ui/button/button";
interface DetailsUploadTableHeaderProps {
  setIsOpen: any;
}
const DetailsUploadTableHeader = ({
  setIsOpen,
}: DetailsUploadTableHeaderProps) => {
  return (
    <div className="details-document-header">
      <h2 className="title">Dokümanlar Listesi</h2>
      <div className="details-document-header__actions">
        <Button
          variant="primary"
          leftIcon={<UploadSvgIcon />}
          onClick={() => setIsOpen(true)}
        >
          Yükle
        </Button>
      </div>
    </div>
  );
};

export default DetailsUploadTableHeader;
