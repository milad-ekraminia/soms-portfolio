interface CustomLegendProps {
  series: number[];
  title: string;
}
const DonutCustomLegend = ({ series, title }: CustomLegendProps) => {
  const colors = [
    "var(--utility-brand-700)",
    "var(--utility-warning-300)",
    "var(--utility-brand-500)",
  ]; // const colors = ["#175CD3", "#FEC84B", "#2E90FA"];
  const labels = ["CRM", "OSOS", "SCADA"];

  return (
    <div className="donut-chart">
      <h3>{title}</h3>
      <div className="donut-chart__legends">
        {series.map((serie, index) => {
          return (
            <div key={index} className="donut-chart__legends__item">
              <div className="marker">
                <span
                  className="custom-legend-marker"
                  style={{
                    backgroundColor: colors[index],
                  }}
                ></span>
                <span className="custom-legend-label">{labels[index]}</span>
              </div>
              <p className="custom-legend-value">{serie}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutCustomLegend;
