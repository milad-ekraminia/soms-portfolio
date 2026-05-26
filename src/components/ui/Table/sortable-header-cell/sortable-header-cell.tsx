import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableHeaderCellProps {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SortableHeaderCell = ({
  id,
  children,
  style,
}: SortableHeaderCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const draggableStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 0, // Higher when dragging
    touchAction: "none" /* Prevent touch scrolling from breaking drag */,
    userSelect: "none" /* Prevent text selection while dragging */,
    cursor: "grab",
    ...style,
  };

  return (
    <div ref={setNodeRef} style={draggableStyle} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableHeaderCell;
