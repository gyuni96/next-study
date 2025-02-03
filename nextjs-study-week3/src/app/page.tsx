// SSG

export type Data = {
  id: string
  title: string
  author: string
}

export default async function Home() {
  const res = await fetch("http://localhost:4000/posts")
  const posts: Data[] = await res.json()

  console.log("SSG 페이지 입니다.")
  return (
    <>
      <p> 아무것도 하지않으면 SSG PAGE</p>
      <p>{JSON.stringify(posts)}</p>
    </>
  )
}
