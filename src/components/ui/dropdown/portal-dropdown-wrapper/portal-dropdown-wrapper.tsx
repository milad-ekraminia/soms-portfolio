import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "./portal-dropdown-wrapper.scss";
import { CloseSvg } from "@/assets/icons/close-svg";

interface PortalDropdownProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  closeButton?: boolean;
  bottomButtons?: React.ReactNode;
  toggleBtn?: React.ReactNode;
  leftOffset?: number;
  yOffset?: number;
  direction?: "left" | "right" | "up" | "down";
  closeOnClick?: boolean;
  className?:any;
}

export const PortalDropdownWrapper: React.FC<PortalDropdownProps> = ({
  title,
  children,
  closeButton = true,
  bottomButtons,
  toggleBtn,
  leftOffset = 0,
  yOffset = 0,
  direction = "down",
  closeOnClick = false,
  className=''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => {
    setIsOpen(false);
    setPosition(null); 
  };

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      let newLeft = buttonRect.left + leftOffset;
      let newTop =
        direction === "up"
          ? buttonRect.top + yOffset
          : buttonRect.bottom + yOffset;

      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();

        if (newLeft + dropdownRect.width > window.innerWidth) {
          newLeft = window.innerWidth - dropdownRect.width - 10;
        } else if (newLeft < 0) {
          newLeft = 10;
        }

        if (newTop + dropdownRect.height > window.innerHeight) {
          newTop = buttonRect.top - dropdownRect.height;
        } else if (newTop < 0) {
          newTop = buttonRect.bottom;
        }
      }

      setPosition({ top: newTop, left: newLeft });
    }
  }, [isOpen, direction, leftOffset]);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current !== event.target
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, []);
  const clickHandler = () => {
    if (closeOnClick) {
      closeDropdown();
    }
  };
  if (!isOpen || !position)
    return (
      <div className="dropdown-container">
        <button ref={buttonRef} onClick={toggleDropdown}>
          {toggleBtn}
        </button>
      </div>
    );

  return (
    <div className="dropdown-container">
      <button ref={buttonRef} onClick={toggleDropdown}>
        {toggleBtn}
      </button>
      {ReactDOM.createPortal(
        <div
          className={`portal-dropdown-content dropdown-${direction} ${className}`}
          onClick={clickHandler}
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 99999,
          }}
        >
          {(title || closeButton) && (
            <div className="portal-dropdown-content-header">
              {title && <div className="dropdown-title">{title}</div>}
              {closeButton && (
                <button className="dropdown-close" onClick={closeDropdown}>
                  <CloseSvg />
                </button>
              )}
            </div>
          )}
          <div className="dropdown-body">{children}</div>
          {bottomButtons && (
            <div className="dropdown-bottom-buttons">{bottomButtons}</div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
