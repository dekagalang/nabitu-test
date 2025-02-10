export const INVOICE_STATUS = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  PENDING: "Pending",
} as const

export type InvoiceStatus = (typeof INVOICE_STATUS)[keyof typeof INVOICE_STATUS]

export const INVOICE_STATUS_COLORS = {
  [INVOICE_STATUS.PAID]: {
    chip: "success",
    background: "rgba(84, 214, 44, 0.16)",
    text: "rgb(34, 154, 22)",
  },
  [INVOICE_STATUS.UNPAID]: {
    chip: "error",
    background: "rgba(255, 72, 66, 0.16)",
    text: "rgb(183, 33, 54)",
  },
  [INVOICE_STATUS.PENDING]: {
    chip: "warning",
    background: "rgba(255, 193, 7, 0.16)",
    text: "rgb(183, 129, 3)",
  },
} as const

export const INVOICE_FILTER_STATUS = {
  ALL: "all",
  ...INVOICE_STATUS,
} as const

export type InvoiceFilterStatus = (typeof INVOICE_FILTER_STATUS)[keyof typeof INVOICE_FILTER_STATUS]

