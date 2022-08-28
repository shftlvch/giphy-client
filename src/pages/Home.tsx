import Preview from "@/components/GIF/Preview/Preview"
import Skeleton from "@/components/Skeleton/Skeleton"
import { Search } from "@/components/Search/Search"
import EmptyPlaceholder from "@/components/Placeholder/EmptyPlaceholder"
import { useSearchContext } from "@/contexts/GiphyContext/GiphyContext"
import { PAGE_SIZE } from "@/constants"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"

/**
 * Home/search page
 *
 */
function Home() {
  const {
    state: { q, isValidating, pages, hasMore },
    set,
    nextPage
  } = useSearchContext()
  const result = pages?.reduce((prev, curr) => {
    return [...prev, ...curr]
  }, [])
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
          dataLength={result?.length || 0}
          next={nextPage}
          hasMore={hasMore}
          loader={
            <Skeleton count={PAGE_SIZE} className={"w-full aspect-square"} />
          }
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pb-80"
        >
          {isValidating && !result && (
            <Skeleton count={PAGE_SIZE} className={"w-full aspect-square"} />
          )}
          {result?.length === 0 && (
            <div className="flex justify-center items-center col-span-full py-32">
              No items found 😢
            </div>
          )}
          {result?.map((gif, indx) => (
            <Link to={`/${gif.id}`} key={`${gif.id}/${indx}`}>
              <Preview {...gif} />
            </Link>
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Home
