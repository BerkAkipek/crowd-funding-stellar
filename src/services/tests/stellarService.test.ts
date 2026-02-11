import { getBalance } from "../stellarService"

jest.mock("@stellar/stellar-sdk", () => ({
  Horizon: {
    Server: jest.fn(() => ({
      loadAccount: jest.fn(() =>
        Promise.resolve({
          balances: [
            { asset_type: "native", balance: "123.0000000" },
          ],
        })
      ),
    })),
  },
}))

describe("stellarService.getBalance", () => {
  it("returns native XLM balance", async () => {
    const balance = await getBalance("GTEST")
    expect(balance).toBe(123)
  })
})
