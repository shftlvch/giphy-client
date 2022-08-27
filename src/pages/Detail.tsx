import { useEffect, useState } from "react"
import Preview from "@/components/Preview/Preview"
import { GIF } from "@/types"
import fetcher from "@/utils/fetcher"
import { useParams } from "react-router-dom"

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

  return <div className="container pt-8">{gif && <Preview {...gif} />}</div>
}

export default Detail
