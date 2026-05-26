import SelectInput from "@/components/ui/input/select-input/select-input";
import {
  commonFieldsPlaceholders,
  placeholderMap,
  plannedSmsTabs,
  scheduledSmsPlaceholders,
  unPlannedSmsTabs,
  unScheduledSmsPlaceholders,
} from "@/helpers/data/settings";
import { useEffect, useState } from "react";
import {
  convertIdsToPlaceholders,
  convertPlaceholdersToIds,
} from "@/helpers/sms-id-to-place-holder";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { usePostNewMessage } from "@/hooks/settings/use-post-new-message";
import { TextEditorSvg } from "@/assets/icons/text-editor-svg";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { usePostUpdateMessage } from "@/hooks/settings/use-post-update-message";
import { DynamicTextArea } from "@/components/ui/input/textarea/dynamic-textarea";

interface AddMessageModalProps {
  type: "planned" | "unPlanned";
  item?: any;
  setShowModal?: any;
  showModal?: any;
  title?: any;
}
const initialValues = {
  category: "",
  text: "",
  placeholderIds: [] as number[],
};
export const AddMessageModal = ({
  type,
  item,
  showModal,
  setShowModal,
  title,
}: AddMessageModalProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [values, setValues] = useState(initialValues);

  // Options depend on planned/unPlanned
  const selectOptions = type === "planned" ? plannedSmsTabs : unPlannedSmsTabs;

  // Generic state update
  const selectInputHandler = (data: string | number, field: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  // Textarea typing
  const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      text: value,
    }));
  };
  const placeholderItemsHandler = (
    item: { id: number; label: string },
    cursorPos: number
  ) => {
    setValues((prev) => ({
      ...prev,
      text:
        prev.text.substring(0, cursorPos) +
        item.label +
        prev.text.substring(cursorPos),
      placeholderIds: [...prev.placeholderIds, item.id],
    }));

    // Move cursor after inserted placeholder
    setTimeout(() => {
      const textarea = document.getElementById(
        "message-textarea"
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.selectionStart = textarea.selectionEnd =
          cursorPos + item.label.length;
        textarea.focus();
      }
    }, 0);
  };

  // Populate values on edit
  useEffect(() => {
    if (item) {
      // find placeholder ids from text
      const foundIds = Object.entries(placeholderMap)
        .filter(([placeholder]) => item?.content?.includes(placeholder))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_, id]) => id);

      setValues({
        category: item?.messageTypeId ?? "",
        text: convertIdsToPlaceholders(item?.content ?? ""),
        placeholderIds: foundIds,
      });
    }
  }, [item, type]);

  // Placeholder options
  const placeHolderOptions: any[] = [
    ...commonFieldsPlaceholders,
    ...(type === "unPlanned"
      ? unScheduledSmsPlaceholders
      : scheduledSmsPlaceholders),
  ];
  const postNewMessage = usePostNewMessage();
  const postUpdateMessage = usePostUpdateMessage();
  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleMessage = () => {
    if (item) {
      postUpdateMessage?.mutate(
        {
          message: convertPlaceholdersToIds(values?.text),
          TEMPLATE_ID: item?.id,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
            const { responseMessage, responseStatusCode } = data ?? {};
            if (responseStatusCode === 600) {
              showToast(responseMessage, "success");
            } else {
              showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
            }
            setValues(initialValues);
          },
          onError: (error: any) => {
            const responseMessage =
              error?.response?.data?.responseMessage ?? "İşlem Başarısız"; // Fallback message

            showToast(responseMessage, "error");
          },
        }
      );
    } else {
      postNewMessage?.mutate(
        {
          message: convertPlaceholdersToIds(values?.text),
          messageCategory: values?.category,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
            const { responseMessage, responseStatusCode } = data ?? {};
            if (responseStatusCode === 600) {
              showToast(responseMessage, "error");
            } else {
              showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
            }
          },
          onError: (error: any) => {
            const responseMessage =
              error?.response?.data?.responseMessage ?? "İşlem Başarısız"; // Fallback message

            showToast(responseMessage, "error");
          },
        }
      );
    }
    setValues(initialValues);
    setShowModal(false);
  };
  return (
    <NotificationModal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      title={title}
      onConfirm={handleMessage}
      onCancel={handleCancelModal}
      submitButtonText="Kaydet"
      cancelButtonText="Vazgeç"
      footerType="addNotif"
      icon={<TextEditorSvg />}
    >
      <div className="add-message-modal">
        <SelectInput
          placeholder="Şablon seçiniz"
          label="Şablon"
          selected={values.category}
          setValue={(value: string | number) =>
            selectInputHandler(value, "category")
          }
          options={selectOptions?.map((opt: any) => ({
            ...opt,
            displayName: opt.title,
          }))}
          disabled={!!values.category}
        />
        {/* <TextArea
          label="Mesaj Metni"
          placeholder="Metin giriniz"
          rows={4}
          textAreaHandler={textAreaHandler}
          placeholderItemsHandler={placeholderItemsHandler}
          placeholderItems={placeHolderOptions}
          value={values.text}
        /> */}
        <DynamicTextArea
          id="message-textarea" // important for cursor restore
          label="Mesaj Metni"
          placeholder="Metin giriniz"
          rows={4}
          textAreaHandler={textAreaHandler}
          placeholderItemsHandler={placeholderItemsHandler}
          placeholderItems={placeHolderOptions}
          value={values.text}
        />
      </div>
    </NotificationModal>
  );
};
