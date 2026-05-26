import { useState } from "react";
import Toggle from "@/components/ui/input/toggle-button/Toggle";
import { kvkkData } from "@/helpers/data/settings";

const KvkkDrawer = () => {
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>(
    kvkkData.reduce((acc, item) => {
      acc[item.id] = item.status;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleToggleChange = (id: number) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="kvkk-drawer">
      <div className="kvkk-drawer__header">
        <h2 className="kvkk-drawer__header-title">Gizlenecek Bilgiler</h2>
        <span>Gizle / Göster</span>
      </div>
      <div className="kvkk-drawer__body">
        <ul className="kvkk-drawer__body-list">
          {kvkkData?.map((item) => (
            <li className="list-item" key={item.id}>
              <span className="list-item__title">{item?.displayName}</span>
              <Toggle
                isOn={toggleStates[item.id]}
                setIsOn={() => handleToggleChange(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KvkkDrawer;
