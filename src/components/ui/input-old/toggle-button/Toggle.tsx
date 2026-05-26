import "./Toggle.scss";

interface ToggleProps {
  isOn: boolean;
  hasColorChange?: boolean;
  setIsOn: (isOn: boolean) => void;
}

const Toggle = ({ isOn, hasColorChange = true, setIsOn }: ToggleProps) => {
  return (
    <label className={`toggle ${isOn ? "active" : ""} ${hasColorChange && !isOn ? "color-change" : ""}`}>
      <input type="checkbox" checked={isOn} onChange={() => setIsOn(!isOn)} />
      <span className="toggle__slider"></span>
    </label>
  );
};

export default Toggle;
