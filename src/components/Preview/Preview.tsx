import { GIF, PropsWithCN } from "@/types"

const Preview = ({ className, title, images }: PropsWithCN<GIF>) => {
  return (
    <div
      className={`rounded-md overflow-hidden cursor-pointer ${
        className || ""
      } group bg-slate-700`}
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
