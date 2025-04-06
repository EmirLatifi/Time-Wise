import { create } from "zustand";

type ModalState = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isModalVisible: false,

  toggleModal: () =>
    set((state) => ({ isModalVisible: !state.isModalVisible })),
}));

type ProgressModalState = {
  isModalVisible: boolean;
  targetType: string;
  toggleProgressModal: (type?: string) => void;
};

export const progressModalStore = create<ProgressModalState>((set) => ({
  isModalVisible: false,
  targetType: "daily",
  toggleProgressModal: (type?: string) =>
    set((state) => ({
      isModalVisible: !state.isModalVisible,
      targetType: type,
    })),
}));
