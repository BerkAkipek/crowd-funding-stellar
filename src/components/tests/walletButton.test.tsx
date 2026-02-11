import { render, screen } from "@testing-library/react"
import WalletButton from "../WalletButton"

jest.mock("../../hooks/useWallet", () => ({
  useWallet: () => ({
    connected: false,
    address: null,
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
}))

describe("WalletButton", () => {
  it("renders connect button when disconnected", () => {
    render(<WalletButton />)
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument()
  })
})
