import PagesHeader from "@/components/layouts/page-layout/pages-header/pages-header";
import Footer from "@/components/layouts/footer/footer";
import Sidebar from "@/components/layouts/sidebar/sidebar";
import "./main-layout.scss";
import Drawer from "@/components/ui/drawer/drawer";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "@/store/app/drawer-slice";
import Details from "@/components/pages/notification/table-header/operations/details/details";
import { ToastProvider } from "@/providers/toast-provider";
import { DetailDrawerWrapper } from "@/components/pages/outages/unplanned/table-header/operations/details/details-drawer-wrapper";
import { getClassNames } from "@/helpers/get-class-names";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  hasNotification?: boolean;
  hasRefresh?: boolean;
  className?: string;
  pageKey?: string;
}

const MainLayout = ({
  children,
  title,
  hasNotification,
  hasRefresh = false,
  className,
  pageKey = "",
}: MainLayoutProps) => {
  const dispatch = useDispatch();
  const {
    isOpen,
    title: drawerTitle,
    type,
    id,
  } = useSelector((state: any) => state?.drawer);
  const fullscreen = useSelector((state: any) => state?.ogssLayout?.fullscreen);
  return (
    <ToastProvider>
      <div className="layout">
        {!fullscreen ? <Sidebar /> : null}
        <div
          className={getClassNames("layout__content", [
            [fullscreen, "expanded"],
          ])}
        >
          <main className={`layout__main ${className}`}>
            {!fullscreen ? (
              <PagesHeader
                title={title}
                hasNotification={hasNotification}
                hasRefresh={hasRefresh}
                pageKey={pageKey}
              />
            ) : (
              <div></div>
            )}
            {children}
          </main>
          {!fullscreen ? <Footer /> : null}
        </div>
      </div>
      <Drawer
        isOpen={type == "notification" && !!isOpen}
        onClose={() => dispatch(closeDrawer())}
        title={drawerTitle}
        size={"lg"}
        hasFooter={false}
      >
        <div className="outage-details-drawer">
          <Details notificationId={id} />
        </div>
      </Drawer>
      <DetailDrawerWrapper
        selectedRows={[id as number]}
        isDrawerOpen={type == "outage" && !!isOpen}
        closeDrawer={() => {
          dispatch(closeDrawer());
        }}
      />
    </ToastProvider>
  );
};

export default MainLayout;
