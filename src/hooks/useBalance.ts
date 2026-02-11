"use client"

import { useEffect, useState } from "react"
import { getBalance } from "../services/stellarService"

export function useBalance(address: string | null) {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

useEffect(() => {
  if (!address) return

  const addr = address

  async function fetchBalance() {
    setLoading(true)
    const b = await getBalance(addr)
    setBalance(b)
    setLoading(false)
  }

  fetchBalance()
}, [address])


  return { balance, loading }
}
