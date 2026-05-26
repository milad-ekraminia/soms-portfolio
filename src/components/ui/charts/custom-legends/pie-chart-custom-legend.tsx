interface PieChartCustomLegendProps {
  series?: number[];
  labels?: string[];
  hasPercent?: boolean;
}
const PieChartCustomLegend = ({
  series,
  labels,
  hasPercent = false,
}: PieChartCustomLegendProps) => {
  return (
    <ul className="pie-chart-legend-container">
      {series?.map((serie, index) => {
        return (
          <li key={serie}>
            <span
              className="legend-point"
              style={{
                backgroundColor: index == 0 ? "#2E90FA" : "#B2DDFF",
              }}
            ></span>
            {labels && <span className="legend-label">{labels[index]}</span>}
            <p>
              {serie}
              {hasPercent && "%"}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default PieChartCustomLegend;
