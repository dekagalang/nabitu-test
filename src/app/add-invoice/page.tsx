"use client";

import type React from "react";
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
} from "@mui/material";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../components/toast";
import {
  invoiceSchema,
  type InvoiceFormData,
} from "../../schemas/invoice-schema";
import { ZodError } from "zod";

type FormErrors = Partial<Record<keyof InvoiceFormData, string>>;

export default function AddInvoicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<InvoiceFormData>({
    name: "",
    number: "",
    dueDate: "",
    amount: "",
    status: "Pending",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastOpen, setToastOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const newNumber = generateInvoiceNumber();
    setFormData((prev) => ({
      ...prev,
      number: newNumber,
    }));
    if (errors.number) {
      setErrors((prev) => ({
        ...prev,
        number: undefined,
      }));
    }
  }, [errors.number]);

  const validateForm = () => {
    try {
      invoiceSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof InvoiceFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to add invoice");
        }

        setToastOpen(true);
        setTimeout(() => {
          setToastOpen(false);
          router.push("/my-invoices");
        }, 2000);
      } catch (error) {
        console.error("Error adding invoice:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange =
    (field: keyof InvoiceFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const value = e.target.value;
      setFormData({
        ...formData,
        [field]: value,
      });
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: undefined,
        });
      }
    };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    return `INV${year}${month}${random}`;
  };

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
            <form onSubmit={handleSubmit} noValidate>
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
                    placeholder="INV000000"
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => {
                            const newNumber = generateInvoiceNumber();
                            setFormData((prev) => ({
                              ...prev,
                              number: newNumber,
                            }));
                            if (errors.number) {
                              setErrors((prev) => ({
                                ...prev,
                                number: undefined,
                              }));
                            }
                          }}
                          size="small"
                        >
                          Generate
                        </Button>
                      ),
                    }}
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
                    placeholder="Enter amount in Rupiah"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
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
                    onChange={(e) =>
                      handleChange("status")(
                        e as React.ChangeEvent<{ value: string }>
                      )
                    }
                  >
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                  {errors.status && (
                    <FormHelperText>{errors.status}</FormHelperText>
                  )}
                </FormControl>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 200 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "+ Add Invoice"}
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
  );
}
