import { kesintiColumns, kesintiData } from "./test-data";
import React from "react";
import { XlsxDrawer } from "@/components/ui/xlsx-table/xlsx-drawer";
import { TestTable } from "./test-table";
import MainLayout from "@/components/layouts/page-layout/main-layout";
import NotificationCards from "@/components/pages/notification/notification-cards";

const TestPage = () => {
  const [xlsxOpen, setXlsxOpen] = React.useState(false);

  const openXlsxFromRows = () => {
    setXlsxOpen(true);
  };

  return (
    <MainLayout
      title="Test Sayfası"
      hasNotification={true}
      hasRefresh={true}
      className="layout__page__notification"
      pageKey={"dashboard"}
    >
      <NotificationCards />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflow: "auto",
          height: "100%",
          width: "100%",
          gridColumn: "span 12",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
          <button onClick={openXlsxFromRows} style={{ padding: "6px 10px" }}>
            XLSX Drawer Test (title + header)
          </button>
        </div>
        <div>
          <TestTable
            data={kesintiData}
            columns={kesintiColumns as any}
            title={"TABLO-3 DAĞITILMAYAN ENERJİ"}
          />
        </div>

        <XlsxDrawer
          isOpen={xlsxOpen}
          onClose={() => setXlsxOpen(false)}
          title="XLSX Önizleme"
          // Use multi-row header rendering
        />
      </div>
    </MainLayout>
  );
};

export default TestPage;
