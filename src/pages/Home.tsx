import Preview from "@/components/GIF/Preview/Preview"
import Skeleton from "@/components/Skeleton/Skeleton"
import { Search } from "@/components/Search/Search"
import EmptyPlaceholder from "@/components/Placeholder/EmptyPlaceholder"
import { useSearchContext } from "@/contexts/GiphyContext/GiphyContext"
import { PAGE_SIZE } from "@/constants"

function Home() {
  const { q, set, isValidating, result } = useSearchContext()

  return (
    <div className="container pt-8">
      <Search value={q} onChange={set} className="mb-6 md:max-w-md mx-auto" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {!result && !isValidating && (
          <EmptyPlaceholder onSelect={set} className={"col-span-full py-32"} />
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
