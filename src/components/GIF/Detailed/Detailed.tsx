import Skeleton from "@/components/Skeleton/Skeleton"
import { GIF, PropsWithCN } from "@/types"

const Detailed = ({ className, gif }: PropsWithCN<{ gif?: GIF }>) => {
  const { title, images, id, rating, username, url } = gif || {}
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className || ""}`}>
      <div className="aspect-square rounded-md overflow-hidden bg-slate-700 col-span-2">
        {!gif && <Skeleton className="w-full h-full aspect-square" />}
        {images && (
          <img
            className="w-full h-full object-cover group-hover:hidden"
            src={images.fixed_width.url}
            alt={title}
          />
        )}
      </div>
      <div className="col-span-1">
        <div className="text-sm font-bold text-slate-400">
          {id || <Skeleton className="h-[1em] mb-2 w-32" />}
        </div>
        <h1 className="text-3xl mb-4">
          {title || <Skeleton className="w-full h-[1em]" />}
        </h1>

        <div className="mb-3">
          <div>
            Size:{" "}
            {images ? (
              <>
                {images.original.width}x{images.original.height}
              </>
            ) : (
              <Skeleton className="w-20 h-[1em] inline-block" />
            )}
          </div>
          <div>
            Rating:{" "}
            {rating || <Skeleton className="w-4 h-[1em] inline-block" />}
          </div>
          <div>Created by: {username || "n/a"}</div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-0 text-cyan-200"
        >
          🔗 Open on Giphy
        </a>
      </div>
    </div>
  )
}

export default Detailed
