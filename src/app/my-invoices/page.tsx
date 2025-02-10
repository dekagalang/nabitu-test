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
import Layout from "../../components/layout";
import { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "../../utils/format-currency";
import Toast from "../../components/toast";

type Status = "all" | "Paid" | "Unpaid" | "Pending";

interface Invoice {
  _id: string;
  name: string;
  number: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Pending";
  amount: string;
}

export default function MyInvoicesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Status>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/invoices?search=${searchQuery}&status=${selectedStatus}`
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: { target: { value: unknown } }) => {
    setSelectedStatus(e.target.value as Status);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    invoiceId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoiceId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedInvoice) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/invoices/${selectedInvoice}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete invoice");
        }

        setInvoices(
          invoices.filter((invoice) => invoice._id !== selectedInvoice)
        );
        setDeleteDialogOpen(false);
        setToastMessage("Invoice deleted successfully");
        setToastOpen(true);
      } catch (error) {
        console.error("Error deleting invoice:", error);
        setToastMessage("Failed to delete invoice");
        setToastOpen(true);
      } finally {
        setIsLoading(false);
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
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
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
                          color={
                            invoice.status === "Paid"
                              ? "success"
                              : invoice.status === "Unpaid"
                              ? "error"
                              : "warning"
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
        severity="success"
      />
    </Layout>
  );
}
