import { openDrawer } from "@/store/app/drawer-slice";
import { useDispatch } from "react-redux";

interface DetailsCardType {
  title: string;
  value: number | string;
  type?: string;
}
interface DetailsCardWrapperProps {
  data: DetailsCardType[];
}

const DetailsCardWrapper = ({ data }: DetailsCardWrapperProps) => {
  const dispatch = useDispatch();

  const handleIdClick = (value: any) => {
    dispatch(
      openDrawer({ title: "TBC524", type: "outage", id: value, rowData: value })
    );
  };
  return (
    <ul className="life-cycle-card">
      {data.map((item: DetailsCardType) => {
        return item?.type == "link" ? (
          <button
            className="item item-id"
            key={item?.title}
            onClick={() => handleIdClick(item?.value)}
          >
            <span className="title">{item?.title}</span>
            <span className="value">{item?.value}</span>
          </button>
        ) : (
          <div className="item" key={item?.title}>
            <span className="title">{item?.title}</span>
            <span className="value">{item?.value}</span>
          </div>
        );
      })}
    </ul>
  );
};

export default DetailsCardWrapper;
