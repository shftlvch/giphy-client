import { PropsWithCN } from "@/types"
import { ChangeEvent } from "react"
import { Input } from "../Form/Input/Input"

export const Search = ({
  className,
  onChange,
  value
}: PropsWithCN<{ value: string; onChange: (q: string) => void }>) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  const handleReset = () => {
    onChange("")
  }
  return (
    <div className={`relative ${className || ""}`}>
      <Input
        name="q"
        value={value}
        onChange={handleSearch}
        placeholder="Search for gifs..."
      />
      {value?.length > 0 && true && (
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
