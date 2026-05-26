export enum StationSubType {
  IM = 1,
  DM = 2,
  TM = 3,
  KOK = 4,
}

export enum OutageTypes {
  Planned = 1,
  Unplanned = 2,
}

export enum SubjectTypes {
  SubscriberCableFault = 1,
  WireBreakFromPoleToHouse = 2,
  CableFault = 3,
  LargeScaleFailures = 4,
  MeterArcSmoke = 5,
  NoElectricityInBuilding = 6,
  ObjectFellOnWires = 7,
  FireFromTransformer = 8,
  ArcOnPole = 9,
  GeneralFault = 10,
  ConductorEntanglement = 11,
  InsulatorExplosion = 12,
  PoleDamageOrBent = 13,
  ArcInPanel = 14,
  FireFromPanel = 15,
  TransformerFault = 16,
  Tsuis = 17,
  VoltageDrop = 18,
  PhaseLossSinglePhase = 19,
  WireExplosion = 20,
  PartialElectricityInBuilding = 21,
  TransformerExplosion = 22,
  PoleCollapsed = 23,
  NoElectricityAtHome = 24,
  VoltageRise = 25,
  WireBreak = 26,
  Theft = 27,
  OtherFault = 28,
  NoElectricityInArea = 29,
  NoElectricityInNeighborhood = 30,
  FirstAndSecondLevelMaintanence = 31,
  CustomerInstallationRelations = 32,
  UnauthorizedDisconnection = 33,
  FireInAnOpenArea = 34,
  FaultPreventiveSafetyActivities = 35,
  LightingPoleCoverInstallation = 36,
  LightingCheck = 37,
  LightingLambFailure = 38,
  LightingLambsOnDuringDay = 39,
  DisconnectorArcingAndFault = 40,
  FireOnTheBuild = 41,
  CollectingCbsData = 42,
  DCRectifierSystemCheck = 43,
  Relocation = 44,
  PetitionReview = 45,
  ElectricalFaultLeakage = 46,
  Flicker = 47,
  GeneralLightingBrightnessLevelIsHigh = 48,
  ObservationAndSiteInvestigation = 49,
  DamagedElectricalPanelNotification = 50,
  CableDamage = 51,
  IllegalConnectionCancellation = 52,
  CircuitBreakerDisconnectorCellReplacementFault = 53,
  MaterialWriteOff = 54,
  SwitchingOperation = 55,
  MobileLightingNotification = 56,
  CustomerServicesDirectorateWork = 57,
  ContractorWork = 58,
  NoNeutral = 59,
  AutomaticLightingCircuitFaultWorkOrder = 60,
  AutomaticLoadImbalanceOverload = 61,
  PanelDoorOpen = 62,
  PanelInspection = 63,
  RelayFault = 64,
  RelayCoordination = 65,
  FieldMaterialInspection = 66,
  RequestForTechnicalQualityMeasurementDevice = 67,
  WireIsHanging = 68,
  TransformerBuildingDoorIsOpen = 69,
  NewFacilityGeneralLightingRequest = 70,
  UndergroundCablesHaveBurst = 71,
  LoadMeasurementOperationsControl = 72,
  DamageAndLossProcedures = 73,
}

export enum PriorityTypes {
  Critical = 1,
  High = 2,
  Medium = 3,
  Low = 4,
}

export enum PlannedOutageStatusTypes {
  PendingApproval = 1,
  Approved = 2,
  Started = 3,
  Completed = 4,
  Canceled = 5,
}

export enum PlannedReasonTypes {
  FirstAndSecondLevelMaintenance = 1,
  ThirdLevelMaintenance = 2,
  ContractorFacilityWorks = 3,
  TEİASCompanyOutageRequests = 4,
  SubstationKetWorks = 5,
  ThirdPartyOutageRequests = 6,
  RelayAutomationWorks = 7,
  OSOSFieldOperationRequests = 8,
  InternalDepartmentOutageRequests = 9,
  FaultAndPreventiveSafetyActivities = 10,
}

export enum WorkForceStatusTypes {
  Opened = 1,
  Assigned = 2,
  CrewsDispatched = 3,
  Completed = 4,
}

export enum MessageChannelTypes {
  SMS = 1,
  Mail = 2,
  PushNotification = 3,
}

export enum OutageCauseTypes {
  NetworkOperator = 1,
  ForceMajeure = 2,
  Security = 3,
  External = 4,
}

