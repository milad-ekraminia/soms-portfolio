import { LineSvg } from "@/assets/icons/line-svg";
import { Loader } from "@/components/ui/loader/loader";
import { calculatePortion } from "@/helpers/calculateChange";
import { useSubscriberWithoutEnergyCount } from "@/hooks/dashboard";

const SubscribersCountCard = () => {
  const { data, isLoading } = useSubscriberWithoutEnergyCount();

  const rawPercentage = calculatePortion(
    Number(data?.affectedByTheOutageCount ?? 0),
    Number(data?.totalSubscriberCount ?? 0)
  );
  const percentage = rawPercentage;
  if (isLoading) {
    return <Loader />;
  }
  const formatNumber = (num: number | undefined) =>
    (num ?? 0).toLocaleString("tr-TR");
  const affected = data?.affectedByTheOutageCount ?? 0;
  const total = data?.totalSubscriberCount ?? 0;
  const safePercentage = Math.max(0, Math.min(percentage, 100)) *100;

  return (
    <div className="subscriber-count-card">
      <div className="header">
        <h1>Enerjisiz Abone Sayısı</h1>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <span
            style={{
              width: `${safePercentage.toFixed(1)}%`,
            }}
          >
            {safePercentage.toFixed(1)}%
          </span>
        </div>
        <div className="color-indicator"></div>
        <div className="icon-indicator">
          {Array.from({ length: 25 }).map((_, i) => (
            <LineSvg key={`icon-${i}`} />
          ))}
        </div>
        <div className="text-indicator">
          <p>İyi</p>
          <p>İyi değil</p>
          <p>Çok kötü</p>
        </div>
      </div>
      <div className="extra-info">
        <div>
          <p>Enerjisiz Abone Sayısı</p>
          <span>{formatNumber(affected)}</span>
        </div>
        <div>
          <p>Toplam Abone Sayısı</p>
          <span>{formatNumber(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default SubscribersCountCard;
