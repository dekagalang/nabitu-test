"use client";

import type React from "react";
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
} from "@mui/material";
import { MoreVertical, Search, Edit, Trash } from "lucide-react";
import Layout from "../../../components/invoices/layout";
import { useState } from "react";
import { formatCurrency } from "../../../utils/format-currency";
import Toast from "../../../components/invoices/toast";
import { useInvoices } from "../../../hooks/useInvoices";
import { useInvoiceActions } from "../../../hooks/useInvoiceActions";
import {
  INVOICE_FILTER_STATUS,
  INVOICE_STATUS_COLORS,
  type InvoiceFilterStatus,
} from "../../../constants/invoice";

type Status = InvoiceFilterStatus;

export default function MyInvoicesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    invoices,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    deleteInvoice,
    refetchInvoices,
  } = useInvoices();

  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedInvoice,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
  } = useInvoiceActions();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: { target: { value: unknown } }) => {
    setSelectedStatus(e.target.value as Status);
  };

  const handleDeleteConfirm = async () => {
    if (selectedInvoice) {
      const result = await deleteInvoice(selectedInvoice);
      setDeleteDialogOpen(false);
      setToastMessage(result.message);
      setToastSeverity(result.success ? "success" : "error");
      setToastOpen(true);
      if (result.success) {
        refetchInvoices();
      }
    }
  };

  const handleEditClick = () => {
    handleMenuClose();
  };

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
              value={searchQuery}
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
              value={selectedStatus}
              onChange={handleStatusChange}
              fullWidth={isMobile}
              sx={{ minWidth: { sm: 120 } }}
            >
              {Object.entries(INVOICE_FILTER_STATUS).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key === "ALL" ? "All Status" : key}
                </MenuItem>
              ))}{" "}
            </Select>
          </Box>
        </Box>
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer
            sx={{ maxHeight: { xs: "calc(100vh - 300px)", sm: "none" } }}
          >
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice._id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {invoice.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {invoice.number}
                        </Typography>
                      </TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          size="small"
                          color={INVOICE_STATUS_COLORS[invoice.status].chip}
                          sx={{
                            backgroundColor:
                              INVOICE_STATUS_COLORS[invoice.status].background,
                            color: INVOICE_STATUS_COLORS[invoice.status].text,
                          }}
                        />
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, invoice._id)}
                        >
                          <MoreVertical className="h-5 w-5" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this invoice? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </Layout>
  );
}