export enum OutageReasonTypes {
  DisconnectMechanismAdjustment = 1,
  CapacitorFailureOperation = 2,
  HighVoltageConductorBreak = 3,
  LowVoltageConductorTwist = 4,
  LightingBallastFailureReplacement = 5,
  LightingFixtureInstallationRemoval = 6,
  HighVoltageSubscriptionConnectionCancellation = 7,
  CellFailure = 8,
  LowVoltageTerminalBreak = 9,
  TransformerSwitchOperation = 10,
  BusbarFailure = 11,
  NeutralFault = 12,
  HighVoltageTerminalBreak = 13,
  CircuitBreakerFailure = 14,
  LowVoltageSag = 15,
  LowVoltageSubscriptionConnectionCancellation = 16,
  PanelFrameRepair = 17,
  CurrentTransformerFailure = 18,
  HighVoltageCableHeadExplosion = 19,
  CurrentTransformerReplacementInstallationRemoval = 20,
  HighVoltagePhysicalConnectionDisconnection = 21,
  ThirdPartyInterruptionRequests = 22,
  PanelShortCircuit = 23,
  HighVoltageJumperBreakDamage = 24,
  ConductorEnteringObjectClearance = 25,
  LightingContactorFailureReplacement = 26,
  SurgeProtectorFailure = 27,
  HighVoltageConductorTwist = 28,
  TreePruning = 29,
  VoltageTransformerInstallationReplacement = 30,
  BuildingEntranceCableDamage = 31,
  HighVoltageFuseBlowReplacement = 32,
  DistributionTransformerFailure = 33,
  HighVoltageConductorLooseConnectionDrop = 34,
  AstronomicalTimeRelayInstallationRemoval = 35,
  AdverseWeatherConditions = 36,
  FacilityContractorWorksRequest = 37,
  ExternalTheft = 38,
  FeedSourceSwitching = 39,
  Security = 40,
  FacilitySubstationWorksRequest = 41,
  VerticalFuseLoadDisconnectFailure = 42,
  OSOSSiteOperationsRequest = 43,
  InsulatorFailureReplacement = 44,
  PoleToppling = 45,
  RelayAutomationWorksRequest = 46,
  ExternalVehicleCollision = 47,
  DisconnectSwitchReplacementInstallationRemoval = 48,
  ExternalThirdPartyIntervention = 49,
  InternalUnitWorkRequests = 50,
  TransmissionSystemFailures = 51,
  ObservationDetectionDataCollection = 52,
  SurgeProtectorNewInstallationRemoval = 53,
  LowVoltageConductorTerminationFailure = 54,
  LightingConductorCableFaultBreak = 55,
  PoleDamage = 56,
  TransmissionCompanyOutageRequests = 57,
  AutomaticFuseReplacement = 58,
  LightingPoleInstallationRemoval = 59,
  SpecialFacilityFault = 60,
  FirstSecondLevelMaintenance = 61,
  LightingIgnitorFailureReplacement = 62,
  ExternalCropFires = 63,
  PanelReplacement = 64,
  TransformerSwitchFailureReplacement = 65,
  CellReplacementInstallationRemoval = 66,
  ThirdLevelMaintenanceWorks = 67,
  FaultAndRiskPreventiveActivities = 68,
  LowVoltageConductorLooseConnectionDrop = 69,
  NHFuseBlowReplacement = 70,
  HighVoltageSag = 71,
  BuildingCableDamage = 72,
  FacilityFailure = 73,
  HighVoltageCableExplosion = 74,
  AGCInstallationRemovalFailure = 75,
  LowVoltageConductorBreak = 76,
  RelayFailure = 77,
  ExcavationRoadDamage = 78,
  RecloserReplacementInstallationRemoval = 79,
  HighVoltageConnectionDisconnection = 80,
  AutomaticFuseOpening = 81,
  RecloserTemporaryFailure = 82,
  PoleDamagePassiveParts = 83,
  CircuitBreakerReplacementInstallationRemoval = 84,
  ElectricalLeakageInPassiveParts = 85,
  LowVoltageTerminalDamage = 86,
  RecloserFault = 87,
  VoltageTransformerFailure = 88,
  CircuitBreakerTemporaryFailure = 89,
  TransformerLoadBalancing = 90,
}

export enum MessageCategorieses {
  PlannedPlanned = 1,
  PlannedStarted = 2,
  PlannedCompleted = 3,
  PlannedUpdated = 4,
  PlannedCancelled = 5,
  UnPlannedStarted = 6,
  UnPlannedCompleted = 7,
  UnPlannedUpdated = 8,
}

