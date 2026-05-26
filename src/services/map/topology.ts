export interface TopologyItem {
  gis_id: string;
  layer: string;
  properties?: Record<string, any>;
}

// Layer type mapping based on the SQL CASE statement
const LAYER_TYPE_MAP: Record<number, string> = {
  1: "city",
  2: "station",
  3: "switchgear",
  4: "transformer",
  5: "separator",
  6: "circuitbreaker",
  7: "hv_lines",
  8: "lv_lines",
  9: "pole",
  10: "distribution_box",
  11: "rekortman",
  12: "lv_breaker",
  101: "hv_lines", // hv_line edges
  102: "lv_lines", // lv_line edges
  103: "rekortman", // rekortman edges
};

export interface RawTopologyItem {
  si: string;
  st: number;
  ei: string;
  et: number;
}

export interface RawTopologyResponse {
  nodes: RawTopologyItem[];
  edges: RawTopologyItem[];
}

export interface TopologyResponse {
  success: boolean;
  data: TopologyItem[];
  edges: TopologyItem[];
  message?: string;
}

const TOPOLOGY_BASE_URL = import.meta.env.VITE_API_TOPOLOGY_URL;

export const topologyService = {
  async getUpstream(gisId: string): Promise<TopologyResponse> {
    try {
      const response = await fetch(`${TOPOLOGY_BASE_URL}/upstream/${gisId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RawTopologyResponse = await response.json();


      // Transform the response based on new API structure with nodes and edges
      let transformedNodes: TopologyItem[] = [];
      let transformedEdges: TopologyItem[] = [];

      // Transform nodes
      if (data.nodes && Array.isArray(data.nodes)) {
        transformedNodes = data.nodes.map((item) => {
          const layerType =
            LAYER_TYPE_MAP[item.st] || `unknown_type_${item.st}`;
          const fullLayerName = `soms_dicle_gis_ws:${layerType}`;

          return {
            gis_id: item.si || "",
            layer: fullLayerName,
            properties: item,
          };
        });
      }

      // Transform edges
      if (data.edges && Array.isArray(data.edges)) {
        transformedEdges = data.edges.map((item) => {
          const layerType =
            LAYER_TYPE_MAP[item.st] || `unknown_type_${item.st}`;
          const fullLayerName = `soms_dicle_gis_ws:${layerType}`;

          return {
            gis_id: item.si || "",
            layer: fullLayerName,
            properties: item,
          };
        });
      }

      return {
        success: true,
        data: transformedNodes,
        edges: transformedEdges,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        edges: [],
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch upstream data",
      };
    }
  },

  async getDownstream(gisId: string): Promise<TopologyResponse> {
    try {
      const response = await fetch(`${TOPOLOGY_BASE_URL}/downstream/${gisId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RawTopologyResponse = await response.json();


      // Transform the response based on new API structure with nodes and edges
      let transformedNodes: TopologyItem[] = [];
      let transformedEdges: TopologyItem[] = [];

      // Transform nodes
      if (data.nodes && Array.isArray(data.nodes)) {
        transformedNodes = data.nodes.map((item) => {
          const layerType =
            LAYER_TYPE_MAP[item.st] || `unknown_type_${item.st}`;
          const fullLayerName = `soms_dicle_gis_ws:${layerType}`;

          return {
            gis_id: item.si || "",
            layer: fullLayerName,
            properties: item,
          };
        });
      }

      // Transform edges
      if (data.edges && Array.isArray(data.edges)) {
        transformedEdges = data.edges.map((item) => {
          const layerType =
            LAYER_TYPE_MAP[item.st] || `unknown_type_${item.st}`;
          const fullLayerName = `soms_dicle_gis_ws:${layerType}`;

          return {
            gis_id: item.si || "",
            layer: fullLayerName,
            properties: item,
          };
        });
      }

      return {
        success: true,
        data: transformedNodes,
        edges: transformedEdges,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        edges: [],
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch downstream data",
      };
    }
  },
};
