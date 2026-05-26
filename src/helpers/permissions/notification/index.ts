export const NOTIFICATION_OPERATIONS_PERMISSIONS = {
  CREATE_OUTAGE_FROM_EXISTING_NOTIFICATIONS:
    "ControlCenterModule.Board.CreateOutageFromExistingNotifications",
  CONNECT_NOTIFICATIONS_TO_MANUAL_OUTAGE:
    "ControlCenterModule.Board.ConnectNotificationsToManualOutage",
  DISCONNECT_NOTIFICATIONS_FROM_OUTAGE:
    "ControlCenterModule.Board.DisconnectNotificationsFromOutage",
  GET_OUTAGE_DETAIL_WITH_OUTAGE_ID:
    "ControlCenterModule.Board.GetOutageDetailWithOutageId",
  CANCEL_NOTIFICATIONS: "ControlCenterModule.Board.CancelNotifications",
} as const;

// Array of all permission values for easy checking
export const NOTIFICATION_OPERATIONS_PERMISSIONS_ARRAY = Object.values(
  NOTIFICATION_OPERATIONS_PERMISSIONS
);
