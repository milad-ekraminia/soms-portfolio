import Tree, { Orientation } from "react-d3-tree";
import { useEffect, useRef, useState } from "react";

import { getDynamicPathClass, transformTreeData } from "@/helpers/tree-utils";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { Loader } from "@/components/ui/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { renderOutageNode } from "./historical-tree-nodes";
import { openDrawer } from "@/store/app/drawer-slice";
import { OgssStationItemArray } from "@/types/components/pages/ogss/simulation";

interface HistoricalTreeChartProps {
  rotate?: "horizontal" | "vertical";
  goUp?: boolean;
  data: OgssStationItemArray | null;
  setData: any;
  renderKey: any;
  isLoading: any;
  showUnWatched?: any;
  setShowUnWatched?: any;
}
const HistoricalTreeChart = ({
  rotate,
  goUp,
  data,
  setData,
  isLoading,
  showUnWatched,
  renderKey,
  setShowUnWatched,
}: HistoricalTreeChartProps) => {
  const highlightedNodes = useSelector((state: any) => state.highlightedNodes);
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate] = useState({ x: 696, y: 200 });
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const [isParentLoading, setIsParentLoading] = useState(false);

  const nodeSize = { x: 260, y: 200 };
  const foreignObjectProps = {
    width: nodeSize?.x,
    height: nodeSize?.y,
    x: -90,
    y: -60,
  };

  const rotateHandler = () => {
    setOrientation(
      (prev) => (prev === "vertical" ? "horizontal" : "vertical") as Orientation
    );
  };

  const getParentNode = async () => {
    const parentId = data?.[0]?.parentId;
    setIsParentLoading(true);

    try {
      if (!parentId) return;
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
  const filterUntrackedItems = (data: any) => {
    return data
      .map((item: any) => {
        const newItem = { ...item };
        if (newItem?.children && newItem?.children.length > 0) {
          newItem.children = filterUntrackedItems(newItem?.children);
        }
        const hasMonitoringData =
          newItem?.monitoringSystemInfoList?.monitoringSystemInfoDetails
            ?.length > 0;
        if (
          hasMonitoringData ||
          (newItem?.children && newItem?.children?.length > 0)
        ) {
          return newItem;
        }
        return null;
      })
      .filter((item: any) => item !== null);
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
      if (!!data && data.length > 0) {
        setShowUnWatched(false);
      }
    }
  }, []);
  return (
    <div className="tree" ref={containerRef}>
      {isLoading || isParentLoading ? (
        <Loader />
      ) : !!data && data.length > 0 ? (
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
        <div className="tree__message"> Veri bulunamadı.</div>
      )}
    </div>
  );
};

export default HistoricalTreeChart;
