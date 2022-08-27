import Button from "@/components/Button/Button"
import { useEffect, useState } from "react"
import Preview from "./components/Preview/Preview"
import logo from "./logo.svg"
import { GIF, SearchRequest } from "./types"
import fetcher from "./utils/fetcher"

function App() {
  const [result, setResult] = useState<GIF[]>()
  useEffect(() => {
    const args: SearchRequest = {
      q: "star wars",
      offset: 0,
      limit: 9
    }

    async function search() {
      const resp = await fetcher<GIF[]>({
        endpoint: "gifs/search",
        args
      })
      setResult(resp)
    }
    search()
  }, [])

  return (
    <div className="container">
      <header></header>
      <div className="grid grid-cols-3 gap-4">
        {result?.map((gif) => (
          <Preview key={gif.id} {...gif} />
        ))}
      </div>
    </div>
  )
}

export default App
