import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { ZapSvg } from "@/assets/icons/zap-svg";
import { getClassNames } from "@/helpers/get-class-names";
import {
  energyColors,
  PowerIconCreator,
  stationTypeColors,
} from "@/helpers/tree-utils";
import { Orientation } from "react-d3-tree";

export const renderOutageNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  orientation,
  highlightedNodes,
  showDetailHandler,
}: {
  nodeDatum: any;
  toggleNode: () => void;
  foreignObjectProps: any;
  orientation: Orientation;
  highlightedNodes: any;
  showDetailHandler: any;
}) => {
  const highlightType = (name: string): string | null => {
    const flatTreeSearch = highlightedNodes.treeSearch.flat();
    if (flatTreeSearch.includes(name)) return "tree-search";
    if (highlightedNodes.monitoringSystems.includes(name)) return "monitoring";
    if (highlightedNodes.markedNotification.includes(name))
      return "notification";
    if (highlightedNodes.markedOutage.includes(name)) return "outage";
    if (highlightedNodes.markedDevice.includes(name)) return "device";
    if (highlightedNodes?.unMarkedDevice?.includes(name)) return "monitoring";
    return "";
  };

  const highlightClass = highlightType(nodeDatum.name); // Use nodeDatum.name to check

  return (
    <g>
      <foreignObject {...foreignObjectProps}>
        <button
          className={getClassNames("node", [
            [nodeDatum?.feedingTypeString == "AG", "ag"],
            [!!highlightClass, highlightClass ?? ""],
          ])}
          onClick={() => {
            showDetailHandler(nodeDatum);
          }}
        >
          <div className="node-item">
            <span
              className={`${getClassNames("node-icon-name", [
                [nodeDatum?.feedingTypeString === "AG", "secondary"],
              ])} node-icon`}
              title={
                nodeDatum.feedingTypeString == "OG"
                  ? "Orta Gerilim"
                  : "Alçak Gerilim"
              }
            >
              {nodeDatum?.feedingTypeString}
            </span>
            <h3 className="node-title" title={nodeDatum.name}>
              {nodeDatum.name}
            </h3>
          </div>
          <div className="node-item">
            <span
              className="node-icon"
              style={{
                backgroundColor: stationTypeColors(nodeDatum.stationType),
              }}
            ></span>
            <h3 className="node-secondary-title" title={nodeDatum?.stationType}>
              {nodeDatum?.stationType}
            </h3>
          </div>
          <div className="node-item">
            <span
              className="node-icon"
              style={{
                background: PowerIconCreator(energyColors(nodeDatum)),
              }}
            >
              <ZapSvg fill="white" stroke="white" />
            </span>
            <h3 className="node-secondary-title">{energyColors(nodeDatum)}</h3>
          </div>
          <div className="node-item-monitoring">
            {nodeDatum.monitoringSystemInfoList?.monitoringSystemInfoDetails.map(
              (item: any) => (
                <span
                  className="node-item-monitoring-prefix"
                  title={item.monitoringSystemName}
                  key={item.monitoringSystemPrefix}
                >
                  {item.monitoringSystemPrefix}
                </span>
              )
            )}
          </div>
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
