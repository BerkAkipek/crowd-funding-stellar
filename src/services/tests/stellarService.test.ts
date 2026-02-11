import { getBalance, sendXLM } from "../stellarService"

jest.mock("@stellar/stellar-sdk", () => {
  const mockBuild = {
    toXDR: jest.fn(() => "mockXDR"),
  }

  const mockTxBuilder = jest.fn(() => ({
    addOperation: jest.fn().mockReturnThis(),
    setTimeout: jest.fn().mockReturnThis(),
    build: jest.fn(() => mockBuild),
  }))

  const TransactionBuilder = Object.assign(mockTxBuilder, {
    fromXDR: jest.fn(() => ({})),
  })

  return {
    Horizon: {
      Server: jest.fn(() => ({
        loadAccount: jest.fn(() =>
          Promise.resolve({
            balances: [
              { asset_type: "native", balance: "99.0000000" },
            ],
          })
        ),
        submitTransaction: jest.fn(() =>
          Promise.resolve({ hash: "abc123" })
        ),
      })),
    },
    TransactionBuilder,
    Networks: { TESTNET: "TESTNET" },
    Operation: { payment: jest.fn() },
    Asset: { native: jest.fn() },
  }
})


jest.mock("@stellar/freighter-api", () => ({
  signTransaction: jest.fn(() => Promise.resolve("signedXDR")),
}))

describe("stellarService", () => {
  it("returns XLM balance", async () => {
    const balance = await getBalance("GTEST")
    expect(balance).toBe(99)
  })

  it("returns tx hash after send", async () => {
    const hash = await sendXLM("a", "b", "1")
    expect(hash).toBe("abc123")
  })
})
