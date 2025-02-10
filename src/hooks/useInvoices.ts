"use client"

import { Invoice } from "@/lib/types"
import { useState, useEffect, useCallback } from "react"

type Status = "all" | "Paid" | "Unpaid" | "Pending"

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<Status>("all")

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/invoices?search=${searchQuery}&status=${selectedStatus}`)
      if (!response.ok) {
        throw new Error("Failed to fetch invoices")
      }
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      console.error("Error fetching invoices:", error)
      // You might want to handle this error in the component
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, selectedStatus])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const deleteInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete invoice")
      }

      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId))
      return { success: true, message: "Invoice deleted successfully" }
    } catch (error) {
      console.error("Error deleting invoice:", error)
      return { success: false, message: "Failed to delete invoice" }
    }
  }

  return {
    invoices,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    deleteInvoice,
    refetchInvoices: fetchInvoices,
  }
}

