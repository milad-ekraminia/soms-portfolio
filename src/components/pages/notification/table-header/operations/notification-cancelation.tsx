import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { NotificationCancelTypes } from "@/definitions/enum";
import { enumToOptions } from "@/helpers/enum-converter";
import { openDrawer } from "@/store/app/drawer-slice";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface NotificationCancelationProps {
  selectedRows: number[];
  cancelationStep: number;
  handleCancel: () => void;
  control: any;
  errors: any;
}

const NotificationCancelation = ({
  selectedRows,
  cancelationStep,
  handleCancel,
  control,
  errors,
}: NotificationCancelationProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
 const {
   isOpen,
 } = useSelector((state: any) => state?.drawer);
  const handleIdClick = (id: number) => {
    if (!isOpen){

      dispatch(
        openDrawer({ title: "TBC524", type: "notification", id, rowData: id })
      );
    handleCancel();
    }
  };

  const renderNotificationList = () => {
    return (
      <div className="notification-cancelation__description-button-list">
        {selectedRows.map((row, index) => (
          <Fragment key={row}>
            <span
              className="notification-cancelation__description-item-id"
              onClick={() => handleIdClick(row)}
            >
              {row}
            </span>
            {index < selectedRows.length - 1 && <>, </>}
          </Fragment>
        ))}
        <span> numaralı bildirimler iptal edilecektir. Onaylıyor musunuz?</span>
      </div>
    );
  };

  const renderSingleNotification = () => {
    const id = selectedRows[0];
    return (
      <>
        <span
          className="notification-cancelation__description-item-id"
          onClick={() => handleIdClick(id)}
        >
          {id}
        </span>
        <span> numaralı bildirim iptal edilecektir. Onaylıyor musunuz?</span>
      </>
    );
  };

  return (
    <div className="notification-cancelation">
      {cancelationStep === 0 ? (
        <p className="notification-cancelation__description">
          {selectedRows.length > 1
            ? renderNotificationList()
            : renderSingleNotification()}
        </p>
      ) : (
        <div className="notification-cancelation__reason">
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                placeholder="İptal Nedeni seçiniz"
                label="İptal Nedeni"
                options={enumToOptions(NotificationCancelTypes).map((o) => ({
                  ...o,
                  displayName: t(`Enum.${o.displayName}`),
                }))}
                selected={field.value}
                setValue={field.onChange}
                error={errors.reason?.message}
                required={true}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Açıklama"
                placeholder="Metin giriniz."
                error={errors.description?.message}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationCancelation;
