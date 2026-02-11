import { renderHook, waitFor } from "@testing-library/react"
import { useBalance } from "../useBalance"

jest.mock("../../services/stellarService", () => ({
  getBalance: jest.fn(() => Promise.resolve(55)),
}))

describe("useBalance", () => {
  it("fetches and sets balance", async () => {
    const { result } = renderHook(() => useBalance("GTEST"))

    await waitFor(() =>
      expect(result.current.balance).toBe(55)
    )
  })

  it("does nothing when address is null", () => {
    const { result } = renderHook(() => useBalance(null))
    expect(result.current.balance).toBe(null)
  })
})
