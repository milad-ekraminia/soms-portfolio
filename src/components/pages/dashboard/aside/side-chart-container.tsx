interface SideChartContainerProps {
  children: React.ReactNode;
  options?: React.ReactNode;
  title: string;
  showBreadCrumb?: boolean;
  breadcrumbs?: string[];
  handleBreadcrumbClick?: (index: number) => void;
}
const SideChartContainer = ({
  children,
  title,
  options,
  showBreadCrumb = false,
  breadcrumbs = [],
  handleBreadcrumbClick = () => {},
}: SideChartContainerProps) => {
  return (
    <div className="dashboard-aside__chart-box">
      <div className="header">
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="options">{options}</div>
      </div>
      {showBreadCrumb ? (
        <div className="breadcrumb">
          <span
            className="breadcrumb-item"
            onClick={() => handleBreadcrumbClick(-1)}
          >
            İller
          </span>
          {breadcrumbs.map((crumb, index) => (
            <span
              key={crumb}
              className="breadcrumb-item active"
              onClick={() => handleBreadcrumbClick(index)}
            >
              &gt; {crumb}
            </span>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default SideChartContainer;
