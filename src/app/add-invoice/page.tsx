"use client"

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import Layout from "../../components/layout"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Toast from "../../components/toast"

interface FormData {
  name: string
  number: string
  dueDate: string
  amount: string
  status: string
}

interface FormErrors {
  name?: string
  number?: string
  dueDate?: string
  amount?: string
  status?: string
}

export default function AddInvoicePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    number: "",
    dueDate: "",
    amount: "",
    status: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [toastOpen, setToastOpen] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.name) newErrors.name = "Invoice name is required"
    if (!formData.number) newErrors.number = "Invoice number is required"
    if (!formData.dueDate) newErrors.dueDate = "Due date is required"
    if (!formData.amount) newErrors.amount = "Amount is required"
    if (!formData.status) newErrors.status = "Status is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setToastOpen(true)
      // Reset form after 2 seconds and redirect to invoices
      setTimeout(() => {
        setToastOpen(false)
        router.push("/my-invoices")
      }, 2000)
    }
  }

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    })
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      })
    }
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Add Invoice
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={3}>
              Invoice Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "grid", gap: 3 }}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  }}
                >
                  <TextField
                    label="Name"
                    required
                    value={formData.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="Enter your invoice name"
                  />
                  <TextField
                    label="Number"
                    required
                    value={formData.number}
                    onChange={handleChange("number")}
                    error={!!errors.number}
                    helperText={errors.number}
                    placeholder="Enter your invoice number"
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  }}
                >
                  <TextField
                    label="Due Date"
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={handleChange("dueDate")}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Amount"
                    required
                    value={formData.amount}
                    onChange={handleChange("amount")}
                    error={!!errors.amount}
                    helperText={errors.amount}
                    placeholder="Enter your invoice amount"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    }}
                  />
                </Box>
                <FormControl error={!!errors.status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    label="Status"
                    required
                    value={formData.status}
                    onChange={(e) => handleChange("status")(e as React.ChangeEvent<{ value: string }>)}
                  >
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <Button type="submit" variant="contained" size="large" sx={{ minWidth: 200 }}>
                    + Add Invoice
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Invoice added successfully!"
        subMessage="You can view and manage your invoice in the 'My Invoices' section."
      />
    </Layout>
  )
}

