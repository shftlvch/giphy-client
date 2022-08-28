import { render, screen } from "@testing-library/react"
import App from "./App"

it("should render placeholder", () => {
  render(<App />)
  const el = screen.getByText(/Start typing to search/i)
  expect(el).toBeInTheDocument()
})
