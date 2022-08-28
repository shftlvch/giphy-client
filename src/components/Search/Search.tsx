import { useDebounce } from "@/hooks/useDebounce"
import { PropsWithCN } from "@/types"
import { useState } from "react"
import { useEffect } from "react"
import { ChangeEvent } from "react"
import { Input } from "../Form/Input/Input"

const DEBOUNCE_INTERVAL = 300

export const Search = ({
  className,
  onChange,
  initialValue
}: PropsWithCN<{ initialValue: string; onChange: (q: string) => void }>) => {
  const [q, setQ] = useState<string>(initialValue)
  const debouncedQ = useDebounce<string>(q, DEBOUNCE_INTERVAL)

  useEffect(() => {
    setQ(initialValue)
  }, [initialValue])

  useEffect(() => {
    onChange(debouncedQ)
  }, [debouncedQ])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value)
  }
  const handleReset = () => {
    setQ("")
  }
  return (
    <div className={`relative ${className || ""}`}>
      <Input
        name="q"
        value={q}
        onChange={handleSearch}
        placeholder="Search for gifs..."
      />
      {q?.length > 0 && true && (
        <button
          className="absolute h-full right-0 top-0 text-black font-bold text-lg px-2 hover:text-teal-500"
          onClick={handleReset}
        >
          &times;
        </button>
      )}
    </div>
  )
}
