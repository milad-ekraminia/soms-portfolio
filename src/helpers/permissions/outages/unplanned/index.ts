export const OUTAGES_OPERATIONS_PERMISSIONS = {
  CREATE_MANUAL_NOTIFICATION:
    "ControlCenterModule.Board.CreateManualNotification",
  GET_NON_RECURRING_TREE_NODES_PARALLEL:
    "ControlCenterModule.Board.GetNonRecurringTreeNodesParallel",
  CREAT_UNPLANNED_OUTAGE_STEP:
    "ControlCenterModule.Board.CreateUnplannedOutageStep",
  ENERGIZE_THE_INTERRUPTION:
    "ControlCenterModule.Board.EnergizeTheInterruption",
  GET_OUTAGE_DETAIL_WITH_OUTAGE_ID:
    "ControlCenterModule.Board.GetOutageDetailWithOutageId",
  CANCEL_OUTAGE: "ControlCenterModule.Board.CancelOutages",
  ARCHIVE_OUTAGE: "ControlCenterModule.Board.ArchiveOutages",
  MERGE_OUTAGE: "ControlCenterModule.Board.ManuallyMergeOutages",
  SEND_MANUAL_SMS: "ControlCenterModule.Board.SendManualSmsForOutage",
} as const;

// Array of all permission values for easy checking
export const OUTAGE_OPERATIONS_PERMISSIONS_ARRAY = Object.values(
  OUTAGES_OPERATIONS_PERMISSIONS
);
