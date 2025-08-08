# Kids Ebooks Store (React + FastAPI)

This repository now contains a fullstack e‑commerce site to sell children’s ebooks with:
- React SPA frontend (Vite + TS + Tailwind + shadcn/ui) using react-router-dom for client-side routing
- FastAPI backend with in-memory store for products and orders
- Secret admin portal to manage products (CRUD, visibility) protected by admin login
- Payoneer payment integration placeholders with webhook endpoint ready (requires your credentials)

Note: Backend uses an in-memory store for now to keep things simple for a first version. Data resets when the server restarts. We can add persistent storage next.

## Repo structure
- backend/ — FastAPI app (Poetry)
- frontend/ — Vite React app

## Prerequisites
- Node 18+ and npm
- Python 3.12 and Poetry

## Setup

### Backend
1) Copy env
cp backend/.env.example backend/.env
Edit ADMIN_EMAIL and ADMIN_PASSWORD. Optionally set ADMIN_SECRET to sign stateless admin tokens (defaults to ADMIN_PASSWORD). Add Payoneer credentials when available.

2) Install deps
cd backend
poetry install

3) Run dev server
poetry run fastapi dev app/main.py
Server runs at http://localhost:8000

### Frontend
1) Copy env
cp frontend/.env.example frontend/.env
Optionally update VITE_API_URL to your deployed backend when available.

2) Install and run
cd frontend
npm install
npm run dev
Open http://localhost:5173

## Admin “secret portal”
- Admin login: /secret-admin/login
- After login, manage products at /secret-admin
- Token stored in localStorage; routes are protected on the client

## API overview (selected)
- POST /auth/login → login as admin
- GET /products → public products
- GET /products/{id} → product detail
- POST /admin/products → create product (admin)
- PUT /admin/products/{id} → update (admin)
- DELETE /admin/products/{id} → delete (admin)
- POST /orders → create pending order
- POST /webhooks/payoneer → webhook to mark order paid and issue download tokens

## Payoneer integration
To enable real payments we need your Payoneer merchant credentials (sandbox first is recommended). Add the following to backend/.env:
- PAYONEER_MERCHANT_ID
- PAYONEER_API_KEY
- PAYONEER_API_SECRET
- PAYONEER_WEBHOOK_SECRET

The backend currently exposes a webhook endpoint and a placeholder checkout step on the frontend. Once you provide credentials and desired Payoneer flow, we will wire the checkout to the real Payoneer checkout and validate webhook signatures.

## Build
Frontend:
npm run build (dist/)

## Notes
- No secrets are committed. Use the provided .env.example files.
- UI is responsive and optimized for a children-friendly theme with a polished favicon and manifest.
