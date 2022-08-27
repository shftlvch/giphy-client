import Button from "@/components/Button/Button"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Input } from "@/components/Form/Input/Input"
import Preview from "@/components/Preview/Preview"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import { useDebounce } from "./hooks/useDebounce"
import Skeleton from "./components/Skeleton/Skeleton"
import Placeholder from "./components/Placeholder/Placeholder"

function App() {
  const [q, setQ] = useState<string>("")
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [result, setResult] = useState<GIF[]>()
  const debouncedQ = useDebounce<string>(q, 300)

  useEffect(() => {
    if (debouncedQ === "") {
      setResult(undefined)
      return
    }

    const args: SearchRequest = {
      q: debouncedQ,
      offset: 0,
      limit: 9
    }

    async function search() {
      setIsValidating(true)
      const resp = await fetcher<GIF[]>({
        endpoint: "gifs/search",
        args
      })
      setResult(resp)
      setIsValidating(false)
    }
    console.log("search")
    search()
  }, [debouncedQ])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value)
  }

  console.log("result", result)
  return (
    <div className="container pt-8">
      <header></header>
      <Input
        name="q"
        value={q}
        onChange={handleSearch}
        placeholder="Search for gifs..."
        className="mb-6 max-w-md mx-auto"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {!result && !isValidating && (
          <Placeholder onSelect={setQ} className={"col-span-full py-32"} />
        )}
        {isValidating && <Skeleton count={9} />}
        {!isValidating &&
          result?.map((gif, indx) => <Preview key={gif.id} {...gif} />)}
      </div>
    </div>
  )
}

export default App
