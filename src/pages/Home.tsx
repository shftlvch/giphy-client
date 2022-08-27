import { useEffect, useState } from "react"
import Preview from "@/components/GIF/Preview/Preview"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import { useDebounce } from "@/hooks/useDebounce"
import Skeleton from "@/components/Skeleton/Skeleton"
import { Search } from "@/components/Search/Search"
import EmptyPlaceholder from "@/components/Placeholder/EmptyPlaceholder"

const PAGE_SIZE = 9

function Home() {
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
      limit: PAGE_SIZE
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
    search()
  }, [debouncedQ])

  return (
    <div className="container pt-8">
      <Search value={q} onChange={setQ} className="mb-6 md:max-w-md mx-auto" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {!result && !isValidating && (
          <EmptyPlaceholder onSelect={setQ} className={"col-span-full py-32"} />
        )}
        {isValidating && (
          <Skeleton count={PAGE_SIZE} className={"w-full aspect-square"} />
        )}
        {!isValidating &&
          result?.map((gif, indx) => <Preview key={gif.id} {...gif} />)}
      </div>
    </div>
  )
}

export default Home
