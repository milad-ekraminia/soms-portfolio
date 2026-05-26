import ToastContainer from "@/components/ui/toast/toast-container";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    { id: number; type: "success" | "error" | 'warning' | 'info'; message: string }[]
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
