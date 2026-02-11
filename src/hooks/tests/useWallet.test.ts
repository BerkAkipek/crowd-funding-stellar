import { renderHook, act } from "@testing-library/react"
import { useWallet } from "../useWallet"

jest.mock("@stellar/freighter-api", () => ({
  getAddress: jest.fn(() => Promise.resolve({ address: "GABCDEF123456789" })),
  isConnected: jest.fn(() => Promise.resolve(true)),
}))

describe("useWallet", () => {
  it("connects and sets address", async () => {
    const { result } = renderHook(() => useWallet())

    await act(async () => {
      await act(async () => {
        await result.current.connect()
      })
    })

    expect(result.current.connected).toBe(true)
    expect(result.current.address).toBe("GABCDEF123456789")
  })

  it("disconnects correctly", () => {
    const { result } = renderHook(() => useWallet())

    act(() => {
      result.current.disconnect()
    })

    expect(result.current.connected).toBe(false)
  })
})
