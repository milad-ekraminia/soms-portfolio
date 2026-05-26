import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvent, GeoJSON } from "react-leaflet";
import { useLayerTree } from "./useLayerTree";
import { LayerTreeControl } from "./LayerTreeControl";
import { type TileBaseLayer } from "./types";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import { SearchBox } from "./SearchBox";
import "./SearchBox.scss";
import { VectorTileLayer } from "./VectorTileLayer";
import L from "leaflet";
import { RefreshToggle } from "./RefreshToggle";

const VECTOR_TILES_BASE_URL =
  import.meta.env.VITE_GEOSERVER_URL + "/gwc/service/tms/1.0.0";

const LAYER_NAMES = [
  "soms_dicle_gis_ws:lv_breaker",
  "soms_dicle_gis_ws:rekortman",
  "soms_dicle_gis_ws:distribution_box",
  "soms_dicle_gis_ws:pole",
  "soms_dicle_gis_ws:lv_lines",
  "soms_dicle_gis_ws:hv_lines",
  "soms_dicle_gis_ws:circuitbreaker",
  "soms_dicle_gis_ws:separator",
  "soms_dicle_gis_ws:transformer",
  "soms_dicle_gis_ws:switchgear",
  "soms_dicle_gis_ws:station",
  "soms_dicle_gis_ws:city",
];

const BASE_LAYERS: TileBaseLayer[] = [
  {
    id: "osm",
    label: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    previewUrl: "https://tile.openstreetmap.org/12/2048/1364.png",
  },
  {
    id: "esri",
    label: "ESRI World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    previewUrl:
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/12/1280/3054",
  },
];

const LAYER_LABELS = LAYER_NAMES.map((l) => l.split(":")[1]);

const OutageMap: React.FC = () => {
  const [layerTree, toggleLayer] = useLayerTree(LAYER_NAMES, LAYER_LABELS);
  const position: [number, number] = [37.7, 40.5];

  const [baseLayerId, setBaseLayerId] = useState<string>(BASE_LAYERS[0].id);
  const selectedBase = BASE_LAYERS.find((bl) => bl.id === baseLayerId)!;

  const [highlightedFeature, setHighlightedFeature] = useState<{
    geometry: any;
    layer: string;
  } | null>(null);
  const [highlightedFeatures, setHighlightedFeatures] = useState<Array<{
    geometry: any;
    layer: string;
  }> | null>(null);

  return (
    <MapContainer
      center={position}
      zoom={9}
      maxZoom={25}
      style={{
        height: "100%",
        width: "100%",
        gridColumn: "span 12",
        borderRadius: "4px",
      }}
    >
      <RefreshToggle />

      <SearchBox
        onHighlight={(feature) => {
          setHighlightedFeature(feature);
          setHighlightedFeatures(null);
        }}
      />

      {selectedBase && (
        <TileLayer
          key={selectedBase.id}
          url={selectedBase.url}
          attribution={selectedBase.label}
        />
      )}

      {/*
      {layerTree
        .filter((layer) => layer.visible)
        .map((layer) => (
          <WMSTileLayer
            key={layer.name}
            url={WMS_BASE_URL}
            layers={layer.name}
            format="image/png"
            transparent={true}
            version="1.1.1"
            maxZoom={25}
            zIndex={layer.zIndex}
          />
        ))}
      */}

      {layerTree
        .filter((layer) => layer.visible)
        .map((layer) => (
          <VectorTileLayer
            key={layer.name}
            url={`${VECTOR_TILES_BASE_URL}/${layer.name}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`}
            zIndex={layer.zIndex}
            layerName={layer.name.split(":")[1]} // this is the vector tile layer's name for styling
            onHighlight={(features) => {
              setHighlightedFeatures(features);
              setHighlightedFeature(null);
            }}
          />
        ))}

      {/*<GetFeatureInfoPopup wmsUrl={WMS_BASE_URL} layers={visibleLayers} />*/}

      <LayerTreeControl
        baseLayers={BASE_LAYERS}
        baseLayerId={baseLayerId}
        onBaseLayerChange={setBaseLayerId}
        layers={layerTree}
        onToggle={toggleLayer}
      />

      <MapClickClearHighlight
        onClear={() => {
          setHighlightedFeature(null);
          setHighlightedFeatures(null);
        }}
      />

      {/* --- Cyan highlight overlay for single feature --- */}
      {highlightedFeature && highlightedFeature.geometry && (
        <GeoJSON
          data={
            {
              type: "Feature",
              geometry: highlightedFeature.geometry,
              properties: {},
            } as any
          }
          style={{
            color: "cyan",
            weight: 3,
            opacity: 1,
            fillColor: "cyan",
            fillOpacity: 0.4,
          }}
          interactive={false}
          // This also makes points cyan, default was a marker on points
          pointToLayer={(_feature, latlng) =>
            L.circleMarker(latlng, {
              radius: 8,
              color: "cyan",
              fillColor: "cyan",
              fillOpacity: 0.8,
              weight: 2,
            })
          }
        />
      )}

      {/* --- Multiple features highlight overlay --- */}
      {highlightedFeatures && highlightedFeatures.length > 0 && (
        <>
          {highlightedFeatures.map(
            (feature, index) =>
              feature.geometry && (
                <GeoJSON
                  key={`highlight-${index}`}
                  data={
                    {
                      type: "Feature",
                      geometry: feature.geometry,
                      properties: {},
                    } as any
                  }
                  style={{
                    color: "cyan",
                    weight: 3,
                    opacity: 1,
                    fillColor: "cyan",
                    fillOpacity: 0.4,
                  }}
                  interactive={false}
                  pointToLayer={(_feature, latlng) =>
                    L.circleMarker(latlng, {
                      radius: 8,
                      color: "cyan",
                      fillColor: "cyan",
                      fillOpacity: 0.8,
                      weight: 2,
                    })
                  }
                />
              )
          )}
        </>
      )}
    </MapContainer>
  );
};

function MapClickClearHighlight({ onClear }: { onClear: () => void }) {
  useMapEvent("click", () => {
    onClear();
  });
  return null;
}
export default OutageMap;
