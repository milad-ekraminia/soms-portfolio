import { SvgProps } from "@/types/icons/types";
import { InterfaceSvg } from "@/assets/icons/interface-svg";
import { BellSvg } from "@/assets/icons/bell-svg";
import { NetworkSvg } from "@/assets/icons/network-svg";
import { GearSvg } from "@/assets/icons/gear-svg";
import { OgssSvg } from "@/assets/icons/ogss-svg";
import { UnplannedOutageSvg } from "@/assets/icons/unplanned-outage-svg";
import { PlannedOutageSvg } from "@/assets/icons/planned-outage-svg";
import { OutageSvg } from "@/assets/icons/outage-svg";
import { SimulationSvg } from "@/assets/icons/simulation-svg";
import { MapSvg } from "@/assets/icons/map-svg";
import { FilesSvg } from "@/assets/icons/files-svg";
import { RotateArrowSvg } from "@/assets/icons/rotate-arrow-svg";
import { NetworkHistorySvg } from "@/assets/icons/network-history-svg";

export interface ItemsProps {
  title: string;
  Icon: (props: SvgProps) => any;
  route?: string;
  id: number;
  children?: ItemsProps[];
  permission?: string; // Parent permission check
  external?: boolean; // External link flag
  disabled?:boolean
}

export const NAV_ITEMS: ItemsProps[] = [
  {
    title: "Ana Sayfa",
    Icon: InterfaceSvg,
    route: "/",
    id: 1,
    permission: "ControlCenterModule.UICustomPermissions.Dashboard",
  },
  {
    title: "Bildirim",
    Icon: BellSvg,
    route: "/bildirimler",
    id: 2,
    permission: "ControlCenterModule.UICustomPermissions.Notifications",
  },
  {
    title: "Kesinti",
    Icon: NetworkSvg,
    id: 3,
    permission: "ControlCenterModule.UICustomPermissions.Outages",
    children: [
      {
        title: "Plansız Kesintiler",
        Icon: UnplannedOutageSvg,
        route: "/plansiz-kesintiler",
        id: 31,
      },
      {
        title: "Planlı Kesintiler",
        Icon: PlannedOutageSvg,
        route: "/planli-kesintiler",
        id: 32,
        disabled: true,
      },
    ],
  },
  {
    title: "Harita",
    Icon: MapSvg,
    route: "/harita",
    permission: "ControlCenterModule.UICustomPermissions.Map",
    id: 4,
    disabled: true,
  },
  {
    title: "Raporlar",
    Icon: FilesSvg,
    route: "/raporlar",
    permission: "ControlCenterModule.UICustomPermissions.Report",
    id: 5,
    disabled: true,
  },
  {
    title: "Yaşam Döngüsü",
    Icon: RotateArrowSvg,
    route: "/yasam-dongusu",
    permission: "ControlCenterModule.UICustomPermissions.Lifecycle",
    id: 6,
    disabled: true,
  },

  {
    title: "Ayarlar",
    Icon: GearSvg,
    route: "/ayarlar",
    permission: "ControlCenterModule.UICustomPermissions.Settings",
    id: 7,
  },
  {
    title: "OGSS",
    Icon: OgssSvg,
    id: 8,
    permission: "ControlCenterModule.UICustomPermissions.OGSS",
    children: [
      {
        title: "Kesintiler",
        Icon: OutageSvg,
        route: "/ogss/kesintiler",
        id: 81,
      },
      {
        title: "Simulasyon",
        Icon: SimulationSvg,
        route: "/ogss/simulasyon",
        id: 82,
        disabled: true,
      },
      {
        title: "Tarihsel Şebeke",
        Icon: NetworkHistorySvg,
        route: "/ogss/tarihsel-sebeke",
        id: 83,
        disabled: true,
      },
    ],
  },
];
