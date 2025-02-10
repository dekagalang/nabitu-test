# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install dependencies:
```bash
npm install
```

### Setup environment variables:
```bash
cp env.example .env
```

### Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for production:
```bash
npm run build
```

# Project Documentation

## 🛠 Teknologi yang Digunakan

### **Frontend**
- **React & Next.js**
  - **React** dipilih karena arsitektur **berbasis komponen** yang memudahkan pengembangan.
  - **Next.js** digunakan untuk **server-side rendering (SSR)** dan **API routes** bawaan untuk performa dan skalabilitas yang lebih baik.

### **Database**
- **MongoDB**
  - **Struktur berbasis dokumen** memudahkan penyimpanan data invoice yang dinamis.
  - **Skalabilitas tinggi** dan **performa optimal** untuk operasi baca yang banyak.

### **State Management & API Handling**
- **Custom Hooks**
  - Menggunakan **custom hooks** (`useInvoices`, `useInvoiceActions`) untuk **mengelola state & efek samping**.
  - **Mengurangi duplikasi kode** dan meningkatkan **organisasi proyek**.
- **API Structure**
  - Mengikuti **prinsip RESTful**, dengan endpoint terpisah untuk **GET, POST, PUT, DELETE**.
  - API **mudah digunakan** dan **siap untuk integrasi di masa depan**.

### **Code Quality & Maintainability**
- **Constants Management**
  - Folder `constants` menyimpan **status invoice, API routes**, dan nilai tetap lainnya.
  - **Konsistensi kode** lebih terjaga dan memudahkan pemeliharaan.
- **Component Structure**
  - UI dipisah menjadi **komponen reusable** (`Layout`, `Toast`, dll.).
  - **Mempermudah pengelolaan** tampilan dan pengalaman pengguna.
- **TypeScript**
  - Menambahkan **static typing** untuk **mengurangi bug** dan **meningkatkan kualitas kode**.
- **Material-UI (MUI)**
  - Digunakan untuk **komponen UI pre-built** yang bisa disesuaikan.
  - Mempercepat **pengembangan tampilan** yang modern dan responsif.