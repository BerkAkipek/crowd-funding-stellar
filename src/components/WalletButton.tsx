"use client"

import { useWallet } from "../hooks/useWallet"

export default function WalletButton() {
  const { connected, address, connect, disconnect } = useWallet()

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-6)}`

  const handleClick = connected ? disconnect : connect
  const label = connected ? shortAddress : "Connect Wallet"

  return (
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
        fontWeight: 600,
        letterSpacing: "0.5px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        transition: "transform 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {label}
    </button>
  )
}
