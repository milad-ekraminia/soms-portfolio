import React, { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./SearchBox.scss";

const WFS_BASE_URL = import.meta.env.VITE_GEOSERVER_URL + "/wfs";
const LAYER_NAMES = [
  "soms_dicle_gis_ws:city",
  "soms_dicle_gis_ws:station",
  "soms_dicle_gis_ws:switchgear",
  "soms_dicle_gis_ws:transformer",
  "soms_dicle_gis_ws:separator",
  "soms_dicle_gis_ws:circuitbreaker",
  "soms_dicle_gis_ws:hv_lines",
  "soms_dicle_gis_ws:lv_lines",
  "soms_dicle_gis_ws:pole",
  "soms_dicle_gis_ws:distribution_box",
  "soms_dicle_gis_ws:rekortman",
  "soms_dicle_gis_ws:lv_breaker",
];
const SEARCH_LIMIT = 20;

// Add prop for setting highlighted geometry
type SearchBoxProps = {
  onHighlight?: (feature: { geometry: any; layer: string } | null) => void;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ onHighlight }) => {
  const map = useMap();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    const upperValue = value.toUpperCase();
    if (upperValue.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);

    // Compose a WFS GetFeature request that searches all layers for gis_id
    const promises = LAYER_NAMES.map((layerName) =>
      fetch(
        `${WFS_BASE_URL}?service=WFS&version=1.1.0&request=GetFeature&typename=${layerName}&outputFormat=application/json&propertyName=gis_id,geom&maxFeatures=${SEARCH_LIMIT}&CQL_FILTER=gis_id LIKE '${upperValue}%25'`
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) =>
          data && Array.isArray(data.features)
            ? data.features.map((f: any) => ({
                layer: layerName,
                gis_id: f.properties?.gis_id,
                feature: f,
              }))
            : []
        )
    );

    Promise.all(promises)
      .then((layersResults) => {
        // Flatten results
        let allResults = layersResults.flat();

        allResults.sort((a, b) => {
          return a.gis_id.localeCompare(b.gis_id);
        });

        // Limit the amount of items
        allResults = allResults.slice(0, SEARCH_LIMIT);

        setResults(allResults);
      })
      .finally(() => setLoading(false));
  };

  // Debounce input
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onHighlight) onHighlight(null);
    const value = e.target.value;
    setQ(value);
    if (timer.current) clearTimeout(timer.current);
    if (value.length >= 3) {
      timer.current = setTimeout(() => handleSearch(value), 300);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (result: any) => {
    setOpen(false);
    setQ(result.gis_id);

    const geom = result.feature.geometry;
    if (!geom || !geom.type || !geom.coordinates) {
      alert("No geometry found for the selected feature.");
      return;
    }

    if (geom.type === "Point") {
      const [lng, lat] = geom.coordinates;
      map.setView([lat, lng], 21, { animate: true });
    } else if (geom.type === "LineString") {
      // Fit to bounds of all points in the line
      const latlngs = geom.coordinates.map(([lng, lat]: [number, number]) => [
        lat,
        lng,
      ]);
      map.fitBounds(latlngs, {});
    } else if (geom.type === "Polygon") {
      // Fit to bounds of the outer ring (first ring is outer in GeoJSON)
      const ring = geom.coordinates[0].map(([lng, lat]: [number, number]) => [
        lat,
        lng,
      ]);
      map.fitBounds(ring, {});
    } else if (geom.type === "MultiPolygon") {
      // Flatten all outer rings and fit bounds
      const rings = geom.coordinates.map((poly: any) =>
        poly[0].map(([lng, lat]: [number, number]) => [lat, lng])
      );
      // Merge all latlngs from all polygons
      const allLatlngs = ([] as any[]).concat(...rings);
      map.fitBounds(allLatlngs, {});
    } else if (geom.type === "MultiLineString") {
      // Combine all lines' points
      const latlngs = ([] as any[]).concat(
        ...geom.coordinates.map((line: any) =>
          line.map(([lng, lat]: [number, number]) => [lat, lng])
        )
      );
      map.fitBounds(latlngs, {});
    } else if (geom.type === "MultiPoint") {
      // Fit to all points
      const latlngs = geom.coordinates.map(([lng, lat]: [number, number]) => [
        lat,
        lng,
      ]);
      map.fitBounds(latlngs, { maxZoom: 21 }); // adjust maxZoom if you need
    } else {
      alert("Unsupported geometry type.");
      return;
    }

    // map.setView([lat, lng], 18, { animate: true });

    // Optionally: Add a marker or popup here

    // If result contains geometry, pass to parent
    if (geom && onHighlight) {
      onHighlight({ geometry: geom, layer: result.layer });
    }
    setOpen(false);
  };

  useEffect(() => {
    const div = L.DomUtil.get("searchbox-root");
    if (div) {
      L.DomEvent.on(div, "mousewheel", L.DomEvent.stopPropagation);
      L.DomEvent.on(div, "wheel", L.DomEvent.stopPropagation);
      L.DomEvent.on(div, "mousedown", L.DomEvent.stopPropagation);
      //L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
      L.DomEvent.on(div, "dblclick", L.DomEvent.stopPropagation);
    }
  }, [open]);

  return (
    <div id="searchbox-root" className="searchbox-root">
      <button
        className="search-icon-btn"
        title="Search"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ display: "block" }}
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="#4186ec"
            strokeWidth="2.5"
            fill="none"
          />
          <line
            x1="16.5"
            y1="16.5"
            x2="22"
            y2="22"
            stroke="#4186ec"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div className="searchbox-autocomplete">
          <input
            type="text"
            placeholder="Search by GIS ID..."
            value={q}
            onChange={onInput}
            autoFocus
          />
          {loading && <div className="searchbox-results">Loading...</div>}
          {!loading && results.length > 0 && (
            <ul className="searchbox-results">
              {results.map((r, idx) => (
                <li
                  key={r.layer + r.gis_id + idx}
                  onClick={() => handleSelect(r)}
                >
                  <span>{r.gis_id}</span>
                  <span className="search-result-layer">
                    [{r.layer.split(":")[1]}]
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!loading && q.length >= 3 && results.length === 0 && (
            <div className="searchbox-results" style={{ color: "#888" }}>
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
