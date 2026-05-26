import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
import "./simulation.scss";

export const SimulationForm = ({ onClickHandler }: { onClickHandler: any }) => {
  const [ompNumber, setOmpNumber] = useState("");
  const [ompName, setOmpName] = useState("");
  const [gisNumber, setGisNumber] = useState("");

  const hasValue = !!ompNumber || !!ompName || !!gisNumber;

  return (
    <div className="simulation__form">
      <Input
        placeholder="OMP Numarası"
        value={ompNumber}
        onChange={(e) => setOmpNumber(e.target.value)}
        disabled={hasValue && !ompNumber}
      />
      <Input
        placeholder="OMP Adı"
        value={ompName}
        onChange={(e) => setOmpName(e.target.value)}
        disabled={hasValue && !ompName}
      />
      <Input
        placeholder="GIS Numarası"
        value={gisNumber}
        onChange={(e) => setGisNumber(e.target.value)}
        disabled={hasValue && !gisNumber}
      />
      <Button
        onClick={() => {
          let params = "";
          if (ompNumber) {
            params = `?ompId=${ompNumber}`;
          } else if (ompName) {
            params = `?ompName=${ompName}`;
          } else if (gisNumber) {
            params = `?gisId=${gisNumber}`;
          }
          onClickHandler(params);
        }}
      >
        Ara
      </Button>
    </div>
  );
};
