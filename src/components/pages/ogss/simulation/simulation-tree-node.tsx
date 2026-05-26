import { BellSvg } from "@/assets/icons/bell-svg";
import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { stationTypeColors } from "@/helpers/tree-utils";
import { Orientation } from "react-d3-tree";

export const renderSimulationNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  orientation,
  sendCutNotification,
  sendGiveNotification,
  giveNotificationList,
  cutNotificationList,
  highlightedNodes,
  showDetailHandler,
}: {
  nodeDatum: any;
  toggleNode: () => void;
  foreignObjectProps: any;
  orientation: Orientation;
  sendCutNotification: (id: number) => void;
  sendGiveNotification: (id: number) => void;
  giveNotificationList: any;
  cutNotificationList: any;
  highlightedNodes: any;
  showDetailHandler: any;
}) => {
  const highlightType = (name: string): string | null => {
    const flatTreeSearch = highlightedNodes?.treeSearch.flat();
    if (flatTreeSearch.includes(name)) return "tree-search";
    if (highlightedNodes?.monitoringSystems.includes(name)) return "monitoring";
    if (highlightedNodes?.markedNotification.includes(name))
      return "notification";
    if (highlightedNodes?.markedOutage.includes(name)) return "outage";
    if (highlightedNodes?.markedDevice.includes(name)) return "device";
    if (highlightedNodes?.unMarkedDevice?.includes(name)) return "monitoring";
    return "";
  };

  const highlightClass = highlightType(nodeDatum?.name); // Use nodeDatum.name to check

  return (
    <g>
      <foreignObject {...foreignObjectProps}>
        <button
          className={getClassNames("node", [
            [nodeDatum?.feedingTypeString === "AG", "ag"],
            [!!highlightClass, highlightClass ?? ""],
          ])}
          onClick={() => {
            showDetailHandler(nodeDatum);
          }}
        >
          <g className="node-item-notifications">
            {cutNotificationList?.includes(nodeDatum?.id) && (
              <div className="node-item-notification">
                <BellSvg fill="red" stroke="none" width="16" height="16" />
              </div>
            )}
            {giveNotificationList?.includes(nodeDatum?.id) && (
              <div className="node-item-notification">
                <BellSvg fill="green" stroke="none" width="16" height="16" />
              </div>
            )}
          </g>
          <div className="node-item">
            <span
              className={`${getClassNames("node-icon-name", [
                [nodeDatum?.feedingTypeString === "AG", "secondary"],
              ])} node-icon`}
              title={
                nodeDatum?.feedingTypeString == "OG"
                  ? "Orta Gerilim"
                  : "Alçak Gerilim"
              }
            >
              {nodeDatum?.feedingTypeString}
            </span>
            <h3 className="node-title" title={nodeDatum?.name}>
              {nodeDatum?.name}
            </h3>
          </div>
          <div className="node-item">
            <span
              className="node-icon"
              style={{
                backgroundColor: stationTypeColors(nodeDatum?.stationType),
              }}
            ></span>
            <h3 className="node-secondary-title" title={nodeDatum?.stationType}>
              {nodeDatum?.stationType}
            </h3>
          </div>
          <div className="node-item-monitoring">
            {nodeDatum?.monitoringSystemInfoList?.monitoringSystemInfoDetails?.map(
              (item: any) => (
                <span
                  className="node-item-monitoring-prefix"
                  title={item?.monitoringSystemName}
                  key={item?.monitoringSystemPrefix}
                >
                  {item?.monitoringSystemPrefix}
                </span>
              )
            )}
          </div>
          <div className="node-button__container">
            <div
              className="node-button node-button__left"
              onClick={(e) => {
                e.stopPropagation();
                sendCutNotification(nodeDatum?.id);
              }}
            >
              Enerji Gitti
            </div>
            <div
              className="node-button node-button__right"
              onClick={(e) => {
                e.stopPropagation();
                sendGiveNotification(nodeDatum?.id);
              }}
            >
              Enerji Geldi
            </div>
          </div>
          <div className="node-buttons"></div>
          {nodeDatum?.children?.length > 0 && (
            <div
              className={`node-arrow ${
                orientation === "horizontal"
                  ? "node-arrow-right"
                  : "node-arrow-bottom"
              }`}
              onClick={toggleNode}
            >
              <ChevronDownSvg />
            </div>
          )}
        </button>
      </foreignObject>
    </g>
  );
};
