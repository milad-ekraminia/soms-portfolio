import "./tree-chart.scss";
import Tree, { Orientation } from "react-d3-tree";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";
import FullScreenSvg from "@/assets/icons/full-screen-svg";
import RotateSvg from "@/assets/icons/rotate-svg";
import CircledArrowTopSvg from "@/assets/icons/circled-arrow-top-svg";
import { getDynamicPathClass, transformTreeData } from "@/helpers/tree-utils";
import { renderOutageNode } from "./node";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { useTreeData } from "@/hooks/outage/use-tree-data";
import { Loader } from "../loader/loader";

interface TreeChartProps {
  title: string;
  modalSizeHanlder?: () => void;
  selectedRows?: number[];
  outageData: any;
}
const TreeChart = ({
  title,
  modalSizeHanlder,
  selectedRows,
  outageData,
}: TreeChartProps) => {
  const [data, setData] = useState<any>([]);
  const [renderKey, setRenderKey] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate] = useState({ x: 696, y: 200 });
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const nodeSize = { x: 260, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -90,
    y: -60,
  };

  const rotateHandler = () => {
    setOrientation(
      (prev) => (prev === "vertical" ? "horizontal" : "vertical") as Orientation
    );
  };

  const { data: treeData, isLoading } = useTreeData({
    outageData,
    selectedRows,
  });

  useEffect(() => {
    if (treeData) {
      setData(treeData);
      setRenderKey((prev) => prev + 1);
    }
  }, [treeData]);

  const getParentNode = async () => {
    const parentId = data[0].parentId;
    try {
      const res = await fetchTreeNodes({
        ompId: Number(parentId),
        requestReason: 0,
      });

      const transformedData = transformTreeData(res);
      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

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
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <Tree
          key={renderKey}
          zoom={1}
          zoomable={true}
          data={data as any}
          translate={translate}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) =>
            renderOutageNode({
              ...rd3tProps,
              foreignObjectProps,
              orientation,
            })
          }
          orientation={orientation}
          pathFunc={"diagonal"}
          pathClassFunc={getDynamicPathClass}
        />
      ) : (
        <div className="tree__message"> Veri bulunamadı.</div>
      )}
    </div>
  );
};

export default TreeChart;
