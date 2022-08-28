import { render, screen } from "@testing-library/react"
import { gif } from "../__mocks__/gif"
import Detailed from "./Detailed"

it("should render image", () => {
  render(<Detailed gif={gif} />)
  const image = screen.getByRole("img")
  expect(image).toBeInTheDocument()
})

it("should render title", () => {
  render(<Detailed gif={gif} />)
  const el = screen.getByRole("heading")
  expect(el).toBeInTheDocument()
  expect(el.textContent).toContain(gif.title)
})

it("should render size of the original image", () => {
  render(<Detailed gif={gif} />)
  const el = screen.getByText(/Size:/)
  expect(el.textContent).toContain(gif.images.original.width)
  expect(el.textContent).toContain(gif.images.original.height)
})

it("should render external link", () => {
  render(<Detailed gif={gif} />)
  const el = screen.getByText(/Open on Giphy/)
  expect(el).toBeInTheDocument()
  expect(el).toHaveAttribute("href", gif.url)
  expect(el).toHaveAttribute("rel", "noopener noreferrer")
})
