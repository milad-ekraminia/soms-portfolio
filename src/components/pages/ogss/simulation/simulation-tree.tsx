import Tree, { Orientation } from "react-d3-tree";
import { useEffect, useRef, useState } from "react";

import { getDynamicPathClass, transformTreeData } from "@/helpers/tree-utils";
import { createNotificationFromTree } from "@/services/tree/fetch-notification-from-tree";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { renderSimulationNode } from "./simulation-tree-node";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/ui/loader/loader";
import { openDrawer } from "@/store/app/drawer-slice";
import { OgssStationItemArray } from "@/types/components/pages/ogss/simulation";
import { useToast } from "@/providers/toast-provider";

interface TreeChartProps {
  rotate: "horizontal" | "vertical";
  goUp: boolean;
  data: OgssStationItemArray | null;
  isLoading?: boolean;
  showUnWatched: any;
  setShowUnWatched: any;
  setData: any;
  renderKey: any;
}
const SimulationTree = ({
  rotate,
  goUp,
  isLoading,
  data,
  showUnWatched,
  setShowUnWatched,
  setData,
  renderKey,
}: TreeChartProps) => {
  const highlightedNodes = useSelector((state: any) => state?.highlightedNodes);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate] = useState({ x: 696, y: 200 });
  const [orientation, setOrientation] = useState<Orientation>("vertical");

  const nodeSize = { x: 260, y: 200 };
  const foreignObjectProps = {
    width: nodeSize?.x,
    height: nodeSize?.y,
    x: -90,
    y: -52,
  };
  const [cutNotificationList, setCutNotificationList] = useState<any>([]);
  const [giveNotificationList, setGiveNotificationList] = useState<any>([]);
  const [isParentLoading, setIsParentLoading] = useState(false);
  const { showToast } = useToast();

  const sendCutNotification = async (id: number) => {
    try {
      await createNotificationFromTree({
        id,
        energyState: false,
      });
      setCutNotificationList((oldarray: any) => [...oldarray, id]);
    } catch (error: any) {
      showToast(
        error?.data?.error?.message,
        (String(error?.data?.error?.type).toLowerCase() as any) ?? "success"
      );
      console.log(error);
    }
  };

  const sendGiveNotification = async (id: number) => {
    try {
      await createNotificationFromTree({
        id,
        energyState: true,
      });
      setGiveNotificationList((oldarray: any) => [...oldarray, id]);
    } catch (error: any) {
      showToast(
        error?.data?.error?.message,
        (String(error?.data?.error?.type).toLowerCase() as any) ?? "success"
      );
      console.log(error);
    }
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
  const rotateHandler = () => {
    setOrientation(
      (prev) => (prev === "vertical" ? "horizontal" : "vertical") as Orientation
    );
  };
  useEffect(() => {
    if (goUp) {
      getParentNode();
    }
  }, [goUp]);

  useEffect(() => {
    if (orientation != rotate) rotateHandler();
  }, [rotate]);
  const filterUntrackedItems = (nodes: any[] = []): any[] => {
    return nodes
      .map((item) => {
        const newItem = { ...item, children: item.children ?? [] };

        if (newItem.children.length > 0) {
          newItem.children = filterUntrackedItems(newItem.children);
        }

        const hasMonitoringData =
          newItem.monitoringSystemInfoList?.monitoringSystemInfoDetails
            ?.length > 0;

        return hasMonitoringData || newItem.children.length > 0
          ? newItem
          : null;
      })
      .filter(Boolean);
  };

  const dispatch = useDispatch();

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
    ? filterUntrackedItems(data ?? []) ?? []
    : data ?? [];

  // Do not fallback to original data if filter result is empty
  const safeData = Array.isArray(filteredData) ? filteredData : [];

  useEffect(() => {
    if (showUnWatched && safeData.length === 0) {
      if (!!data && data.length > 0) {
        setShowUnWatched(false);
      }
    }
  }, [safeData]);
  return (
    <div className="tree" ref={containerRef}>
      {isLoading || isParentLoading ? (
        <Loader />
      ) : safeData.length > 0 ? (
        <Tree
          key={renderKey}
          zoom={1}
          zoomable={true}
          data={safeData}
          translate={translate}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) =>
            renderSimulationNode({
              ...rd3tProps,
              foreignObjectProps,
              orientation,
              sendCutNotification,
              sendGiveNotification,
              cutNotificationList,
              giveNotificationList,
              highlightedNodes,
              showDetailHandler,
            })
          }
          orientation={orientation}
          pathFunc={"diagonal"}
          pathClassFunc={getDynamicPathClass}
          // initialDepth={dataKey === "false" ? initialDepth : 0}
          // dataKey={dataKey}
        />
      ) : (
        <div className="tree__message"> Veri bulunamadı.</div>
      )}
    </div>
  );
};

export default SimulationTree;
