import { PropsWithCNAndChildren } from "@/types"

const Button = ({
  className
}: PropsWithCNAndChildren<{ className?: string }>): JSX.Element => {
  return <div className="rounded-xl px-12 py-2 bg-violet-900">Button</div>
}

export default Button
