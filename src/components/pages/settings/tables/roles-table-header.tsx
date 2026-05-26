import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";
import { SearchSvg } from "@/assets/icons/search-svg";
import { TrashSvg } from "@/assets/icons/trash-svg";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
interface SettingsRolesTableProps {
  handlebackClick: (section: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRows: number[];
}
const RolesTableHeader = ({
  handlebackClick,
  handleEdit,
  setIsDeleteModalOpen,
  handleDelete,
  selectedRows,
}: SettingsRolesTableProps) => {
  console.log("🚀 ~ RolesTableHeader ~ setIsDeleteModalOpen:", setIsDeleteModalOpen)
  return (
    <div className="table-wrapper__header">
      <div className="table-wrapper__header-title">
        <Button
          leftIcon={<ArrowLeftSvg />}
          variant="secondary"
          onClick={() => handlebackClick("")}
        ></Button>
        <span>Roller Listesi</span>
      </div>
      <div className="table-wrapper__header-actions">
        <div className="table-wrapper__header-search">
          <Input leftIcon={<SearchSvg />} placeholder="Kullanıcı arama ..." />
        </div>
        <Button
          variant="primary"
          leftIcon={
            <AddPlusSvg stroke={selectedRows?.length > 0 ? "#98a2b3" : "#fff"} />
          }
          disabled={selectedRows?.length > 0}
          onClick={() => {
            handleEdit();
          }}
        >
          Yeni Rol Ekle
        </Button>

        <Button
          variant={"danger"}
          disabled={selectedRows?.length === 0}
          leftIcon={<TrashSvg stroke={"#fff"} />}
          onClick={() => {
            handleDelete();
          }}
        >
          Sil
        </Button>
      </div>
    </div>
  );
};

export default RolesTableHeader;
