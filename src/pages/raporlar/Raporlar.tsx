import MainLayout from "@/components/layouts/page-layout/main-layout";
import { ReportsCards } from "@/components/pages/reports/reports-cards";
import { useState } from "react";
import { ReportsTable } from "@/components/pages/reports/reports-table";

const Raporlar = () => {
  const [tableData, setTableData] = useState();
  return (
    <MainLayout hasNotification={false} title="Raporlar">
      <div className="reports-wrapper">
        {tableData ? (
          <ReportsTable tableData={tableData} handlebackClick={setTableData} />
        ) : (
          <ReportsCards setTableData={setTableData} />
        )}
      </div>
    </MainLayout>
  );
};
export default Raporlar;
