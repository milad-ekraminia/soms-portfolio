// src/components/cards/cards-detail.tsx

import { CARD_LABELS, LabelGroup } from "@/helpers/data/cards/content";

interface CardsDetailProps {
  type: LabelGroup; // tells it which mapping to use
  data: Record<string, number>;
}

export const CardsDetail = ({ type, data }: CardsDetailProps) => {
  const labels = CARD_LABELS[type] || CARD_LABELS.default;

  return (
    <div className="cards-detail">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="cards-detail__item">
          <span className="cards-detail__item-title">
            {labels[key] || key}:
            
          </span>
          <span className="cards-detail__item-value">{value}</span>
        </div>
      ))}
    </div>
  );
};
