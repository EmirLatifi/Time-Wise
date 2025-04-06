import { create } from "zustand";

type AlertType = "warning" | "info" | "error" | "confirmation" | "success";

type AlertState = {
  isVisible: boolean;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  //Actions

  showAlert: (params: {
    type: AlertType;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  hideAlert: () => void;
};

export const alertStore = create<AlertState>((set) => ({
  isVisible: false,
  type: "info",
  title: "",
  message: "",
  onConfirm: undefined,
  onCancel: undefined,

  showAlert: ({ type, title, message, onConfirm, onCancel }) =>
    set({
      isVisible: true,
      type,
      title,
      message,
      onConfirm,
      onCancel,
    }),

  hideAlert: () =>
    set({
      isVisible: false,
      title: "",
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
