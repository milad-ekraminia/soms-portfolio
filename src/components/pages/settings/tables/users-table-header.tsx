import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";
import { DownloadSvg } from "@/assets/icons/download-svg";
import { SearchSvg } from "@/assets/icons/search-svg";
import { TrashSvg } from "@/assets/icons/trash-svg";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
interface SettingsUsersHeaderProps {
  handlebackClick: (section: string) => void;
  handleMultiDelete: () => void;
  setAddUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedRows: number[];
}
const UsersTableHeader = ({
  handlebackClick,
  handleMultiDelete,
  setAddUserModalOpen,
  setDrawerTitle,
  selectedRows,
}: SettingsUsersHeaderProps) => {
  return (
    <div className="table-wrapper__header">
      <div className="table-wrapper__header-title">
        <Button
          leftIcon={<ArrowLeftSvg />}
          variant="secondary"
          onClick={() => handlebackClick("")}
        ></Button>
        <span>Kullanıcı Ayarları</span>
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
          onClick={() => {
            setAddUserModalOpen(true);
            setDrawerTitle("Yeni Kullanıcı Ekleme");
          }}
          disabled={selectedRows?.length > 0}
        >
          Yeni Kullanıcı Ekle
        </Button>
        <Button variant="secondary" leftIcon={<DownloadSvg stroke="#175CD3" />}>
          Dışa Aktar
        </Button>
        <Button
          variant={"danger"}
          disabled={selectedRows?.length === 0}
          leftIcon={<TrashSvg stroke={"#fff"} />}
          onClick={() => {
            handleMultiDelete();
          }}
        >
          Sil
        </Button>
      </div>
    </div>
  );
};

export default UsersTableHeader;
