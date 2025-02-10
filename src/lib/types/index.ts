export interface Invoice {
  _id: string
  name: string
  number: string
  dueDate: string
  status: "Paid" | "Unpaid" | "Pending"
  amount: string
}