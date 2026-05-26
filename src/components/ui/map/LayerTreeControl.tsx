import React from 'react';
import { useMap } from 'react-leaflet';
import { type Layer, type TileBaseLayer } from "./types";
import { LayerSymbolTree } from './LayerSymbolTree';

type Props = {
  baseLayers: TileBaseLayer[];
  baseLayerId: string;
  onBaseLayerChange: (id: string) => void;
  layers: Layer[];
  onToggle: (name: string) => void;
};

export const LayerTreeControl: React.FC<Props> = (props) => {
  useMap(); // context
  return <LayerSymbolTree {...props} />;
};