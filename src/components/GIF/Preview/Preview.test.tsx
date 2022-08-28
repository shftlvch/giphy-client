import { render, screen } from "@testing-library/react"
import { gif } from "../__mocks__/gif"
import Preview from "./Preview"

it("should render images", () => {
  render(<Preview {...gif} />)
  const images = screen.getAllByRole("img")
  images.forEach((el) => expect(el).toBeInTheDocument())
})
