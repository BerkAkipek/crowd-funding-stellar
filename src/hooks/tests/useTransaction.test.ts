import { renderHook, act } from "@testing-library/react"
import { useTransaction } from "../useTransaction"

jest.mock("../../services/stellarService", () => ({
  sendXLM: jest.fn(() => Promise.resolve("hash123")),
}))

describe("useTransaction", () => {
  it("sets hash on success", async () => {
    const { result } = renderHook(() => useTransaction())

    await act(async () => {
      await result.current.send("a", "b", "1")
    })

    expect(result.current.hash).toBe("hash123")
  })
})
