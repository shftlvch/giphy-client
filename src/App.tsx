import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Detail from "@/pages/Detail"
import { GiphyContextProvider } from "./contexts/GiphyContext/GiphyContext"

export default function App() {
  return (
    <GiphyContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </Router>
    </GiphyContextProvider>
  )
}
