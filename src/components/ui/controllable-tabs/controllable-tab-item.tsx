import { CloseSvg } from "@/assets/icons/close-svg";
import { RefreshSvg } from "@/assets/icons/refresh-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { removeOutageTab, setActiveTab } from "@/store/app/outage-tabs-slice";
import { useDispatch } from "react-redux";

export const ControllableTabItem = ({
  data,
  refreshHandler,
}: {
  data: any;
  refreshHandler: any;
}) => {
  const isActive = data?.isActive;
  const dispatch = useDispatch();
  const deleteHandler = () => {
    if (data?.isActive) {
      dispatch(removeOutageTab(data?.tabId));
    }
  };
  return (
    <div
      className={getClassNames("controllable-tabs-item", [
        [data?.isActive, "active"],
      ])}
      onClick={() => {
        if (!isActive) {
          dispatch(setActiveTab(data?.tabId));
        }
      }}
    >
      <span>
        {data?.outageId} {data?.ompName ? `- ${data?.ompName}` : ""}
      </span>
      <button
        type="button"
        onClick={() => {
          if (isActive) {
            refreshHandler();
          }
        }}
      >
        <RefreshSvg stroke={isActive ? "#344054" : undefined} />
      </button>
      <button
        type="button"
        onClick={() => {
          deleteHandler();
        }}
      >
        <CloseSvg stroke={isActive ? "#344054" : undefined} />
      </button>
    </div>
  );
};
