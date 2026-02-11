"use client"

import { useWallet } from "../hooks/useWallet"
import { useBalance } from "../hooks/useBalance"

export default function WalletButton() {
  const { connected, address, connect, disconnect } = useWallet()
  const { balance, loading } = useBalance(address)

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-6)}`

  const handleClick = connected ? disconnect : connect
  const label = connected ? shortAddress : "Connect Wallet"

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#BF4646",
          color: "white",
          padding: "22px 44px",
          fontSize: "20px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {label}
      </button>

      {connected && (
        <div
          style={{
            marginTop: 16,
            fontSize: "18px",
            fontWeight: 600,
            color: "#BF4646",
            letterSpacing: "0.5px",
          }}
        >
          {loading ? "Loading..." : `${balance} XLM`}
        </div>

      )}
    </div>
  )
}
