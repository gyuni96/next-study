"use client" // 이걸 넣어줘야 클라이언트 사이드 렌더링이 된다.

import { useEffect, useState } from "react"
import { Data } from "../page"

export default function CSRPage() {
  const [data, setData] = useState<Data[]>()

  useEffect(() => {
    fetchData().then(setData)

    console.log("CSR 페이지 입니다.")
  }, [])

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/posts")
    const data: Data[] = await res.json()

    return data
  }

  return (
    <div>
      <p>CSR 페이지 입니다.</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}
