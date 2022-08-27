import { PropsWithCN } from "@/types"
import { PropsWithChildren } from "react"

const IDEAS = [
  "oh no!",
  "oops",
  "happy kittens",
  "doggo",
  "stranger things",
  "gal gadot",
  "sam harris",
  "christopher nolan",
  "is lex fridman a robot?",
  "the office",
  "what is love?"
]

const PlaceholderTag = ({
  onClick,
  children
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button
      className="cursor-pointer underline-offset-4 border rounded-lg px-2 py-0 border-teal-800 hover:-translate-y-[1px] hover:bg-teal-900/40 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Placeholder = ({
  className,
  onSelect
}: PropsWithCN<{ onSelect: (value: string) => void }>) => {
  return (
    <div
      className={`flex w-full h-full justify-center items-center flex-col gap-2 ${
        className || ""
      }`}
    >
      <div className="mb-4">Start typing to search.</div>
      <div>Need ideas? Try:</div>{" "}
      <div className="flex flex-wrap justify-center gap-1 max-w-md">
        {IDEAS.map((idea, indx) => (
          <PlaceholderTag key={indx} onClick={() => onSelect(idea)}>
            {idea}
          </PlaceholderTag>
        ))}
      </div>
    </div>
  )
}

export default Placeholder
