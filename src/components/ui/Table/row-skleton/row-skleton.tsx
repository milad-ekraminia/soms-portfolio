import SkeletonLineLoader from "@/components/ui/skeleton/skleton-line";
import "./row-skleton.scss";
type Props = {
  visibleColumns: { id: string; getSize: () => number }[];
  rowsCount?: number;
};

export const TableBodySkeleton = ({
  visibleColumns,
  rowsCount = 10,
}: Props) => {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, r) => (
        <tr className="table-row table-row--skeleton" key={`sk-row-${r}`}>
          {visibleColumns.map((col) => {
            const width = col.getSize() + 40; // match your TableRow

            return (
              <td
                key={`sk-${r}-${col.id}`}
                className="table-row__container"
                style={{
                  width,
                  minWidth: width,
                  maxWidth: width,
                }}
              >
                <div className="table-row__container-cell">
                  <div className="cell-content">
                    <SkeletonLineLoader />
                  </div>
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
