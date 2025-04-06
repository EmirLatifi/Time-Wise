import { create } from "zustand";

type ErrorState = {
  errors: {
    breakInterval?: boolean;
    breakFrequency?: boolean;
    targetError?: boolean;
  };

  // Actions
  setErrors: (errors: {
    breakInterval?: boolean;
    breakFrequency?: boolean;
    targetError?: boolean;
  }) => void;
  reset: () => void;
};

export const errorStore = create<ErrorState>((set) => ({
  errors: { breakInterval: false, breakFrequency: false, targetError: false },
  setErrors: (errors) => set({ errors }),

  reset: () =>
    set({
      errors: {
        breakInterval: false,
        breakFrequency: false,
        targetError: false,
      },
    }),
}));
