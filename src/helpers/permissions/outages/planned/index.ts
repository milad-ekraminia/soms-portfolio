export const PLANNED_WAITING_OUTAGES_OPERATIONS_PERMISSIONS = {
  CREATE_PLANNED_OUTAGE: "ControlCenterModule.Board.CreatePlannedOutage",
  GET_NON_RECURRING_TREE_NODES_PARALLEL:
    "ControlCenterModule.Board.GetNonRecurringTreeNodesParallel",
  CREAT_UNPLANNED_OUTAGE_STEP:
    "ControlCenterModule.Board.CreateUnplannedOutageStep",

  GET_OUTAGE_DETAIL_WITH_PLANNED:
    "ControlCenterModule.Board.GetPlannedOutageDetail",
  CANCEL_PLANNED_OUTAGE: "ControlCenterModule.Board.CancelPlannedOutage",
  APPROVE_PLANNED_OUTAGE: "ControlCenterModule.Board.ApprovePlannedOutage",
} as const;

// Array of all permission values for easy checking
export const PLANNED_Waiting_OUTAGES_OPERATIONS_PERMISSIONS_ARRAY =
  Object.values(PLANNED_WAITING_OUTAGES_OPERATIONS_PERMISSIONS);
export const PLANNED_APPROVED_OUTAGES_OPERATIONS_PERMISSIONS = {
  GET_NON_RECURRING_TREE_NODES_PARALLEL:
    "ControlCenterModule.Board.GetNonRecurringTreeNodesParallel",
  ENERGIZE_THE_INTERRUPTION: "ControlCenterModule.Board.PlannedOutageEnergize",
  CREAT_UNPLANNED_OUTAGE_STEP:
    "ControlCenterModule.Board.CreateUnplannedOutageStep",
  GET_OUTAGE_DETAIL_WITH_PLANNED:
    "ControlCenterModule.Board.GetPlannedOutageDetail",
  CANCEL_PLANNED_OUTAGE: "ControlCenterModule.Board.CancelPlannedOutage",
  MANUAL_SMS_SEND: "ControlCenterModule.Board.SendManualSmsForOutage",
  ARCHIVE_PLANNED_OUTAGE: "ControlCenterModule.Board.ArchivePlannedOutage",
} as const;

// Array of all permission values for easy checking
export const PLANNED_APPROVED_OUTAGES_OPERATIONS_PERMISSIONS_ARRAY =
  Object.values(PLANNED_APPROVED_OUTAGES_OPERATIONS_PERMISSIONS);
