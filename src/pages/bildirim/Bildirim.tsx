import MainLayout from "@/components/layouts/page-layout/main-layout";
import NotificationCards from "@/components/pages/notification/notification-cards";
import NotificationTable from "@/components/pages/notification/notification-table";


const Bildirim = () => {

  return (
    <MainLayout
      title="Bildirimler"
      hasNotification={true}
      hasRefresh={true}
      className="layout__page__notification"
      pageKey={"NotificationGrid"}
    >
      <NotificationCards />
      <NotificationTable />
    </MainLayout>
  );
};

export default Bildirim;
