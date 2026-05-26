import { FolderCheckMarkSvg } from "@/assets/icons/folder-check-mark-svg";
import { getClassNames } from "@/helpers/get-class-names";
interface CreateLevelProps {
  selectedRows?: number[];
  tableDrawer: boolean;
  setTableDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateLevel = ({
  selectedRows = [],
  tableDrawer,
  setTableDrawer,
}: CreateLevelProps) => {
  const optionsHandler = () => {
    setTableDrawer(!tableDrawer);
  };
  return (
    <button
      className={getClassNames("menu-item", [
        [selectedRows?.length != 1, "disabled"],
      ])}
      disabled={true}
      onClick={() => {
        optionsHandler();
      }}
    >
      <div className="menu-item__tooltip">
        <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
      </div>
      <div className="menu-item-text">
        <div className="menu-item-text-title">
          <FolderCheckMarkSvg />
          <span>Kademe Oluştur</span>
        </div>
      </div>
    </button>
  );
};

export default CreateLevel;
