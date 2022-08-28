import { GIF, PropsWithCN } from "@/types"
import { Link } from "react-router-dom"

const Preview = ({ className, title, images, id, slug }: PropsWithCN<GIF>) => {
  return (
    <div
      className={`rounded-md overflow-hidden cursor-pointer group bg-slate-700${
        className || ""
      }`}
    >
      {/* <h3 className="text-xl">{title}</h3> */}
      <div className="aspect-square">
        <img
          className="w-full h-full object-cover hidden group-hover:block"
          src={images.fixed_width_still.url}
          alt={title}
        />
        <img
          className="w-full h-full object-cover group-hover:hidden"
          src={images.fixed_width.url}
          alt={title}
        />
      </div>
    </div>
  )
}

export default Preview
