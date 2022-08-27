import Button from "@/components/Button/Button"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Input } from "./components/Form/Input/Input"
import Preview from "./components/Preview/Preview"
import logo from "./logo.svg"
import { GIF, SearchRequest } from "./types"
import fetcher from "./utils/fetcher"

function App() {
  const [q, setQ] = useState<string>("")
  const [result, setResult] = useState<GIF[]>()
  useEffect(() => {
    const args: SearchRequest = {
      q,
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
  }, [q])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setQ(e.target.value)
  }

  return (
    <div className="container">
      <header></header>
      <Input
        name="q"
        value={q}
        onChange={handleSearch}
        placeholder="Search for gifs..."
      />
      <div className="grid grid-cols-3 gap-4">
        {result?.map((gif) => (
          <Preview key={gif.id} {...gif} />
        ))}
      </div>
    </div>
  )
}

export default App
