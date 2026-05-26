import { useState, useEffect } from "react";
import { type Layer } from "./types";

const WMS_BASE_URL = import.meta.env.VITE_GEOSERVER_URL + "/wms";

export function useLayerTree(layers: string[], layerLabels: string[]) {
  const [state, setState] = useState<Layer[]>(
    layers.map((name, i) => ({
      name,
      label: layerLabels[i] || name,
      legendUrl: "",
      visible: true,
      zIndex: 1000 + (layers.length - i), // Highest zIndex on top in list order
    }))
  );

  useEffect(() => {
    state.forEach((layer) => {
      const legendUrl = `${WMS_BASE_URL}?service=WMS&version=1.1.1&request=GetLegendGraphic&format=image/png&layer=${layer.name}`;
      setState((s) =>
        s.map((l) => (l.name === layer.name ? { ...l, legendUrl } : l))
      );
    });
    // eslint-disable-next-line
  }, []); // Only on mount

  const toggle = (name: string) => {
    setState((layers) =>
      layers.map((l) => (l.name === name ? { ...l, visible: !l.visible } : l))
    );
  };

  return [state, toggle] as const;
}
