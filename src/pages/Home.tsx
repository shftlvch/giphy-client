import Preview from "@/components/GIF/Preview/Preview"
import Skeleton from "@/components/Skeleton/Skeleton"
import { Search } from "@/components/Search/Search"
import EmptyPlaceholder from "@/components/Placeholder/EmptyPlaceholder"
import { useSearchContext } from "@/contexts/GiphyContext/GiphyContext"
import { PAGE_SIZE } from "@/constants"
import InfiniteScroll from "react-infinite-scroll-component"

function Home() {
  const { q, set, isValidating, result, nextPage } = useSearchContext()
  return (
    <div className="container pt-8">
      <Search
        initialValue={q}
        onChange={set}
        className="mb-6 md:max-w-md mx-auto"
      />
      {!result && !isValidating && (
        <EmptyPlaceholder onSelect={set} className={"py-32"} />
      )}
      {q !== "" && (
        <InfiniteScroll
          dataLength={result?.length || 0} //This is important field to render the next data
          next={nextPage}
          hasMore={true}
          loader={
            <Skeleton count={PAGE_SIZE} className={"w-full aspect-square"} />
          }
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pb-80"
        >
          {isValidating && !result && (
            <Skeleton count={PAGE_SIZE} className={"w-full aspect-square"} />
          )}
          {result?.map((gif) => (
            <Preview key={gif.id} {...gif} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Home