export enum TriggerTypes {
  Automatic = 1,
  Manual = 2,
  WFM = 3,
}

export enum DocumentTypes {
  Pdf = 1,
  Xlsx = 2,
  Jpg = 3,
  Docx = 4,
}

export enum OutageStatusTypes {
  Open = 1,
  Energized = 2,
  Closed = 3,
  MergedToUpperParent = 4,
  MergedToCommonParent = 5,
  MergedBySubOutage = 6,
  ClosedBySystem = 7,
  CancelledByUser = 8,
}

export enum OutageSourceTypes {
  DagitimAG = 1,
  DagitimOG = 2,
  Iletim = 3,
}

export enum OutageEndTypes {
  Notification = 1,
  CheckEnergyState = 2,
  WFM = 3,
  Manuel = 4,
}

export enum SourceSystems {
  SCADA = 1,
  YGVT = 2,
  OSOS = 3,
  TFI = 4,
  CALLCENTER = 5,
  IOT = 6,
  ManualNotification = 7,
}

export enum SourceSystemDeviceTypes {
  MusteriOSOS = 1,
  AydınlatmaOSOS = 2,
  TrafoOSOS = 3,
  YGVT = 4,
}

export enum OsosDeviceType {
  Other = 0,
  MusteriOSOS = 1,
}

export enum NotificationTypes {
  Notification = 1,
  CheckEnergyState = 2,
  SiblingStatusCheck = 3,
  AskAncestor = 4,
  NotificationFromFrontend = 5,
  ManualFalseNotification = 6,
  ManualTrueNotification = 7,
}

export enum NotificationStatus {
  Unknown = 0,
  Waiting = 1,
  Processing = 2,
  Processed = 3,
  InstallationNotExistsInTree = 4,
  NotFoundInCommLayer = 5,
  Cancel = 6,
  SeperateByUser = 7,
  SeparatedByTimeUpdate = 8,
}

export enum OutageActivityTypes {
  Open = 0,
  WaitingApprovement = 1,
  Approved = 2,
  MütabakatBaşladı = 3,
  MütabakatBitti = 4,
  Archived = 5,
}

export enum SourceSystemCategories {
  SCADASistemleri = 1,
  ModemSistemleri = 2,
  CRMSistemleri = 3,
  ManuelNotification = 4,
}

export enum CheckEnergyStateReason {
  PeriodicControl = 1,
  SiblingStatusCheck = 2,
  CheckManuever = 3,
  AskAncestor = 4,
}

export enum EnergyStates {
  NotControlledYet = -1,
  HasNoEnergy = 0,
  HasEnergy = 1,
}

export enum FeedingTypes {
  OG = 1,
  AG = 2,
}

export enum OmpStatus {
  Active = 1,
  Passive = 0,
}

export enum MonitoringSystemStatus {
  Active = 1,
  Passive = 0,
}

export enum ModemDataType {
  Supply = 0,
  Din1 = 1,
  Din2 = 2,
  Din3 = 3,
  Din4 = 4,
}

export enum TreeRequestReason {
  Simulation = 0,
  Outage = 1,
  HistoricalTree = 2,
}

export enum ModemEnergyCheckReq {
  HasNoEnergy = 0,
  HasEnergy = 1,
  Unknown = -1,
  NoResponseFromApi = -2,
}

export enum StationType {
  IndiriciDagiticiMerkez = 1,
  TrafoBinasi = 2,
  DirekUstuTrafo = 3,
  SDK = 4,
  Kofre = 5,
  Tesisat = 6,
}

export enum OmpValidity {
  Valid = 1,
  Invalid = 2,
  InvalidInstallation = 3,
  EqualsZero = 4,
}

export enum NotificationLogDetailType {
  Created = 1,
  LinkedWithOutage = 2,
  UnlinkedFromOutage = 3,
  Cancelled = 4,
  CouldntLinkedWithAnOutage = 5,
  DeletedCesNot = 6,
}

export enum OutageLogDetailType {
  Created = 1,
  StartDateTimeUpdated = 2,
  EndDateTimeUpdated = 3,
  Merged = 4,
  LocationChanged = 5,
  Closed = 6,
  Cancelled = 7,
  Archived = 8,
}
export enum ApprovalTriggerRuleType {
  CUSTOMERLIMIT = 1,
}
export enum NotificationCancelTypes {
  CancellationByUser = 1,
  CancellationBySystem = 2,
  CancellationByData = 3,
}
