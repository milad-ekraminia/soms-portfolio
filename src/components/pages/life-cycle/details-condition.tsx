import NotificationDetails from "./sections/notification-details/notification-details";
import AffectedInstallationSummary from "./sections/installation-summary/affected-installation-summary";
import OutageDetails from "./sections/outage-details/outage-details";

import Reconciliation from "./sections/reconciliation/reconciliation";
import ReportsEffects from "./sections/reports-effects/reports-effects";

export const renderDetails = (activeStep: number) => {
  switch (activeStep) {
    case 0:
      return <NotificationDetails />;
    case 1:
      return <OutageDetails />;
    case 2:
      return <AffectedInstallationSummary />;
    case 3:
      return <ReportsEffects />;
    case 4:
      return <Reconciliation />;
    default:
      return null;
  }
};
