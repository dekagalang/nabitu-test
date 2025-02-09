import { z } from "zod"

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z
    .string()
    .min(1, "Invoice number is required")
    .regex(/^INV\d{6}$/, "Invoice number must start with INV followed by 6 digits"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.string().min(1, "Amount is required").regex(/^\d+$/, "Amount must be a number without decimals"),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>

export type Invoice = InvoiceFormData & {
  id: string
}

