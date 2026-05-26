
import React from "react";

interface GlobalTableHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export const GlobalTableHeader: React.FC<GlobalTableHeaderProps> = ({
  title,
  actions = [],
}) => {

  return (
    <div className="table-wrapper__headeerr">
      <span className="table-wrapper__headeerr-title">{title}</span>

      <div className="table-wrapper__headeerr-actions">
        {actions}
      </div>
    </div>
  );
};
