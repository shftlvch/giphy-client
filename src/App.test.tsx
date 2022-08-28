import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "./App"
import { act } from "react-dom/test-utils"
import { MemoryRouter } from "react-router-dom"

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(global, "setTimeout")
})
afterEach(() => jest.useRealTimers())

it("should render placeholder", () => {
  render(<App />)
  const el = screen.getByText(/Start typing to search/i)
  expect(el).toBeInTheDocument()
})

it("navigates to the delailed page when you click a gif", async () => {
  render(<App />)

  await act(async () => {
    const el = screen.getByRole("textbox")
    fireEvent.change(el, { target: { value: "kittens" } })

    expect(setTimeout).toBeCalled()

    const a = await screen.findByRole("link")
    a.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  // Check correct page content showed up
  expect(document.body.textContent).toBe("Welcome")
})
