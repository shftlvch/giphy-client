import { useEffect, useState } from "react"
import { GIF } from "@/types"
import fetcher from "@/utils/fetcher"
import { Link, useParams } from "react-router-dom"
import Detailed from "@/components/GIF/Detailed/Detailed"

function Detail() {
  const { id } = useParams()
  const [gif, setGif] = useState<GIF>()
  useEffect(() => {
    if (id === "") {
      setGif(undefined)
      return
    }

    async function fetch() {
      const resp = await fetcher<GIF>({
        endpoint: `gifs/${id}`
      })
      setGif(resp)
    }
    fetch()
  }, [id])

  return (
    <div className="container pt-8">
      <div className="flex gap-12">
        <div className="shrink-0">
          <Link
            to={"/"}
            className="hover:underline underline-offset-0 text-cyan-200"
          >
            👈 Go back
          </Link>
        </div>
        <div className={"w-full"}>
          <Detailed gif={gif} />
        </div>
      </div>
    </div>
  )
}

export default Detail
