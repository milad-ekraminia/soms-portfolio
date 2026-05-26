import { useRef, useState } from "react";

export const useContextMenu = ({
  setSelectedRows,
  selectedRows,
}: {
  setSelectedRows: any;
  selectedRows: any;
}) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const openContextMenu = (
    e: React.MouseEvent<HTMLElement>,
    rowId?: number
  ) => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;
    const width = 310;
    const height = 420;
    const margin = 50;

    // Right edge
    if (x + width > window.innerWidth - margin) {
      x = window.innerWidth - width - margin;
    }
    // Left edge
    if (x < margin) {
      x = margin;
    }
    // Bottom edge
    if (y + height > window.innerHeight - margin) {
      y = window.innerHeight - height - margin;
    }
    // Top edge
    if (y < margin) {
      y = margin;
    }

    if (selectedRows?.length === 0 && rowId !== undefined) {
      setSelectedRows([rowId]);
    }
    setContextMenu({ x, y });
  };

  const closeContextMenu = (e: any) => {
    if (
      e.type === "click" ||
      (e.type === "focusout" &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target))
    ) {
      setContextMenu(null);
    }
  };

  return {
    contextMenu,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
  };
};
