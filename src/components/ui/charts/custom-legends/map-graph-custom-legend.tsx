import { MapGraphCustomLegendItemsProps } from "@/types/components/pages/dashboard";

const MapGraphCustomLegend = ({
  items,
}: {
  items: MapGraphCustomLegendItemsProps[];
}) => {
  return (
    <div className="map-graph-footer">
      <ul className="map-graph-footer__custom-legend">
        {items.map(({ label, color }, index) => (
          <li key={index}>
            <span
              className="legend-point"
              style={{ backgroundColor: color }}
            ></span>
            <p>{label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapGraphCustomLegend;
