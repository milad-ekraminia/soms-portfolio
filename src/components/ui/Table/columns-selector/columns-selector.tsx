import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { SearchSvg } from "@/assets/icons/search-svg";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsGridSvg } from "@/assets/icons/dots-grid-svg";

interface Column {
  accessorKey: string;
  [key: string]: any;
}


interface Props {
  columns: Column[];
  selectedKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  selectAllLabel?: string;
  dragHandleIcon?: React.ReactNode;
}

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export const ColumnSelector: React.FC<Props> = ({
  columns,
  selectedKeys,
  setSelectedKeys,
  columnOrder,
  setColumnOrder,
  selectAllLabel = "Tümünü Seç",
  dragHandleIcon = <DotsGridSvg />,
}) => {
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const toggleKey = (key: string, all = false, isReset?: boolean) => {
    if (isReset) {
      setSelectedKeys(columns.map((col) => col.accessorKey));
      return;
    }
    if (all) {
      if (selectedKeys.length === columns.length) {
        setSelectedKeys([]);
      } else {
        setSelectedKeys(columns.map((col) => col.accessorKey));
      }
    } else {
      setSelectedKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };

  const getCheckStatus = () => {
    const total = columns.length;
    const selected = selectedKeys.length;
    if (selected === total) return "active";
    if (selected === 0) return "deactive";
    return "semi";
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const ordered = useMemo(() => {
    return columnOrder
      .map((key) => columns.find((col) => col.accessorKey === key))
      .filter(Boolean) as Column[];
  }, [columnOrder, columns]);

  const filtered = ordered.filter((col) =>
    col.header.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="export">
      <Input
        leftIcon={<SearchSvg />}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="export__list">
            <SortableItem id="all-select">
              <div className="export__list-item">
                <Checkbox
                  onChange={() => toggleKey("all", true)}
                  checked={["active", "semi"].includes(getCheckStatus())}
                  status={getCheckStatus()}
                />
                <span>{selectAllLabel}</span>
              </div>
            </SortableItem>

            {filtered.map((col) => (
              <SortableItem key={col.accessorKey} id={col.accessorKey}>
                <div className="export__list-item">
                  {dragHandleIcon}
                  <Checkbox
                    onChange={() => toggleKey(col.accessorKey)}
                    checked={selectedKeys.includes(col.accessorKey)}
                  />
                  <span>{col.header}</span>
                </div>
              </SortableItem>
            ))}
          </div>
     
        </SortableContext>
      </DndContext>
    </div>
  );
};
