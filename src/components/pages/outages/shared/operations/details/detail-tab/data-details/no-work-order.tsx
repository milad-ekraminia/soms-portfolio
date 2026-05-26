import React, { useEffect } from "react";
import { Button } from "@/components/ui/button/button";
import { WorkAvatarSvg } from "@/assets/icons/work-avatar-svg";
import { useCountdownToMinute } from "@/hooks/use-count-down-to";

type Props = {
  sendingDelayedUntilDateTime?: string | null;
  onSendNow: () => void;
  isSending?: boolean;
  refetchOutageDetail: () => Promise<any>;
};

export const WorkOrderNotSent: React.FC<Props> = ({
  sendingDelayedUntilDateTime,
  onSendNow,
  isSending,
  refetchOutageDetail,
}) => {
  const { justFinished, label, shouldAuto } = useCountdownToMinute(
    sendingDelayedUntilDateTime
  );

  useEffect(() => {
    if (justFinished && shouldAuto) {
      refetchOutageDetail();
    }
  }, [justFinished, refetchOutageDetail]);

  return (
    <div className="workorder-empty">
      <WorkAvatarSvg />

      <div className="workorder-empty__timer">
        <strong>{sendingDelayedUntilDateTime ? label : "00:00:00"}</strong>

        <div className="workorder-empty__hint">
          Süre tamamlandığında otomatik olarak sahaya gönderilecektir.
        </div>
      </div>

      <Button
        variant="secondary-color"
        onClick={onSendNow}
        disabled={isSending || !shouldAuto}
        isPending={isSending}
      >
        Hemen Sahaya Gönder
      </Button>
    </div>
  );
};
