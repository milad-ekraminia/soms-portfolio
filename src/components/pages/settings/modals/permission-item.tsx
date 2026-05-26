import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { getClassNames } from "@/helpers/get-class-names";
import { PermissionCategory } from "@/types/components/pages/settings";
import { useState } from "react";
interface PermissionItemProps {
  //api type
  data: PermissionCategory;
  toggleFullCategoryControl: (categoryId: number, enabled: boolean) => void;
  togglePermission: (categoryId: number, permissionId: number) => void;
}
export const PermissionItem = ({
  data,
  toggleFullCategoryControl,
  togglePermission,
}: PermissionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const checkCategoryStatus = () => {
    const total = data.permissions.length;
    const activeCount = data.permissions.filter((p) => p.enabled).length;

    if (activeCount === total) return "active";
    if (activeCount === 0) return "deactive";
    return "semi";
  };
  const activeChecker = () => {
    if (checkCategoryStatus() == "active" || checkCategoryStatus() == "semi") {
      return false;
    } else {
      return true;
    }
  };
  const countChecker = () => {
    const count = data.permissions.filter((p) => p.enabled).length;
    return count;
  };
  const Icon = data?.Icon;
  return (
    <div className="permission-item">
      <div className="item-header">
        <div className="title">
          <Icon stroke="#1570EF" />
          <span>{data?.name}</span>
        </div>
        <div className="action">
          <div
            className={getClassNames("active-count", [
              [countChecker() == data?.permissions?.length, "full"],
            ])}
          >
            <span>{countChecker()}</span>
            <span>/</span>
            <span>{data?.permissions?.length}</span>
            <span>Yetki</span>
          </div>
          <Checkbox
            onChange={() =>
              toggleFullCategoryControl(Number(data?.id), activeChecker())
            }
            checked={
              checkCategoryStatus() == "active" ||
              checkCategoryStatus() == "semi"
            }
            status={checkCategoryStatus()}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={getClassNames("dropdown-btn", [
              [isExpanded, "expanded"],
            ])}
          >
            <ChevronDownSvg />
          </button>
        </div>
      </div>
      <div
        className={getClassNames("dropdown-sub-items", [
          [isExpanded, "expanded"],
        ])}
      >
        <div className="sub-items">
          {data?.permissions?.map((item) => (
            <div className="sub-item" key={item?.id}>
              <span className="title">{item?.name}</span>
              <Checkbox
                onChange={() => {
                  togglePermission(Number(data?.id), Number(item?.id));
                }}
                checked={item?.enabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
