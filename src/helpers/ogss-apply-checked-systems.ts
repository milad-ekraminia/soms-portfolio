import { setHighlightedNodes } from "@/store/app/highlighted-nodes-slice";
import { getNodesByMonitoringSystems } from "./get-nodes-by-monitoring-system";
type MonitoringSystem = "OSOS" | "SCADA";

export const applyCheckedSystems = (systems: string[], data: any, dispatch: any) => {
  // 🔁 This is the core logic you already have
  // Unwatched first
  if (systems.includes("İzlenmeyenler")) {
    const matched = data ? getNodesByMonitoringSystems(data, [], true) : [];
    dispatch(
      setHighlightedNodes({ type: "unMarkedDevice", nodeNames: matched })
    );
  } else {
    dispatch(setHighlightedNodes({ type: "unMarkedDevice", nodeNames: [] }));
  }

  // OSOS + SCADA systems
  const validSystems = systems.filter((s): s is MonitoringSystem =>
    ["OSOS", "SCADA"].includes(s)
  );

  if (data && validSystems.length > 0) {
    const matched = getNodesByMonitoringSystems(data, validSystems, false);
    dispatch(
      setHighlightedNodes({ type: "monitoringSystems", nodeNames: matched })
    );
  } else {
    dispatch(setHighlightedNodes({ type: "monitoringSystems", nodeNames: [] }));
  }
};
