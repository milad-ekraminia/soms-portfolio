import "./tree-chart.scss";
import Tree, { Orientation } from "react-d3-tree";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";
import FullScreenSvg from "@/assets/icons/full-screen-svg";
import RotateSvg from "@/assets/icons/rotate-svg";
import CircledArrowTopSvg from "@/assets/icons/circled-arrow-top-svg";
import { getDynamicPathClass, transformTreeData } from "@/helpers/tree-utils";
import { renderSimulationNode } from "./node";
import { createNotificationFromTree } from "@/services/tree/fetch-notification-from-tree";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";

interface TreeChartProps {
  treeData?: any;
  title: string;
  modalSizeHanlder?: () => void;
}
const SimulationTreeChart = ({
  title,
  modalSizeHanlder,
  treeData,
}: TreeChartProps) => {
  const [data, setData] = useState(treeData ?? []);
  const [renderKey, setRenderKey] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate] = useState({ x: 696, y: 200 });
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const [initialDepth] = useState(100);
  const [dataKey] = useState("false");
  const nodeSize = { x: 260, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -90,
    y: -52,
  };
  const [cutNotificationList, setCutNotificationList] = useState<any>([]);
  const [giveNotificationList, setGiveNotificationList] = useState<any>([]);
  const rotateHandler = () => {
    setOrientation(
      (prev) => (prev === "vertical" ? "horizontal" : "vertical") as Orientation
    );
  };

  const sendCutNotification = async (id: number) => {
    console.log(id);
    try {
      await createNotificationFromTree({
        id,
        energyState: false,
      });
      setCutNotificationList((oldarray: any) => [...oldarray, id]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendGiveNotification = async (id: number) => {
    console.log(id);
    try {
      const res = await createNotificationFromTree({
        id,
        energyState: true,
      });
      console.log(res);
      setGiveNotificationList((oldarray: any) => [...oldarray, id]);
    } catch (error) {
      console.log(error);
    }
  };

  const getParentNode = async () => {
    const parentId = data[0].parentId;
    try {
      const res = await fetchTreeNodes({
        ompId: Number(parentId),
        requestReason: 0,
      });
      const transformed = transformTreeData(res);
      setData(transformed);
      setRenderKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (treeData) {
      const transformed = transformTreeData(treeData);
      setData(transformed);
      setRenderKey((prev) => prev + 1);
    } else {
      setData([]);
    }
  }, [treeData]);

  return (
    <div className="tree" ref={containerRef}>
      <div className="tree__header">
        <h3 className="tree__header-title">{title}</h3>
        <div className="tree__header-actions">
          <Button
            variant="secondary"
            leftIcon={<CircledArrowTopSvg />}
            onClick={getParentNode}
          >
            <span>Bir Üste Çık</span>
          </Button>
          <Button
            variant="secondary"
            leftIcon={<RotateSvg />}
            onClick={rotateHandler}
          >
            <span>Yatay Göster</span>
          </Button>
          <Button
            variant="secondary"
            leftIcon={<FullScreenSvg />}
            onClick={modalSizeHanlder}
          >
            <span>Tam Ekran</span>
          </Button>
        </div>
      </div>

      {data?.length > 0 ? (
        <Tree
          key={renderKey}
          zoom={1}
          zoomable={true}
          data={data}
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
            })
          }
          orientation={orientation}
          pathFunc={"diagonal"}
          pathClassFunc={getDynamicPathClass}
          initialDepth={dataKey === "false" ? initialDepth : 0}
          dataKey={dataKey}
        />
      ) : (
        <div className="tree__message"> Veri bulunamadı.</div>
      )}
    </div>
  );
};

export default SimulationTreeChart;
