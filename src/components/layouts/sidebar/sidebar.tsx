import "./sidebar.scss";
import logo from "@/assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { SibdeBarDropdown } from "./sidebar-dropdown/sidebar-dropdown";
import { ExpandSvg } from "@/assets/icons/finder-browser-svg";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/helpers/data/nav-items";
import { getClassNames } from "@/helpers/get-class-names";
import { PortalDropdownWrapper } from "@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper";
import ItemAccordion from "./sidebar-dropdown/item-accordion";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebarExpanded");
    return stored ? JSON.parse(stored) : false;
  });

  const { pathname } = useLocation();
  const [showSubItem, setShowSubItem] = useState();
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  return (
    <>
      <nav className={getClassNames("sidebar", [[isExpanded, "expanded"]])}>
        <div className="sidebar__navigation">
          <div className="sidebar__logo">
            <img className="pic" src={logo} alt="logo" />
          </div>
          <ul
            className={getClassNames("sidebar__menu", [
              [isExpanded, "expanded"],
            ])}
          >
            {NAV_ITEMS.map(
              ({
                Icon,
                id,
                route,
                title,
                children,
                external,
                disabled,
              }: any) => {
                let isActive = false;

                if (pathname === route) {
                  isActive = true;
                } else if (children?.length > 0) {
                  isActive = children.some(
                    (item: any) => item?.route === pathname,
                  );
                }

                const hasChildren = children?.length > 0;

                return (
                  <li
                    className={getClassNames("sidebar__menu__item", [
                      [isActive && !hasChildren, "active"],
                      [isActive && !isExpanded, "active"],
                      [isExpanded, "expanded"],
                      [disabled, "disabled"],
                    ])}
                    key={id}
                  >
                    {!!route && !children ? (
                      external ? (
                        <a
                          href={disabled ? "#" : route}
                          target={disabled ? "" : "_blank"}
                          rel="noopener noreferrer"
                          className={isExpanded ? "nav-link" : "icon-nav-link"}
                          onClick={(e) => disabled && e.preventDefault()}
                        >
                          <span>
                            <Icon
                              {...(isActive
                                ? { stroke: "var(--fg-brand-primary-600)" }
                                : {
                                    stroke: "var(--fg-quinary-400)",
                                  })}
                            />
                          </span>
                          {isExpanded && (
                            <h2
                              className={getClassNames("title", [
                                [isActive, "active"],
                              ])}
                            >
                              {title}
                            </h2>
                          )}
                          {!isExpanded && (
                            <h2
                              className={getClassNames("side-bar__tooltip", [
                                [!isExpanded, "active"],
                              ])}
                            >
                              {title}
                            </h2>
                          )}
                        </a>
                      ) : (
                        <Link
                          className={isExpanded ? "nav-link" : "icon-nav-link"}
                          to={disabled ? "#" : route}
                          onClick={(e) => disabled && e.preventDefault()}
                        >
                          <span>
                            <Icon
                              {...(isActive
                                ? { stroke: "var(--brand-600)" }
                                : {})}
                            />
                          </span>
                          {isExpanded && (
                            <h2
                              className={getClassNames("title", [
                                [isActive, "active"],
                              ])}
                            >
                              {title}
                            </h2>
                          )}
                          {!isExpanded && (
                            <h2
                              className={getClassNames("side-bar__tooltip", [
                                [!isExpanded, "active"],
                              ])}
                            >
                              {title}
                            </h2>
                          )}
                        </Link>
                      )
                    ) : (
                      <div
                        className={
                          isExpanded ? "nav-parent" : "nav-wrapper-icon"
                        }
                      >
                        <span
                          className="icon-parent"
                          onClick={() => !disabled && setShowSubItem(id)}
                        >
                          {isExpanded ? (
                            <ItemAccordion
                              item={{ title, route, children, id }}
                              icon={
                                <Icon
                                  {...(isActive
                                    ? { stroke: "var(--brand-600)" }
                                    : {})}
                                />
                              }
                              pathname={pathname}
                              isSelected={showSubItem === id}
                              isActive={isActive}
                              // disabled={!!disabled}
                            />
                          ) : (
                            <PortalDropdownWrapper
                              toggleBtn={
                                <Icon
                                  {...(isActive
                                    ? { stroke: "var(--fg-brand-primary-600)" }
                                    : {})}
                                />
                              }
                              closeButton={false}
                              direction="right"
                              yOffset={-50}
                              leftOffset={50}
                              className={"sideBarDropDownStyles"}
                            >
                              <ul className="pages-sidebar__list">
                                {children?.length > 0 &&
                                  children.map(
                                    ({
                                      Icon,
                                      id,
                                      route,
                                      title,
                                      external,
                                      disabled,
                                    }: any) =>
                                      external ? (
                                        <a
                                          key={id}
                                          href={disabled ? "#" : route}
                                          target={disabled ? "" : "_blank"}
                                          rel="noopener noreferrer"
                                          className={getClassNames(
                                            "pages-sidebar__list-item",
                                            [[disabled, "disabled"]],
                                          )}
                                          onClick={(e) =>
                                            disabled && e.preventDefault()
                                          }
                                        >
                                          <Icon
                                            {...(route === pathname
                                              ? {
                                                  stroke:
                                                    "var(--fg-brand-primary-600)",
                                                }
                                              : {})}
                                          />
                                          <h2 className="title-active">
                                            {title}
                                          </h2>
                                        </a>
                                      ) : (
                                        <Link
                                          key={id}
                                          to={disabled ? "#" : route}
                                          className={getClassNames(
                                            "pages-sidebar__list-item",
                                            [
                                              [route === pathname, "isActive"],
                                              [disabled, "disabled"],
                                            ],
                                          )}
                                          onClick={(e) =>
                                            disabled && e.preventDefault()
                                          }
                                        >
                                          <Icon
                                            {...(route === pathname
                                              ? {
                                                  stroke:
                                                    "var(--fg-brand-primary-600)",
                                                }
                                              : {})}
                                          />
                                          <h2 className="title-active">
                                            {title}
                                          </h2>
                                        </Link>
                                      ),
                                  )}
                              </ul>
                            </PortalDropdownWrapper>
                          )}
                          <h2
                            className={getClassNames("side-bar__tooltip", [
                              [!isExpanded, "active"],
                            ])}
                          >
                            {title}
                          </h2>
                        </span>
                      </div>
                    )}
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div
          className={getClassNames("profile-info", [
            [isExpanded === true, "expanded"],
          ])}
        >
          <button className="profile-info__expand" onClick={toggleSidebar}>
            <ExpandSvg />
          </button>

          <SibdeBarDropdown isExpanded={isExpanded} />
        </div>
      </nav>
      {isExpanded && (
        <button
          onClick={toggleSidebar}
          className="sidebar-outside-click"
        ></button>
      )}
    </>
  );
};

export default Sidebar;
