import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";
import { Button } from "@/components/ui/button/button";

export const ReportsTableHeader = ({
  tableData,
  handlebackClick,
}: {
  tableData: any;
  handlebackClick: (value: any) => void;
}) => {
  return (
    <div className="reports-table__header">
      <div className="title">
        <Button
          leftIcon={<ArrowLeftSvg />}
          variant="secondary"
          onClick={() => handlebackClick("")}
        ></Button>
        <span>{tableData?.title}</span>
      </div>
      <div className="box">
        <Button variant="primary" leftIcon={<AddPlusSvg />}>
          Yeni Rapor Oluştur
        </Button>
      </div>
    </div>
  );
};
