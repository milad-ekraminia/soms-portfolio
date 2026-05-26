import { CornerUpLeftSvg } from "@/assets/icons/corner-up-left-svg";
import { TrashSvg } from "@/assets/icons/trash-svg";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { Input } from "@/components/ui/input/Input";
import { popLastTreeSearch } from "@/store/app/highlighted-nodes-slice";
import { useDispatch } from "react-redux";

export const TreeFilter = ({
  searchValue,
  setSearchValue,
  onSearch,
  handleMonitoringChange,
  checkedSystems,
  onClearSearch,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  handleMonitoringChange: (value: string, checked: boolean) => void;
  checkedSystems: any;
  onClearSearch: any;
}) => {
  
  const dispatch = useDispatch();
  return (
    <div className="outage-tree-filter">
      <div className="input-wrapper">
        <Input
          placeholder="Ağaçta Ara"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {searchValue ? (
          <>
            <Button variant="secondary" onClick={onSearch}>
              Ara
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(popLastTreeSearch());
              }}
            >
              <CornerUpLeftSvg />
            </Button>
            <Button variant="secondary" onClick={onClearSearch}>
              <TrashSvg stroke="#344054" />
            </Button>
          </>
        ) : null}
      </div>
      <div className="action-groups">
        <span className="title">İzleme Sistemleri:</span>
        {["SCADA", "OSOS", "İzlenmeyenler"].map((system) => (
          <div className="action" key={system}>
            <Checkbox
              onChange={(checked: any) => {
                handleMonitoringChange(system, checked);
              }}
              checked={checkedSystems.includes(system)}
            />
            {system}
          </div>
        ))}
      </div>
    </div>
  );
};
