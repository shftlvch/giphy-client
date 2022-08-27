import { GIF, PropsWithCN } from "@/types"
import { Link } from "react-router-dom"

const Detailed = ({
  className,
  title,
  images,
  id,
  slug,
  username
}: PropsWithCN<GIF>) => {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className || ""}`}>
      <div className="aspect-square rounded-md overflow-hidden bg-slate-700 col-span-2">
        <img
          className="w-full h-full object-cover group-hover:hidden"
          src={images.fixed_width.url}
          alt={title}
        />
      </div>
      <div className="col-span-1">
        <div className="text-sm font-bold text-slate-400">{id}</div>
        <h1 className="text-3xl mb-4">{title}</h1>
        <div>Size: 123x412</div>
        <div>Rating: </div>
        <div>Created by: {username || "n/a"}</div>
      </div>
    </div>
  )
}

export default Detailed
