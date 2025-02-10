"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type InvoiceStatus,
  type InvoiceFilterStatus,
  INVOICE_FILTER_STATUS,
} from "../constants/invoice";
import { API_ROUTES } from "@/constants/api";

interface Invoice {
  _id: string;
  name: string;
  number: string;
  dueDate: string;
  status: InvoiceStatus;
  amount: string;
}

type Status = InvoiceFilterStatus;

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    INVOICE_FILTER_STATUS.ALL
  );

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_ROUTES.INVOICES}?search=${searchQuery}&status=${selectedStatus}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedStatus]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const deleteInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(API_ROUTES.INVOICE(invoiceId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete invoice");
      }

      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
      return { success: true, message: "Invoice deleted successfully" };
    } catch (error) {
      console.error("Error deleting invoice:", error);
      return { success: false, message: "Failed to delete invoice" };
    }
  };

  return {
    invoices,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    deleteInvoice,
    refetchInvoices: fetchInvoices,
  };
}
