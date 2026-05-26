import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { Button } from "@/components/ui/button/button";
import { NoTableDataSvg } from "@/assets/icons/no-table-data-svg";

export const NoSmsData = ({ setShowAddNewMsg }: { setShowAddNewMsg: any }) => {
  return (
    <div className="no-sms-data">
      <NoTableDataSvg />
      <span className="">Hiçbir şablon kaydedilmemiştir</span>
      <Button
        variant="primary"
        leftIcon={<AddPlusSvg />}
        onClick={() => setShowAddNewMsg(true)}
      >
        Yeni Şablon
      </Button>
    </div>
  );
};
