// ISR

import { Data } from "../page"

export default async function ISRPage() {
  const res = await fetch("http://localhost:4000/posts", {
    next: {
      revalidate: 10, // 10초마다 캐시를 업데이트
    },
  })
  const posts: Data[] = await res.json()

  console.log("ISR 페이지 입니다.")

  return (
    <div>
      <p> ISR 페이지 입니다.</p>
      <p>{JSON.stringify(posts)}</p>
    </div>
  )
}
