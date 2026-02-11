import { renderHook, waitFor } from "@testing-library/react"
import { useBalance } from "../useBalance"

jest.mock("../../services/stellarService", () => ({
  getBalance: jest.fn(() => Promise.resolve(50)),
}))

describe("useBalance", () => {
  it("loads balance", async () => {
    const { result } = renderHook(() => useBalance("GTEST"))

    await waitFor(() =>
      expect(result.current.balance).toBe(50)
    )
  })
})
