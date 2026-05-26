import { useState, useCallback } from "react";
import MainLayout from "@/components/layouts/page-layout/main-layout";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/button";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import "./simulasyon.scss";
import SimulationTreeChart from "@/components/ui/tree-chart/simulation-tree-chart";

interface TreeNode {
  [key: string]: any;
}

const Simulation = () => {
  const [gisId, setGisId] = useState<number>();
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [formMessage, setFormMessage] = useState(
    "Lütfen GIS numarasını giriniz."
  );

  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchTreeNodes({
        gisId,
        requestReason: 0,
      });

      setTreeData(data);
      if (data.length > 0) {
        setFormMessage("");
      } else {
        setFormMessage("Sonuç Bulunamadı.");
      }
    } catch (error: any) {
      console.log("Fetch error:", error);
      setTreeData(null);
      setFormMessage("Bu GIS numarasıyla eşleşen bir veri bulunamadı.");
    }
  }, [gisId]);

  return (
    <MainLayout hasNotification={false} title="Simulasyon">
      <div className="simulation__container">
        <div className="simulation__form">
          <Input
            type="number"
            placeholder="GIS Numarası"
            value={gisId}
            onChange={(e) => setGisId(Number(e.target.value))}
          />
          <Button onClick={handleSearch}>Ara</Button>
        </div>
        {formMessage.length > 0 ||
          (String(gisId).length > 0 && (
            <div className="simulation__tree">
              <SimulationTreeChart title="" treeData={treeData} />
            </div>
          ))}
        {formMessage && (
          <div className="simulation__form__message">{formMessage}</div>
        )}
      </div>
    </MainLayout>
  );
};

export default Simulation;
