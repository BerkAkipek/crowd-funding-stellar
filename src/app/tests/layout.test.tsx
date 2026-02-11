import { render, screen } from "@testing-library/react"
import RootLayout from "../layout"

describe("Layout", () => {
  it("renders children", () => {
    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    )

    expect(screen.getByText("Child Content")).toBeInTheDocument()
  })
})
