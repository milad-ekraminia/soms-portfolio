import { ChevronRighDoubletSvg } from "@/assets/icons/chevron-right-double-svg";
import { ChevronRightSvg } from "@/assets/icons/chevron-right-svg";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { getClassNames } from "@/helpers/get-class-names";
import { memo } from "react";
import "./pagination.scss";
import { Button } from "../../button/button";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";
import { ArrowRightSvg } from "@/assets/icons/arrow-right-svg";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasCount?: boolean;
  isFullWidth?: boolean;
  setPageSize?: (pageSize: number) => void;
  pageSize?: number;
  totalCount?: number;
};

const MemoPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasCount = false,
  isFullWidth = true,
  setPageSize,
  pageSize = 20,
  totalCount = 0,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      if (start > 2) {
        pageNumbers.push("...");
      }
      const maxRange = end < totalPages - 1 ? end + 1 : end;
      for (let i = start; i <= maxRange; i++) {
        pageNumbers.push(i);
      }

      if (end + 1 < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number | string) => {
    onPageChange(Number(page));
  };

  const getRecordInfo = () => {
    const pageNumber = currentPage + 1;
    const start = (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize, totalCount);
    if (!totalCount || totalCount === 0 || totalPages === 0) return null;

    if (start > totalCount || start < 1 || end < 1) return null;

    return `${start} – ${end} arası`;
  };

  const selectOptions = [
    {
      displayName: "10",
      value: 10,
      id: 1,
    },
    {
      displayName: "20",
      value: 20,
      id: 2,
    },
    {
      displayName: "50",
      value: 50,
      id: 3,
    },
    {
      displayName: "100",
      value: 100,
      id: 4,
    },
  ];

  return (
    <div
      className={getClassNames("pagination-container", [
        [isFullWidth === false, "minified-pagination"],
      ])}
    >
      <div className="pagination-wrapper">
        {isFullWidth && totalCount > 0 && (
          <div className="pagination-wrapper-record">
            <p>{totalCount} kayıt</p>
          </div>
        )}

        {!isFullWidth && (
          <Button
            variant="secondary"
            disabled={currentPage == 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ArrowLeftSvg />
          </Button>
        )}
        {isFullWidth && (
          <div className="page-numbers">
            <Button
              variant="secondary"
              disabled={totalPages === 1 || currentPage == 0}
              onClick={() => handlePageChange(0)}
              leftIcon={
                <span
                  className="arrow-btns"
                  style={{ rotate: "180deg", background: "unset" }}
                  onClick={() => handlePageChange(0)}
                >
                  <ChevronRighDoubletSvg width="20" height="20" />
                </span>
              }
            />
            <Button
              variant="secondary"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              leftIcon={
                <span
                  className="arrow-btns"
                  style={{ rotate: "180deg", background: "unset" }}
                >
                  <ChevronRightSvg stroke="#475467" />
                </span>
              }
            />

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                disabled={typeof page === "string"}
                className={`page-number ${
                  typeof page === "number" && page - 1 === currentPage
                    ? "active"
                    : "hover"
                }`}
                onClick={() =>
                  handlePageChange(typeof page === "number" ? page - 1 : page)
                }
              >
                {page}
              </button>
            ))}
            <Button
              variant="secondary"
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
              leftIcon={
                <span className="arrow-btns" style={{ background: "unset" }}>
                  <ChevronRightSvg stroke="#475467" />{" "}
                </span>
              }
            />
            <Button
              variant="secondary"
              disabled={totalPages === 1 || currentPage === totalPages - 1}
              onClick={() => handlePageChange(totalPages - 1)}
              leftIcon={
                <span className="arrow-btns" style={{ background: "unset" }}>
                  <ChevronRighDoubletSvg />{" "}
                </span>
              }
            />
          </div>
        )}
        {!isFullWidth && (
          <div className="page-numbers">
            <span>
              sayfa {currentPage} - {totalPages}
            </span>
          </div>
        )}
        {!isFullWidth && (
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ArrowRightSvg />
          </Button>
        )}
      </div>
      <div className="pagination-wrapper-total-count">
        <div>
          {getRecordInfo() && (
            <div className="pagination-wrapper-total-count-info">
              <span>{getRecordInfo()}</span>
            </div>
          )}
        </div>
        {hasCount && (
          <div className="row-select-box">
            <SelectInput
              options={selectOptions}
              setValue={(value: number) => {
                setPageSize?.(value);
              }}
              selected={pageSize}
              openDirection="up"
              placeholder="10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Pagination = memo(MemoPagination);

export default Pagination;
