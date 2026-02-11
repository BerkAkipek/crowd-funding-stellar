import { Horizon, TransactionBuilder, Networks, Operation, Asset } from "@stellar/stellar-sdk"
import { signTransaction } from "@stellar/freighter-api"

const server = new Horizon.Server("https://horizon-testnet.stellar.org")

export async function getBalance(address: string): Promise<number> {
  const account = await server.loadAccount(address)

  const xlmBalance = account.balances.find(
    (b) => b.asset_type === "native"
  )

  return xlmBalance ? parseFloat(xlmBalance.balance) : 0
}
export async function sendXLM(
  from: string,
  to: string,
  amount: string
): Promise<string> {
  const account = await server.loadAccount(from)

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: to,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build()

  const { signedTxXdr } = await signTransaction(tx.toXDR(), {
    networkPassphrase: Networks.TESTNET,
  })

  const signedTx = TransactionBuilder.fromXDR(
    signedTxXdr,
    Networks.TESTNET
  )

  const result = await server.submitTransaction(signedTx)

  return result.hash
}