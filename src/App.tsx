import Button from "@/components/Button/Button"
import { useEffect } from "react"
import logo from "./logo.svg"
import { SearchRequest } from "./types"
import fetcher from "./utils/fetcher"

function App() {
  useEffect(() => {
    const args: SearchRequest = {
      q: "star wars",
      offset: 0,
      limit: 9
    }

    async function search() {
      const resp = await fetcher({
        endpoint: "gifs/search",
        args
      })
      console.log(resp)
    }
    search()
  }, [])
  return (
    <div className="container">
      <header></header>
      hello
    </div>
  )
}

export default App
