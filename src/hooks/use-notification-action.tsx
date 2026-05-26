// useNotificationOperations.ts
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDeleteNotification } from "./notifications";

interface DrawerValues {
  title: string;
  type: string;
}

interface UseNotificationOperationsReturn {
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  isDetailsDrawerOpen: boolean;
  tableDrawer: boolean;
  forwardDrawer: boolean;
  seperateInterruptionShow: boolean;
  drawerValues: DrawerValues;
  cancelationStep: number;
  handleCancel: () => void;
  handleCloseModal: () => void;
  handleConfirm: ({
    chosenRows,
    formValues,
  }: {
    chosenRows: number[];
    formValues?: { reason: number; description?: string };
  }) => void;
  optionsHandler: (option: string) => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDetailsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTableDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setForwardDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setSeperateInterruptionShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNotificationOperations =
  (): UseNotificationOperationsReturn => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [tableDrawer, setTableDrawer] = useState(false);
    const [forwardDrawer, setForwardDrawer] = useState(false);
    const { showToast } = useToast();
    const queryClient = useQueryClient();
    const [drawerValues, setDrawerValues] = useState<DrawerValues>({
      title: "",
      type: "",
    });
    const [cancelationStep, setCancelationStep] = useState(0);
    const [seperateInterruptionShow, setSeperateInterruptionShow] =
      useState(false);

    const handleCancel = () => {
      setCancelationStep(0);
      setIsModalOpen(false);
    };

    const handleCloseModal = () => {
      setCancelationStep(0);
      setIsModalOpen(false);
    };
    const deleteNotificationMutation = useDeleteNotification();
    const handleConfirm = ({
      chosenRows,
      formValues,
      onSuccess,
    }: {
      chosenRows: number[];
      formValues?: { reason: number; description?: string };
      onSuccess?: any;
    }) => {
      if (cancelationStep === 0) {
        setCancelationStep(1);
        return;
      }

      if (!formValues) return; 

      deleteNotificationMutation.mutate(
        {
          list: chosenRows,
          reason: formValues?.reason ?? -1,
          description: formValues?.description ?? "",
        },
        {
          onSuccess: () => {
            showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
            queryClient.invalidateQueries({ queryKey: ["NotificationGrid"] });
            setCancelationStep(0);
            setIsModalOpen(false);
            onSuccess?.();
          },
        }
      );
    };

    const optionsHandler = (option: string) => {
      switch (option) {
        case "Plansız":
          setIsDrawerOpen((prev) => !prev);
          setDrawerValues({
            title: "Plansız Kesinti Oluştur",
            type: "plansız",
          });
          break;
        case "Planlı":
          setIsDrawerOpen((prev) => !prev);
          setDrawerValues({
            title: "Planlı Kesinti Oluştur",
            type: "planlı",
          });
          break;
        case "notif":
          setIsModalOpen((prev) => !prev);
          break;
        case "ayir":
          setSeperateInterruptionShow((prev) => !prev);
          setDrawerValues({
            title: "Kesintiden Ayır",
            type: "ayir",
          });
          break;
        case "ata":
          setTableDrawer((prev) => !prev);
          setDrawerValues({
            title: "Kesintiye Ata",
            type: "ata",
          });
          break;
        case "data":
          setIsDetailsDrawerOpen((prev) => !prev);
          setDrawerValues({
            title: "TCA423",
            type: "data",
          });
          break;
        case "forward":
          setForwardDrawer((prev) => !prev);
          setDrawerValues({
            title: "Bildirimi Farklı Birime Yönlendir",
            type: "forward",
          });
          break;
        default:
          break;
      }
    };

    return {
      isModalOpen,
      isDrawerOpen,
      isDetailsDrawerOpen,
      tableDrawer,
      forwardDrawer,
      drawerValues,
      cancelationStep,
      seperateInterruptionShow,
      handleCancel,
      handleCloseModal,
      handleConfirm,
      optionsHandler,
      setIsDrawerOpen,
      setIsDetailsDrawerOpen,
      setTableDrawer,
      setForwardDrawer,
      setSeperateInterruptionShow,
    };
  };
