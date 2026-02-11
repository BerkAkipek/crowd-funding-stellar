"use client"

import { useState } from "react"
import { sendXLM } from "../services/stellarService"

export function useTransaction() {
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function send(from: string, to: string, amount: string) {
    try {
      setLoading(true)
      setError(null)
      setHash(null)

      const txHash = await sendXLM(from, to, amount)

      setHash(txHash)
    } catch {
      setError("Transaction failed")
    } finally {
      setLoading(false)
    }
  }

  return { send, loading, hash, error }
}
