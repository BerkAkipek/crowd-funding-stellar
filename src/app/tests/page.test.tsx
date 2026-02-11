import { render, screen } from "@testing-library/react"
import Home from "../page"

jest.mock("@/components/WalletButton", () => {
  const MockWalletButton = () => <button>Mock Wallet</button>
  return MockWalletButton
})


describe("Home Page", () => {
  it("renders wallet button", () => {
    render(<Home />)
    expect(screen.getByText("Mock Wallet")).toBeInTheDocument()
  })
})
