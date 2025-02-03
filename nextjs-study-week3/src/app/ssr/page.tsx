// SSR 페이지

import { Data } from "../page"

export default async function SSRPage() {
  const res = await fetch("http://localhost:4000/posts", {
    cache: "no-store",
  })
  const posts: Data[] = await res.json()

  console.log("SSR 페이지 입니다.")

  return (
    <div>
      <p> SSR 페이지 입니다.</p>
      <p>{JSON.stringify(posts)}</p>
    </div>
  )
}
