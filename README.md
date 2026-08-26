# 🛍️ Shoply — Modern E-Commerce Platform

> **Shop Smarter, Live Better.** A full-stack e-commerce platform built with Next.js and Node.js, featuring multi-role authentication, product management, wishlists, reviews, and seller dashboards.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

---

## Overview

**Shoply** is a production-ready, full-stack e-commerce application. Buyers can browse products by category, save favorites to a wishlist, leave reviews, and manage their profile from a personal dashboard. Sellers can list their own products, track inventory, and manage their store — all within a clean, responsive UI.

The project is built with a clean separation of concerns: a **Next.js 15** client app and an **Express.js** REST API server backed by **PostgreSQL** via **Prisma ORM**, with **Supabase** used as the hosted database platform.

---

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| 🌐 Client (Frontend) | **https://shoply-eur2.vercel.app/** |
| 🔗 Server (API) | **https://shoply-murex.vercel.app/**|

---

## ✨ Features

### 🛒 Shopper Features
- Browse all products across multiple categories
- Filter and explore products by category
- View detailed product information (price, stock, seller, description)
- Add/remove products from a personal **Wishlist**
- Write and view **Product Reviews** with star ratings
- See real customer testimonials on the homepage
- Responsive design optimized for mobile and desktop

### 🏪 Seller Features
- Role-based **Seller Dashboard**
- Add new products with title, description, price, stock, image, and category
- View and manage all personally listed products
- Update or delete product listings
- Image hosting via **ImgBB**

### 👤 User Dashboard
- Personalized dashboard with profile management
- View booking/order history
- Manage wishlist items

### 🔐 Authentication & Security
- Email & password registration and login
- Password hashing with **bcrypt**
- **JWT-based** authentication
- Role-based access control (`User`, `Seller`, `Admin`)
- Auth context managed globally with React Context API
- Protected routes on the client side

---

## 🧰 Tech Stack

### Frontend (`/client`)

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| [ImgBB API](https://api.imgbb.com/) | Image upload hosting |
| Geist Font | Modern typography (Next.js native) |

### Backend (`/server`)


| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Prisma ORM](https://www.prisma.io/) | Database ORM |
| PostgreSQL | Relational SQL database |
| Supabase | Hosted PostgreSQL database platform |
| bcrypt | Password hashing |
| CORS | Cross-origin resource sharing |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| Git & GitHub | Version control |
| Vercel | Client deployment |
| Supabase | Cloud PostgreSQL database |
---

## 📁 Project Structure

```
Shoply/
├── client/                         # Next.js frontend
│   ├── src/
│   │   ├── app/                    # App Router pages
│   │   │   ├── page.tsx            # Homepage (Hero, Categories, Products, Reviews)
│   │   │   ├── layout.tsx          # Root layout (Navbar, Footer, AuthProvider)
│   │   │   ├── products/           # Product listing & detail pages
│   │   │   ├── categories/         # Browse by category
│   │   │   ├── wishlist/           # Saved wishlist page
│   │   │   ├── dashboard/
│   │   │   │   ├── user/           # User dashboard (profile, history)
│   │   │   │   ├── seller/         # Seller dashboard (add/manage products)
│   │   │   │   └── admin/          # Admin panel
│   │   │   ├── login/              # Login page
│   │   │   ├── register/           # Registration page
│   │   │   ├── about/              # About page
│   │   │   ├── contact/            # Contact page
│   │   │   └── services/           # Services page
│   │   ├── component/
│   │   │   ├── shared/             # Navbar, Footer, ProductCard
│   │   │   ├── homepage/           # Homepage sections
│   │   │   └── dashboard/          # Dashboard-specific components
│   │   └── lib/
│   │       ├── api.ts              # All API call functions & TypeScript interfaces
│   │       ├── AuthContext.tsx     # Global authentication context
│   │       └── imageUpload.ts      # ImgBB image upload utility
│   └── .env                        # Client environment variables
│
├── server/                         # Express.js backend
│   ├── src/
│   │   ├── app.ts                  # Express app setup (CORS, middleware, routing)
│   │   ├── server.ts               # HTTP server entry point
│   │   ├── routes/
│   │   │   └── index.ts            # Central route registration
│   │   ├── services/               # Feature-based route handlers
│   │   │   ├── products.ts         # Product CRUD
│   │   │   ├── categories.ts       # Category management
│   │   │   ├── users.ts            # Auth (register/login/list)
│   │   │   ├── reviews.ts          # Product reviews CRUD
│   │   │   ├── wishlists.ts        # Wishlist management
│   │   │   └── auth/               # Auth helpers (hashing, JWT)
│   │   └── lib/
│   │       └── prisma.ts           # Prisma client singleton
│
└── README.md
```

---

## 🔌 API Endpoints

### Auth (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and get user data |
| `GET` | `/auth` | Get all users |

### Products (`/api/products`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

### Categories (`/api/categories`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | Get all categories |
| `POST` | `/api/categories` | Create a new category |

### Reviews (`/api/reviews`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/reviews` | Get all reviews |
| `GET` | `/api/reviews/:id` | Get a single review |
| `POST` | `/api/reviews` | Submit a review |
| `PUT` | `/api/reviews/:id` | Update a review |
| `DELETE` | `/api/reviews/:id` | Delete a review |

### Wishlists (`/api/wishlists`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlists/user/:userId` | Get wishlist by user |
| `POST` | `/api/wishlists` | Add item to wishlist |
| `DELETE` | `/api/wishlists/:id` | Remove item from wishlist |

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Supabase](https://supabase.com/) account
- [ImgBB API Key](https://api.imgbb.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shoply.git
cd shoply
```

### 2. Setup the Server

```bash
cd server
npm install
```


Run Prisma and start the server:

```bash
npx prisma generate
npm run dev
```

> Server runs at `http://localhost:5000`

### 3. Setup the Client

```bash
cd ../client
npm install
```

Create a `.env` file in `/client`:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

Start the dev server:

```bash
npm run dev
```

> Client runs at `http://localhost:3000`

---

## 🔐 Environment Variables

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SERVER_URL` | Base URL for the Express API |
| `NEXT_PUBLIC_IMGBB_KEY` | ImgBB API key for image uploads |

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MongoDB connection string (Prisma) |
| `PORT` | Port to run the Express server |
| `JWT_SECRET` | Secret key for signing JWT tokens |

---

## 👨‍💻 Author

Built with ❤️ as part of the **Programming Explore** Prisma Project 2.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
