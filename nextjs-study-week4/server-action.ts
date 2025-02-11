import { Count } from "./providers/CounteStore"

export const getCount = async () => {
  const response = await fetch("http://localhost:3001/count", {
    cache: "no-store",
  })
  const data: Count = await response.json()
  return data.value
}
