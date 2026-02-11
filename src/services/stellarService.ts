import { Horizon } from "@stellar/stellar-sdk"

const server = new Horizon.Server("https://horizon-testnet.stellar.org")

export async function getBalance(address: string): Promise<number> {
  const account = await server.loadAccount(address)

  const xlmBalance = account.balances.find(
    (b) => b.asset_type === "native"
  )

  return xlmBalance ? parseFloat(xlmBalance.balance) : 0
}
