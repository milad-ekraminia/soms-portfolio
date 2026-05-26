import { TrashSvg } from "@/assets/icons/trash-svg";
import { Loader } from "@/components/ui/loader/loader";
import { getClassNames } from "@/helpers/get-class-names";
import { NoSmsData } from "./no-sms-data";
import { EditSvg } from "@/assets/icons/edit-svg";
import { convertIdsToPlaceholders } from "@/helpers/sms-id-to-place-holder";
interface MessagesTabSectionProps {
  handleChosenSms: (sms: string) => void;
  listTab: any;
  isLoading: any;
  setShowDelete: any;
  setShowEdit: any;
  setShowAddNewMsg: any;
  chosenSms: any;
}
export const ListMessagesTab = ({
  handleChosenSms,
  listTab,
  isLoading,
  setShowDelete,
  setShowEdit,
  setShowAddNewMsg,
  chosenSms,
}: MessagesTabSectionProps) => {

  return (
    <>
      <h3 className="title">Hazır Şablonlar</h3>
      {!isLoading && listTab?.responseList?.length > 0
        ? listTab?.responseList?.map((item: any) => (
            <span
              className={getClassNames("message-item", [
                [chosenSms?.id === item?.id, "active"],
              ])}
              key={item.id}
              onClick={() => {
                handleChosenSms(item);
              }}
            >
              <p className="message-text">
                {convertIdsToPlaceholders(item.content ?? "")}
              </p>
              <div className="actions">
                <button
                  onClick={() => {
                    setShowEdit(item);
                  }}
                >
                  <EditSvg stroke="#1570EF" />
                </button>
                <button
                  onClick={() => {
                    setShowDelete(item?.id);
                  }}
                >
                  <TrashSvg stroke="#D92D20" />
                </button>
              </div>
            </span>
          ))
        : null}
      {isLoading ? (
        <div className="loader-wrapper">
          <Loader />
          <span className="" style={{ color: "var(--text-secondary-700)" }}>
            Yükleniyor...
          </span>
        </div>
      ) : (
        ""
      )}
      {!isLoading && listTab?.responseList?.length < 1 ? (
        <NoSmsData setShowAddNewMsg={setShowAddNewMsg} />
      ) : (
        ""
      )}
    </>
  );
};
