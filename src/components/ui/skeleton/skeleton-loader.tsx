import "./skeleton-loader.scss";
export default function SkeletonLoader({
  label = "",
}: Readonly<{
  label?: string;
}>) {
  return (
    <output className={"skeleton"}>
      <div aria-label="skeleton-loader-box" className={"skeleton__box"}>
        {label && <h2 className="skeleton__box-label">{label}</h2>}
      </div>
    </output>
  );
}
