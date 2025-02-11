import { getCount } from "@/server-action"
import CountPage from "./(count)/page"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { CountProvider } from "@/providers/CountProvider"
import { Count } from "@/providers/CounteStore"

const page = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
      },
    },
  })

  await queryClient.prefetchQuery({
    queryKey: ["count"],
    queryFn: () => getCount(),
  })

  const prefetchedCount: number = queryClient.getQueryData(["count"]) ?? 0

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CountProvider value={prefetchedCount}>
          <CountPage />
        </CountProvider>
      </HydrationBoundary>
    </>
  )
}

export default page
