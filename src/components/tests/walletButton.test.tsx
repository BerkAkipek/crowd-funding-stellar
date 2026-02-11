import { render, screen } from "@testing-library/react"
import WalletButton from "../WalletButton"

jest.mock("../../hooks/useWallet", () => ({
  useWallet: () => ({
    connected: true,
    address: "GABCDEF123456",
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
}))

jest.mock("../../hooks/useBalance", () => ({
  useBalance: () => ({
    balance: 42,
    loading: false,
  }),
}))

jest.mock("../../hooks/useTransaction", () => ({
  useTransaction: () => ({
    send: jest.fn(),
    loading: false,
    hash: "hash999",
    error: null,
  }),
}))

describe("WalletButton", () => {
  it("shows shortened address", () => {
    render(<WalletButton />)
    expect(screen.getByText(/GABCDE.*3456/)).toBeInTheDocument()
  })

  it("shows balance", () => {
    render(<WalletButton />)
    expect(screen.getByText("42 XLM")).toBeInTheDocument()
  })

  it("shows success hash", () => {
    render(<WalletButton />)
    expect(screen.getByText(/hash999/)).toBeInTheDocument()
  })
})
