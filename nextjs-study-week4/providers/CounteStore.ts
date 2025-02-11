import { useMutation } from "@tanstack/react-query"
import { createStore } from "zustand"

export type Count = { value: number }

export interface CountState extends Count {
  increment: () => void
  decrement: () => void
  clear: () => void
}

export type CountStore = ReturnType<typeof createCountStore>

export const createCountStore = (initProps?: Partial<Count>) => {
  const DEFAULT_COUNT: Count = { value: 0 }

  createStore((set) => ({
    ...DEFAULT_COUNT,
    ...initProps,
  }))

  return createStore<CountState>()((set) => ({
    ...DEFAULT_COUNT,
    ...initProps,
    increment: () => set((state) => ({ value: state.value + 1 })),
    decrement: () => set((state) => ({ value: state.value !== 0 ? state.value - 1 : state.value })),
    clear: () => set(DEFAULT_COUNT),
  }))
}
