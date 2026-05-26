import Tree, { Orientation } from "react-d3-tree";
import { useEffect, useRef, useState } from "react";

import { getDynamicPathClass, transformTreeData } from "@/helpers/tree-utils";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { Loader } from "@/components/ui/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { renderOutageNode } from "./tree-node";
import { openDrawer } from "@/store/app/drawer-slice";

interface OutageTreeChartProps {
  rotate: "horizontal" | "vertical";
  goUp?: boolean;
  isLoading?: boolean;
  showUnWatched?: any;
  data: any;
  setData: any;
  renderKey: any;
  setShowUnWatched: any;
}
const OutageTreeChart = ({
  rotate,
  goUp,
  isLoading,
  showUnWatched,
  data,
  setData,
  renderKey,
  setShowUnWatched,
}: OutageTreeChartProps) => {
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate] = useState({ x: 696, y: 200 });
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const nodeSize = { x: 260, y: 200 };
  const [isParentLoading, setIsParentLoading] = useState(false);

  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -90,
    y: -60,
  };
  const highlightedNodes = useSelector((state: any) => state.highlightedNodes);
  const tabs = useSelector((state: any) => state.outageTabs);
  const activeTab: any = Object?.values(tabs)?.find((tab: any) => tab.isActive);
  const rotateHandler = () => {
    setOrientation(
      (prev) => (prev === "vertical" ? "horizontal" : "vertical") as Orientation
    );
  };

  const getParentNode = async () => {
    const parentId = data[0]?.parentId;
    if (!parentId) return;

    setIsParentLoading(true);
    try {
      const res = await fetchTreeNodes({
        ompId: Number(parentId),
        requestReason: 0,
      });

      const transformedData = transformTreeData(res);
      setData(transformedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsParentLoading(false);
    }
  };
  useEffect(() => {
    getParentNode();
  }, [goUp]);

  useEffect(() => {
    if (orientation != rotate) rotateHandler();
  }, [rotate]);
  const filterUntrackedItems = (data: any[]) => {
    return data
      .map((item) => {
        const newItem = { ...item };

        if (newItem?.children && newItem.children.length > 0) {
          newItem.children = filterUntrackedItems(newItem.children);
        }

        const hasMonitoringData =
          newItem?.monitoringSystemInfoList?.monitoringSystemInfoDetails
            ?.length > 0;

        const hasValidChildren =
          Array.isArray(newItem.children) && newItem.children.length > 0;

        if (hasMonitoringData || hasValidChildren) {
          // ✅ Ensure required props like `name` exist
          if (!newItem.name) newItem.name = "Unknown";
          return newItem;
        }

        return null;
      })
      .filter(Boolean); // Removes nulls
  };

  const showDetailHandler = (data: any) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outageTreeDetail",
        id: data?.id,
        rowData: data,
        clickedNode: true,
      })
    );
  };
  const filteredData = showUnWatched
    ? filterUntrackedItems(data) ?? []
    : data ?? [];

  // Do not fallback to original data if filter result is empty
  const safeData = Array.isArray(filteredData) ? filteredData : [];

  useEffect(() => {
    if (showUnWatched && safeData.length == 0) {
      if (data.length > 0) {
        setShowUnWatched(false);
      }
    }
  }, []);
  return (
    <div className="tree" ref={containerRef}>
      {isLoading || isParentLoading ? (
        <Loader />
      ) : data?.length > 0 && !!activeTab ? (
        (showUnWatched ? filterUntrackedItems(data) : data)?.length > 0 && (
          <Tree
            key={renderKey}
            zoom={1}
            zoomable={true}
            data={safeData}
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={(rd3tProps) =>
              renderOutageNode({
                ...rd3tProps,
                foreignObjectProps,
                orientation,
                highlightedNodes,
                showDetailHandler,
              })
            }
            orientation={orientation}
            pathFunc={"diagonal"}
            pathClassFunc={getDynamicPathClass}
          />
        )
      ) : (
        <div
          className="tree__message"
          style={{ color: "var(--text-secondary-700)" }}
        >
          Veri bulunamadı.
        </div>
      )}
    </div>
  );
};

export default OutageTreeChart;
