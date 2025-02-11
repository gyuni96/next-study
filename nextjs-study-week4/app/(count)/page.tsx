"use client"

import Button from "@/components/Button"
import { Count } from "@/providers/CounteStore"
import { useCountContext } from "@/providers/CountProvider"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

const CountPage = () => {
  const { value, clear, increment, decrement } = useCountContext((state) => state)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/count")
      const data: Count = await response.json()
      return data.value
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: async (count: number) => {
      return await fetch("http://localhost:3001/count", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: count }),
      })
    },
    onSuccess: async () => {
      console.log("Success")
    },
  })

  const handleIncrement = async () => {
    await mutateAsync(value + 1)
    increment()
  }

  const handleDecrement = async () => {
    await mutateAsync(value - 1)
    decrement()
  }

  const handleClear = async () => {
    await mutateAsync(0)
    clear()
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center flex-1 px-20 text-center gap-4">
        <div className="flex gap-4">
          <span>Count</span>
          <span>:</span>
          <span className="font-bold">{value}</span>
        </div>
        <div className="flex gap-1.5">
          <Button buttonClick={handleIncrement}>Increment</Button>
          <Button buttonClick={handleDecrement}>Decrement</Button>
          <Button buttonClick={handleClear}>Clear</Button>
        </div>
      </div>
    </div>
  )
}

export default CountPage
