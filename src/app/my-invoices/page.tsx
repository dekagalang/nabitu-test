"use client"

import type React from "react"
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { MoreVertical, Search, Edit, Trash } from "lucide-react"
import Layout from "../../components/layout"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { formatCurrency } from "../../utils/format-currency"
import Toast from "../../components/toast"

const invoices = [
  {
    id: "INV202501",
    name: "Internet Subscription",
    number: "INV202501",
    dueDate: "Jan 13,2025",
    status: "Paid",
    amount: "582901",
  },
  {
    id: "INV202502",
    name: "Electricity Bill",
    number: "INV202502",
    dueDate: "Feb 04,2025",
    status: "Paid",
    amount: "311909",
  },
  {
    id: "INV202503",
    name: "Gym Membership",
    number: "INV202503",
    dueDate: "Feb 23,2025",
    status: "Unpaid",
    amount: "425000",
  },
  {
    id: "INV202504",
    name: "Phone Bill",
    number: "INV202504",
    dueDate: "Feb 23,2025",
    status: "Pending",
    amount: "148891",
  },
]

export default function MyInvoicesPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    updateQueryParams("search", value)
  }

  const handleStatusChange = (e: { target: { value: string } }) => {
    const value = e.target.value
    setStatus(value)
    updateQueryParams("status", value)
  }

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/my-invoices?${params.toString()}`)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, invoiceId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedInvoice(invoiceId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedInvoice(null)
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false)
    setToastMessage("Invoice deleted successfully")
    setToastOpen(true)
  }

  const handleEditClick = () => {
    handleMenuClose()
    if (selectedInvoice) {
      router.push(`/edit-invoice/${selectedInvoice}`)
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = search
      ? invoice.name.toLowerCase().includes(search.toLowerCase()) ||
        invoice.number.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesStatus = status === "all" ? true : invoice.status === status
    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            My Invoices
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              size="small"
              placeholder="Search invoices"
              value={search}
              onChange={handleSearchChange}
              fullWidth={isMobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="h-5 w-5 text-gray-500" />
                  </InputAdornment>
                ),
              }}
            />
            <Select
              size="small"
              value={status}
              onChange={handleStatusChange}
              fullWidth={isMobile}
              sx={{ minWidth: { sm: 120 } }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </Box>
        </Box>
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: { xs: "calc(100vh - 300px)", sm: "none" } }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{invoice.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {invoice.number}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        size="small"
                        color={
                          invoice.status === "Paid" ? "success" : invoice.status === "Unpaid" ? "error" : "warning"
                        }
                        sx={{
                          backgroundColor:
                            invoice.status === "Paid"
                              ? "rgba(84, 214, 44, 0.16)"
                              : invoice.status === "Unpaid"
                                ? "rgba(255, 72, 66, 0.16)"
                                : "rgba(255, 193, 7, 0.16)",
                          color:
                            invoice.status === "Paid"
                              ? "rgb(34, 154, 22)"
                              : invoice.status === "Unpaid"
                                ? "rgb(183, 33, 54)"
                                : "rgb(183, 129, 3)",
                        }}
                      />
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, invoice.id)}>
                        <MoreVertical className="h-5 w-5" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this invoice? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message={toastMessage} severity="success" />
    </Layout>
  )
}

