import React, { useState } from "react";
import { Popup } from "react-leaflet";
import L from "leaflet";
import "./FeaturePopup.scss";
import { topologyService, type TopologyItem } from "@/services/map/topology";

const WFS_BASE_URL = import.meta.env.VITE_GEOSERVER_WFS_BASE_URL;

type FeaturePopupProps = {
  position: L.LatLngExpression;
  properties: Record<string, any>;
  layerName: string;
  onClose: () => void;
  onHighlight?: (
    features: Array<{ geometry: any; layer: string }> | null
  ) => void;
};

const FeaturePopup: React.FC<FeaturePopupProps> = ({
  position,
  properties,
  layerName,
  onClose,
  onHighlight,
}) => {
  const [loading, setLoading] = useState<"upstream" | "downstream" | null>(
    null
  );
  const [streamResults, setStreamResults] = useState<TopologyItem[] | null>(
    null
  );
  const [streamEdges, setStreamEdges] = useState<TopologyItem[] | null>(null);
  const [streamType, setStreamType] = useState<
    "upstream" | "downstream" | null
  >(null);
  const [appendMode, setAppendMode] = useState(false);
  const [resultsHistory, setResultsHistory] = useState<
    Array<{
      items: TopologyItem[];
      edges: TopologyItem[];
      type: "upstream" | "downstream";
    }>
  >([]);

  // Function to fetch geometries for stream results (including edges)
  const fetchGeometries = async (
    items: TopologyItem[],
    edges: TopologyItem[] = []
  ): Promise<Array<{ geometry: any; layer: string }>> => {
    // Combine nodes and edges for geometry fetching
    const allItems = [...items, ...edges];

    // Group items by layer to make fewer requests
    const itemsByLayer = allItems.reduce((acc, item) => {
      const layer = item.layer || "";
      if (!acc[layer]) acc[layer] = [];
      acc[layer].push(item.gis_id);
      return acc;
    }, {} as Record<string, string[]>);

    // Fetch geometries for each layer
    const promises = Object.entries(itemsByLayer).map(
      async ([layer, gisIds]) => {
        if (!layer) return [];

        // Create a CQL filter for multiple GIS IDs
        const cqlFilter = gisIds.map((id) => `gis_id='${id}'`).join(" OR ");

        try {
          const response = await fetch(
            `${WFS_BASE_URL}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer}&outputFormat=application/json&propertyName=gis_id,geom&CQL_FILTER=${encodeURIComponent(
              cqlFilter
            )}`
          );

          if (!response.ok) return [];

          const data = await response.json();
          if (data && data.features) {
            return data.features.map((f: any) => ({
              geometry: f.geometry,
              layer: layer,
            }));
          }
        } catch (error) {
          console.error(`Error fetching geometries for layer ${layer}:`, error);
        }

        return [];
      }
    );

    const results = await Promise.all(promises);
    return results.flat();
  };

  const handleUpstream = async () => {
    const gisId = properties.gis_id;
    if (!gisId) {
      console.error("No gis_id found in properties");
      return;
    }

    setLoading("upstream");
    if (!appendMode) {
      setStreamResults(null);
      setStreamEdges(null);
      setResultsHistory([]);
    }

    const response = await topologyService.getUpstream(gisId);

    if (
      response.success &&
      (response.data.length > 0 || response.edges.length > 0)
    ) {
      if (appendMode && streamResults) {
        // Append mode: add new results to existing ones
        const combinedNodes = [...streamResults, ...response.data];
        const combinedEdges = [...(streamEdges || []), ...response.edges];
        setStreamResults(combinedNodes);
        setStreamEdges(combinedEdges);
        setResultsHistory([
          ...resultsHistory,
          { items: response.data, edges: response.edges, type: "upstream" },
        ]);

        // Fetch geometries and highlight them (including edges)
        if (onHighlight) {
          const geometries = await fetchGeometries(
            combinedNodes,
            combinedEdges
          );
          if (geometries.length > 0) {
            onHighlight(geometries);
          }
        }
      } else {
        // Replace mode: set new results
        setStreamResults(response.data);
        setStreamEdges(response.edges);
        setStreamType("upstream");
        setResultsHistory([
          { items: response.data, edges: response.edges, type: "upstream" },
        ]);

        // Fetch geometries and highlight them (including edges)
        if (onHighlight) {
          const geometries = await fetchGeometries(
            response.data,
            response.edges
          );
          if (geometries.length > 0) {
            onHighlight(geometries);
          }
        }
      }
    } else {
      console.error("Failed to fetch upstream:", response.message);
    }

    setLoading(null);
  };

  const handleDownstream = async () => {
    const gisId = properties.gis_id;
    if (!gisId) {
      return;
    }

    setLoading("downstream");
    if (!appendMode) {
      setStreamResults(null);
      setStreamEdges(null);
      setResultsHistory([]);
    }

    const response = await topologyService.getDownstream(gisId);

    if (
      response.success &&
      (response.data.length > 0 || response.edges.length > 0)
    ) {
      if (appendMode && streamResults) {
        // Append mode: add new results to existing ones
        const combinedNodes = [...streamResults, ...response.data];
        const combinedEdges = [...(streamEdges || []), ...response.edges];
        setStreamResults(combinedNodes);
        setStreamEdges(combinedEdges);
        setResultsHistory([
          ...resultsHistory,
          { items: response.data, edges: response.edges, type: "downstream" },
        ]);

        // Fetch geometries and highlight them (including edges)
        if (onHighlight) {
          const geometries = await fetchGeometries(
            combinedNodes,
            combinedEdges
          );
          if (geometries.length > 0) {
            onHighlight(geometries);
          }
        }
      } else {
        // Replace mode: set new results
        setStreamResults(response.data);
        setStreamEdges(response.edges);
        setStreamType("downstream");
        setResultsHistory([
          { items: response.data, edges: response.edges, type: "downstream" },
        ]);

        // Fetch geometries and highlight them (including edges)
        if (onHighlight) {
          const geometries = await fetchGeometries(
            response.data,
            response.edges
          );
          if (geometries.length > 0) {
            onHighlight(geometries);
          }
        }
      }
    } else {
      console.error("Failed to fetch downstream:", response.message);
    }

    setLoading(null);
  };

  return (
    <Popup position={position} eventHandlers={{ remove: onClose }}>
      <div className="feature-popup">
        <div className="popup-header">{layerName?.replace(/_/g, " ")}</div>
        <div className="popup-content">
          <table className="attributes-table">
            <tbody>
              {properties &&
                Object.entries(properties).map(([key, value]) => (
                  <tr key={key}>
                    <td className="attribute-key">{key.replace(/_/g, " ")}</td>
                    <td className="attribute-value">{String(value)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="popup-actions">
            <button
              className="upstream-btn"
              onClick={handleUpstream}
              disabled={loading === "upstream"}
            >
              {loading === "upstream" ? (
                <span className="spinner"></span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              )}
              Upstream
            </button>
            <button
              className="downstream-btn"
              onClick={handleDownstream}
              disabled={loading === "downstream"}
            >
              {loading === "downstream" ? (
                <span className="spinner"></span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
              Downstream
            </button>
            <button
              className={`toggle-btn ${appendMode ? "active" : ""}`}
              onClick={() => setAppendMode(!appendMode)}
              title={appendMode ? "Append mode: ON" : "Append mode: OFF"}
            >
              +
            </button>
            <button
              className="remove-btn"
              onClick={() => {
                if (resultsHistory.length > 1) {
                  // Remove the last result
                  const newHistory = resultsHistory.slice(0, -1);
                  setResultsHistory(newHistory);

                  // Recalculate all items and edges from history
                  const allItems = newHistory.flatMap((h) => h.items);
                  const allEdges = newHistory.flatMap((h) => h.edges);
                  setStreamResults(allItems);
                  setStreamEdges(allEdges);

                  // Update highlights
                  if (
                    onHighlight &&
                    (allItems.length > 0 || allEdges.length > 0)
                  ) {
                    fetchGeometries(allItems, allEdges).then((geometries) => {
                      if (geometries.length > 0) {
                        onHighlight(geometries);
                      }
                    });
                  } else if (onHighlight) {
                    onHighlight(null);
                  }
                } else {
                  // Clear all if only one result
                  setStreamResults(null);
                  setStreamEdges(null);
                  setResultsHistory([]);
                  if (onHighlight) {
                    onHighlight(null);
                  }
                }
              }}
              disabled={!streamResults || streamResults.length === 0}
              title="Remove last result"
            >
              -
            </button>
            <button
              className="clear-btn"
              onClick={() => {
                setStreamResults(null);
                setStreamEdges(null);
                setResultsHistory([]);
                setStreamType(null);
                if (onHighlight) {
                  onHighlight(null);
                }
              }}
              disabled={!streamResults || streamResults.length === 0}
              title="Clear all results"
            >
              x
            </button>
          </div>

          {streamResults && streamResults.length > 0 && (
            <div className="stream-results">
              <h3 className="stream-title">
                {streamType === "upstream" ? "Upstream" : "Downstream"} Results
                ({streamResults.length})
              </h3>
              <div className="stream-grid">
                <table className="stream-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>GIS ID</th>
                      <th>Layer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {streamResults.map((item, index) => (
                      <tr key={`${item.gis_id}-${index}`}>
                        <td>{index + 1}</td>
                        <td className="gis-id">{item.gis_id}</td>
                        <td className="layer-name">
                          {item.layer
                            .replace("soms_dicle_gis_ws:", "")
                            .replace(/_/g, " ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default FeaturePopup;
