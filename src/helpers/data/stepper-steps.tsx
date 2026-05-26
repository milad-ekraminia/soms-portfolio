import { BellRingingSvg } from "@/assets/icons/bell-ringing-svg";
import { DatabaseSvg } from "@/assets/icons/database-svg";
import { StackedServersSvg } from "@/assets/icons/stacked-servers-svg";
import { TasklistAnalyticsSvg } from "@/assets/icons/tasklist-analytics-svg";
import { LineChartSvg } from "@/assets/icons/line-chart-svg";

export const stepperSteps = [
  { icon: <BellRingingSvg />, label: "Bildirim Detayları" },
  { icon: <DatabaseSvg />, label: "Kesinti Detayları" },
  { icon: <StackedServersSvg />, label: "Etkilenen Tesisatlar" },
  { icon: <TasklistAnalyticsSvg />, label: "Raporlara Etkisi" },
  { icon: <LineChartSvg />, label: "Mutabakat" },
];
