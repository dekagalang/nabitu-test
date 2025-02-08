"use client"

import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
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
import { MoreVertical, Search } from "lucide-react"
import Layout from "../../components/layout"

const invoices = [
  {
    id: "INV202501",
    name: "Internet Subscription",
    dueDate: "Jan 13,2025",
    status: "Paid",
    amount: "Rp 582.901",
  },
  {
    id: "INV202502",
    name: "Electricity Bill",
    dueDate: "Feb 04,2025",
    status: "Paid",
    amount: "Rp 311.909",
  },
  {
    id: "INV202503",
    name: "Gym Membership",
    dueDate: "Feb 23,2025",
    status: "Unpaid",
    amount: "Rp 425.000",
  },
  {
    id: "INV202504",
    name: "Phone Bill",
    dueDate: "Feb 23,2025",
    status: "Pending",
    amount: "Rp 148.891",
  },
]

export default function MyInvoicesPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
              placeholder="Search"
              fullWidth={isMobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="h-5 w-5 text-gray-500" />
                  </InputAdornment>
                ),
              }}
            />
            <Select size="small" defaultValue="all" fullWidth={isMobile} sx={{ minWidth: { sm: 120 } }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
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
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{invoice.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {invoice.id}
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
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
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
    </Layout>
  )
}

