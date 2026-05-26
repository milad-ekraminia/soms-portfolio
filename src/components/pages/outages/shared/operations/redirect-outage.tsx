import { AlertSvg } from "@/assets/icons/alert-svg";
import SelectInput from "@/components/ui/input/select-input/select-input";
import {
  drawerFormsSelectOptions,
  redirectOutage,
} from "@/helpers/data/outage";
import { openDrawer } from "@/store/app/drawer-slice";
import { useDispatch } from "react-redux";
// TODO REMOVE?
const RedirectOutage = () => {
  const dispatch = useDispatch();
  // TODO add rowdata after api setting
  const idClickHandler = (id: number) => {
    dispatch(openDrawer({ title: "TBC524", type: "outage", id, rowData: id }));
  };
  return (
    <div className="redirect-outage">
      <div className="redirect-outage__unit">
        <div className="redirect-outage__unit-header">
          <div className="icon">
            <AlertSvg stroke="#1570EF" />
          </div>
          <span className="title">Kayıtlı Operasyon Birimi</span>
        </div>
        <div className="redirect-outage__unit-body">
          {redirectOutage?.map((item) => (
            <div className="item" key={item?.title}>
              <span className="title">{item?.title}</span>
              <span className="value">{item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="redirect-outage__redirecting">
        <div className="redirect-outage__redirecting-header">
          <span className="title">Yönlendirilecek Birim</span>
          <p className="description">
            <button className="item-id" onClick={() => idClickHandler(84832)}>
              84832
            </button>{" "}
            nolu bildirim seçtiğiniz operasyon birimine yönlendirilecektir.
          </p>
        </div>
        <div className="redirect-outage__redirecting-body">
          <SelectInput
            placeholder="İl seçiniz."
            label="İl"
            setValue={() => {}}
            options={drawerFormsSelectOptions[0]?.il ?? []}
          />
          <SelectInput
            placeholder="İlçe seçiniz."
            label="İlçe"
            setValue={() => {}}
            options={drawerFormsSelectOptions[0]?.ilce ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default RedirectOutage;
