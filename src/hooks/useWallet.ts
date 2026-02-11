"use client"

import { useState, useEffect } from "react"
import {
  getAddress,
  isConnected,
} from "@stellar/freighter-api"

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    try {
      const conn = await isConnected()

      if (conn) {
        const { address } = await getAddress()
        setAddress(address)
        setConnected(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function connect() {
    const { address } = await getAddress()
    setAddress(address)
    setConnected(true)
  }

  function disconnect() {
    setAddress(null)
    setConnected(false)
  }

  return {
    address,
    connected,
    loading,
    connect,
    disconnect,
  }
}
