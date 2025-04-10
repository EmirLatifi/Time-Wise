import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  text?: string;
};

export const loadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  text: "Loading",
}));
