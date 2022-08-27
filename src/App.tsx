import Button from "@/components/Button/Button"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Input } from "@/components/Form/Input/Input"
import Preview from "@/components/Preview/Preview"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import { useDebounce } from "./hooks/useDebounce"

function App() {
  const [q, setQ] = useState<string>("")
  const [result, setResult] = useState<GIF[]>()
  const debouncedQ = useDebounce<string>(q, 500)
  useEffect(() => {
    const args: SearchRequest = {
      q: debouncedQ,
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
  }, [debouncedQ])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value)
  }

  return (
    <div className="container pt-8">
      <header></header>
      <Input
        name="q"
        value={q}
        onChange={handleSearch}
        placeholder="Search for gifs..."
        className="mb-6"
      />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {result?.map((gif) => (
          <Preview key={gif.id} {...gif} />
        ))}
      </div>
    </div>
  )
}

export default App
