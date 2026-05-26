import { AlertSvg } from "@/assets/icons/alert-svg";
import { ArrowCircleBrokenSVG } from "@/assets/icons/arrow-circle-broken-svg";
import { ExpandSvg } from "@/assets/icons/expand-svg";
import { EyeOffSvg } from "@/assets/icons/eye-off-svg";
import { EyeSvg } from "@/assets/icons/eye-svg";
import { RotateTreeSVG } from "@/assets/icons/rotate-tree-svg";
import { Button } from "@/components/ui/button/button";
import Tooltip from "@/components/ui/tooltip/tooltip";

export const ActionRows = ({
  setShhowFull,
  setGoUp,
  setRotate,
  showUnWatched,
  setShowUnWatched,
  setShowInformation,
  showFull,
  goUp,
  rotate,
}: {
  showFull: boolean;
  goUp: boolean;
  rotate: "horizontal" | "vertical";
  setShhowFull: (value: boolean) => void;
  setGoUp: (value: boolean) => void;
  setRotate: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>;
  showUnWatched: boolean;
  setShowUnWatched: (value: boolean) => void;
  setShowInformation: (value: boolean) => void;
}) => {
  return (
    <div className="action-rows">
      <Tooltip text="Bilgiler">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<AlertSvg width="20" height="20" stroke="var(--fg-secondary-700)" />}
          onClick={() => setShowInformation(true)}
        />
      </Tooltip>
      <Tooltip text="Tam Ekran">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<ExpandSvg stroke="var(--fg-secondary-700)" />}
          onClick={() => setShhowFull(!showFull)}
        />
      </Tooltip>
      <Tooltip text={rotate ? "Yatay Göster" : "Dikey Göster"}>
        <Button
          type="button"
          variant="secondary"
          leftIcon={<RotateTreeSVG stroke="var(--fg-secondary-700)" />}
          onClick={() =>
            setRotate((prev) =>
              prev === "vertical" ? "horizontal" : "vertical"
            )
          }
        />
      </Tooltip>
      <Tooltip text="Bir Üste Çık">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<ArrowCircleBrokenSVG stroke="var(--fg-secondary-700)" />}
          onClick={() => setGoUp(!goUp)}
        />
      </Tooltip>
      <Tooltip
        text={showUnWatched ? "İzlenmeyenleri Göster" : "İzlenmeyenleri Gizle"}
      >
        <Button
          type="button"
          variant="secondary"
          leftIcon={showUnWatched ? <EyeSvg stroke="var(--fg-secondary-700)" /> : <EyeOffSvg />}
          onClick={() => setShowUnWatched(!showUnWatched)}
        />
      </Tooltip>
    </div>
  );
};
