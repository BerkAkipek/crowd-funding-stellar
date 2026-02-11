"use client"

import { useWallet } from "../hooks/useWallet"
import { useBalance } from "../hooks/useBalance"
import { useTransaction } from "../hooks/useTransaction"

export default function WalletButton() {
  const { connected, address, connect, disconnect } = useWallet()
  const { balance, loading } = useBalance(address)
  const { send, loading: txLoading, hash, error } = useTransaction()

  const handleClick = connected ? disconnect : connect
  const label = !connected
    ? "Connect Wallet"
    : address
    ? `${address.slice(0, 6)}...${address.slice(-6)}`
    : "Connecting..."

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
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
          minWidth: "240px",
          transition: "transform 0.15s ease",
        }}
      >
        {label}
      </button>

      {connected && (
        <>
          {/* balance */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#BF4646",
            }}
          >
            {loading ? "Loading..." : `${balance} XLM`}
          </div>

          {/* send button */}
          <button
            onClick={() => send(address!, address!, "1")}
            style={{
              backgroundColor: "#BF4646",
              color: "white",
              padding: "12px 26px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {txLoading ? "Donating..." : "Donate 1 XLM"}
          </button>

          {hash && (
            <div style={{ color: "green" }}>
              Success {hash.slice(0, 10)}...
            </div>
          )}

          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}
        </>
      )}
    </div>
  )
}
