import React, { useState } from "react";
import { Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import { type FeatureInfoResponse, type PopupState } from "./types";

type Props = {
  wmsUrl: string;
  layers: string[];
};

export const GetFeatureInfoPopup: React.FC<Props> = ({ wmsUrl, layers }) => {
  const [popupData, setPopupData] = useState<PopupState>(null);

  useMapEvent("click", async (e) => {
    if (!layers.length) {
      setPopupData(null);
      return;
    }
    const leafletMap = e.target as L.Map;
    const size = leafletMap.getSize();
    const bounds = leafletMap.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const bbox = `${sw.lng},${sw.lat},${ne.lng},${ne.lat}`;
    const point = leafletMap.latLngToContainerPoint(e.latlng);

    const params: { [key: string]: string | number | boolean } = {
      service: "WMS",
      version: "1.1.1",
      request: "GetFeatureInfo",
      layers: layers.join(","),
      query_layers: layers.join(","),
      styles: "",
      bbox,
      srs: "EPSG:4326",
      width: size.x,
      height: size.y,
      format: "image/png",
      transparent: true,
      info_format: "application/json",
      x: Math.round(point.x),
      y: Math.round(point.y),
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const url = `${wmsUrl}?${queryString}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Server error");
      const data: FeatureInfoResponse = await res.json();
      if (data.features && data.features.length > 0) {
        const firstFeature = data.features[0];
        let layerName = "Unknown Layer";
        if (firstFeature.id) {
          layerName = firstFeature.id.split(".")[0];
        }
        setPopupData({
          latlng: e.latlng,
          attr: firstFeature.properties,
          layer: layerName,
        });
      } else {
        setPopupData(null);
      }
    } catch (err) {
      setPopupData(null);
    }
  });

  return popupData ? (
    <Popup
      position={popupData.latlng}
      eventHandlers={{
        remove: () => setPopupData(null),
      }}
    >
      <div>
        <h2>{popupData.layer}</h2>
        <ul>
          {Object.entries(popupData.attr).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  ) : null;
};