import { LightSvg } from "@/assets/icons/light-svg";
import { NightSvg } from "@/assets/icons/night-svg";
import { SingleUserSvg } from "@/assets/icons/single-user-svg";
import Tabs from "@/components/ui/tabs/tabs";
import { useEffect } from "react";
import { SignOutSvg } from "@/assets/icons/sign-out-svg";
import UserAvatar from "@/components/ui/user-avatar/user-avatar";
import { PortalDropdownWrapper } from "@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper";
import "../sidebar.scss";

import { Button } from "@/components/ui/button/button";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/helpers/get-initialls";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, ThemeMode } from "@/store/app/theme-slice";

interface SibdeBarDropdownProps {
  isExpanded: boolean;
}
export const SibdeBarDropdown = ({ isExpanded }: SibdeBarDropdownProps) => {
  const dispatch = useDispatch();

  const theme = useSelector((state: any) => state.theme.mode);
  const navigate = useNavigate();
  const tabs = [
    { id: 0, icon: <LightSvg />, title: "Light", active: true, value: "light" },
    { id: 1, icon: <NightSvg />, title: "night", active: false, value: "dark" },
  ];
  const linkItems = [
    {
      id: 0,
      icon: <SingleUserSvg />,
      title: "Profili görüntüle",
    },
  ];
  const firstName = "Test";
  const lastName = "User";
  const initials = getInitials(`${firstName} ${lastName}`);

  const logout = () => {
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);
  const dropdownContent = (
    <div className="profile-info__dropdown">
      <div className="profile-info__dropdown-upperside">
        <Button variant="secondary" disabled leftIcon={linkItems[0]?.icon}>
          {linkItems[0]?.title}
        </Button>
        <Tabs
          tabs={tabs.map((tab) => ({
            ...tab,
            active: tab.value === theme,
          }))}
          activeTab={theme}
          onTabClick={(value: any) => {
            dispatch(setTheme(value as ThemeMode));
          }}
        />
      </div>
      <div className="profile-info__dropdown-lowerside">
        <div className="profile-info__dropdown-lowerside-workspace">
          <button className={`workspace-item`}>
            <div className="workspace-item-data">
              <div className="workspace-item-content">
                <div className="workspace-item-content__avatar">{initials}</div>
                <div className="workspace-item-details">
                  <span className="workspace-name">SOMS</span>
                  <span className="workspace-email">user@test.com</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="profile-info__dropdown-bottom">
        <div onClick={logout}>
          <SignOutSvg />
          <span>Çıkış yap</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="expand-button">
      <PortalDropdownWrapper
        toggleBtn={<UserAvatar initials={initials} isExpanded={isExpanded} />}
        closeButton={false}
        direction={"up"}
        leftOffset={65}
        yOffset={-200}
        closeOnClick
      >
        {dropdownContent}
      </PortalDropdownWrapper>
    </div>
  );
};
