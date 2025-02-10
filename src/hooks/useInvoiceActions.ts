"use client"

import { useState, type MouseEvent } from "react"

export function useInvoiceActions() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, invoiceId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedInvoice(invoiceId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    setDeleteDialogOpen(true)
  }

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedInvoice,
    setSelectedInvoice,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
  }
}

