import React from "react";

export interface DetailItem {
  label?: string;
  value?: string | number | null | undefined;

  // existing
  labelSlot?: React.ReactNode;

  // ✅ add these
  valueSlot?: React.ReactNode; // render custom value UI
  fullRowSlot?: React.ReactNode; // render a full-width row (Stepper)
}

interface DetailKeyValueListProps {
  items: DetailItem[];
  columns?: number;
}

export const DetailKeyValueList: React.FC<DetailKeyValueListProps> = ({
  items,
  columns = 2,
}) => {
  // keep normal items split in columns
  const normalItems = items.filter((i) => !i.fullRowSlot);
  const fullRowItems = items.filter((i) => i.fullRowSlot);

  const itemsPerColumn = Math.ceil(normalItems.length / columns);

  const columnData = Array.from({ length: columns }, (_, i) =>
    normalItems.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  return (
    <div className="detail-box">
      <div className="detail-box__columns">
        {columnData.map((col, colIdx) => (
          <div key={colIdx} className="detail-box__column">
            {col.map((item, idx) => (
              <div key={idx} className="detail-box__row">
                <span className="detail-box__label">
                  {item.label}
                  {item.labelSlot && (
                    <span className="detail-box__label-slot">
                      {item.labelSlot}
                    </span>
                  )}
                </span>

                <span className="detail-box__dots" />

                <span className="detail-box__value">
                  {item.valueSlot ?? item.value ?? "-"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ full-width rows (Stepper etc.) */}
      {fullRowItems.length > 0 && (
        <div className="detail-box__full-rows">
          {fullRowItems.map((item, i) => (
            <div key={i} className="detail-box__full-row">
              {item.fullRowSlot}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
