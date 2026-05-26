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
  showFull,
  goUp,
  rotate,
  setShowInformation,
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
          leftIcon={<AlertSvg width="20" height="20" stroke="#344054" />}
          onClick={() => setShowInformation(true)}
        />
      </Tooltip>
      <Tooltip text="Tam Ekran">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<ExpandSvg stroke="#344054" />}
          onClick={() => setShhowFull(!showFull)}
        />
      </Tooltip>
      <Tooltip text={rotate ? "Yatay Göster" : "Dikey Göster"}>
        <Button
          type="button"
          variant="secondary"
          leftIcon={<RotateTreeSVG />}
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
          leftIcon={<ArrowCircleBrokenSVG />}
          onClick={() => setGoUp(!goUp)}
        />
      </Tooltip>
      <Tooltip
        text={showUnWatched ? "İzlenmeyenleri Göster" : "İzlenmeyenleri Gizle"}
      >
        <Button
          type="button"
          variant="secondary"
          leftIcon={showUnWatched ? <EyeSvg /> : <EyeOffSvg />}
          onClick={() => setShowUnWatched(!showUnWatched)}
        />
      </Tooltip>
    </div>
  );
};
