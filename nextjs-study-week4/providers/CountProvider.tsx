"use client"

import { useContext, useRef } from "react"
import { createCountStore, CountState, Count, CountStore } from "@/providers/CounteStore"
import { createContext } from "react"
import { useStore } from "zustand"

export function useCountContext<T>(selector: (state: CountState) => T): T {
  const store = useContext(CountContext)
  if (!store) throw new Error("Missing CartContext.Provider in the tree")
  return useStore(store, selector)
}

export const CountContext = createContext<CountStore | null>(null)

type CountProviderProps = React.PropsWithChildren<Count>
export const CountProvider = ({ children, ...props }: CountProviderProps) => {
  const storeRef = useRef<CountStore>(null)
  if (!storeRef.current) {
    storeRef.current = createCountStore(props)
  }
  return <CountContext.Provider value={storeRef.current}>{children}</CountContext.Provider>
}
