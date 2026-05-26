import { LatLng } from "leaflet";

export type FeatureInfoResponse = {
  type: "FeatureCollection";
  features: Array<{
    id: string;
    type: string;
    properties: { [key: string]: any };
    geometry?: any;
  }>;
};

export type PopupState = {
  latlng: LatLng;
  attr: { [key: string]: any };
  layer: string;
} | null;

export type TileBaseLayer = {
  id: string;
  label: string;
  url: string;
  previewUrl?: string;
};

export type Layer = {
  name: string;
  label: string;
  legendUrl: string;
  visible: boolean;
  zIndex: number;
};