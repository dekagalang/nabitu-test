export const API_ROUTES = {
  INVOICES: "/api/invoices",
  INVOICE: (id: string) => `/api/invoices/${id}`,
} as const

