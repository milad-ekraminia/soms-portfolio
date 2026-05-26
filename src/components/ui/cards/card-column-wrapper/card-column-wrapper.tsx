import Pagination from "@/components/ui/Table/pagination/Pagination";
import "./card-column-wrapper.scss";
interface CardColumnPrps {
  children: React.ReactNode;
  title?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const CardColumnWrapper = ({
  children,
  title,
  currentPage,
  totalPages,
  onPageChange,
}: CardColumnPrps) => {
  return (
    <div className="card-column">
      <div className="card-column__body">
        {title && (
          <div className="title">
            <span>{title}</span>
          </div>
        )}
        <div className="list">{children}</div>
      </div>
      <div className="card-column__footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          hasCount={true}
          isFullWidth={false}
        />
      </div>
    </div>
  );
};
