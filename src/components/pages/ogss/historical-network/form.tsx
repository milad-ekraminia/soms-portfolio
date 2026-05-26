import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
import "./historical-network.scss";
import DateInput from "@/components/ui/input/date-input/date-input";

export const HistoricalNetworkForm = ({
  onClickHandler,
}: {
  onClickHandler: any;
}) => {
  const [ompNumber, setOmpNumber] = useState("");
  const [ompName, setOmpName] = useState("");
  const [version, setVersion] = useState("");
  const [gisNumber, setGisNumber] = useState("");
  const [date, setDate] = useState("");

    const hasGroup1 = useMemo(
      () => Boolean(ompNumber?.trim() || ompName?.trim() || gisNumber?.trim()),
      [ompNumber, ompName, gisNumber]
    );

    // group-2: date/version
    const hasGroup2 = useMemo(
      () => Boolean(date || version?.trim()),
      [date, version]
    );
    
  const isValid = hasGroup1 && hasGroup2;
  const isDisabled = !isValid;
  // Disable logic for OMP/GIS fields
  const disableOmpId = !!ompName || !!gisNumber;
  const disableGisId = !!ompName || !!ompNumber;
  const disableOmpName = !!ompNumber || !!gisNumber;

  // Disable logic for date/version fields
  const disableDate = !!version;
  const disableVersion = !!date;

  // Button disabled logic
  const submitButtonDisabled = () => {
    const hasDateOrVersion = !!date || !!version;
    const isValid =
      (!!ompNumber && hasDateOrVersion) ||
      (!!gisNumber && hasDateOrVersion) ||
      (!!ompName && hasDateOrVersion);
    return !isValid;
  };

  return (
    <div className="historical-network__form">
      <div className="historical-network__form-group">
        <Input
          placeholder="OMP Numarası"
          value={ompNumber}
          onChange={(e) => setOmpNumber(e.target.value)}
          disabled={disableOmpId}
        />
        <Input
          placeholder="OMP Adı"
          value={ompName}
          onChange={(e) => setOmpName(e.target.value)}
          disabled={disableOmpName}
        />
        <Input
          placeholder="GIS Numarası"
          value={gisNumber}
          onChange={(e) => setGisNumber(e.target.value)}
          disabled={disableGisId}
        />
      </div>
      <div className="historical-network__form-group">
        <DateInput
          value={date}
          onChange={(val) => setDate(val)}
          disabled={disableDate}
          hasClearBtn
        />
        <Input
          placeholder="Versiyon"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          disabled={disableVersion}
        />
      </div>
      <Button
        onClick={() => {
          if (!submitButtonDisabled()) {
            let params = "";
            if (ompNumber) {
              params = `?ompId=${ompNumber}`;
            } else if (ompName) {
              params = `?ompName=${ompName}`;
            } else if (gisNumber) {
              params = `?gisId=${gisNumber}`;
            }
            // Add date/version to params if needed
            if (date) {
              params += params ? `&date=${date}` : `?date=${date}`;
            }
            if (version) {
              params += params
                ? `&versionId=${version}`
                : `?versionId=${version}`;
            }
            onClickHandler(params);
          }
        }}
        disabled={isDisabled}
        tooltip="Her iki gruptan birer veri girilmesi zorunludur."
      >
        Ara
      </Button>
    </div>
  );
};
