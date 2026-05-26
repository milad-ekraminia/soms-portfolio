import MainLayout from "@/components/layouts/page-layout/main-layout";
import { SmsSection } from "@/components/pages/settings/messages/sms-wrapper";
import GeneralModalSms from "@/components/pages/settings/modals/general-sms-modal";
import KvkkDrawer from "@/components/pages/settings/modals/kvkk-drawer";
import { SettingsCards } from "@/components/pages/settings/settings-cards";

import Drawer from "@/components/ui/drawer/drawer";
import { useState } from "react";

const Ayarlar = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const handleSectionClick = (section: string) => {
    if (section == "general") {
      setShowModal(true);
    } else if (section == "kvkk") {
      setShowDrawer(true);
    } else {
      setActiveSection(section);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const closeDrawer = () => {
    setShowDrawer(false);
  };
  const handleConfirm = () => {
    setShowModal(false);
  };
  return (
    <MainLayout title="Ayarlar" hasNotification={false}>
      <div className="settings-container">
        {!activeSection && (
          <SettingsCards
            handleSectionClick={(section: string) =>
              handleSectionClick(section)
            }
          />
        )}
        {activeSection == "unPlanned" && (
          <SmsSection type={"unPlanned"} handlebackClick={handleSectionClick} />
        )}
        {activeSection == "planned" && (
          <SmsSection type={"planned"} handlebackClick={handleSectionClick} />
        )}
 
      </div>
      <Drawer
        isOpen={showModal}
        onClose={handleCloseModal}
        title={"Genel SMS Ayarlan"}
        onSubmit={handleCloseModal}
        submitBtnText="Kaydet"
        closeBtnText="Vazgeç"
      >
        <GeneralModalSms />
      </Drawer>
      <Drawer
        isOpen={showDrawer}
        onClose={closeDrawer}
        onSubmit={handleConfirm}
        title={"KVKK Ayarları"}
        submitBtnText="Kaydet"
        closeBtnText="Vazgeç"
        size="md"
      >
        <KvkkDrawer />
      </Drawer>
    </MainLayout>
  );
};
export default Ayarlar;
