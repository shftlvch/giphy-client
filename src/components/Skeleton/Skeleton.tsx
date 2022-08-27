import { PropsWithCN, PropsWithCNAndChildren } from "@/types"

const Skeleton = ({ count }: PropsWithCN<{ count: number }>): JSX.Element => {
  return (
    <>
      {[...Array(count)].map((_, indx) => (
        <div
          key={indx}
          className="aspect-square animate-pulse bg-slate-700 rounded-md w-full"
        ></div>
      ))}
    </>
  )
}

export default Skeleton
