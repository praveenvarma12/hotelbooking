# Hotel hub (QuickStay-FullStack)

Full-stack hotel booking platform (originally QuickStay) — React frontend, Node/Express backend, MongoDB database, Clerk authentication, Stripe payments, Cloudinary for media.

## Contents
- `client/` — React + Vite frontend
- `server/` — Node.js + Express backend

## Tech stack
- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: Clerk
- Payments: Stripe
- Media: Cloudinary
- Webhook verification: Svix
- Email: Nodemailer

## Quick start (Windows PowerShell)

1. Open the workspace root:

```powershell
cd C:\Users\bhupa\Downloads\hotel\QuickStay-FullStack
```

2. Server setup

```powershell
cd server
npm install
# For production start
npm start
# For development (auto-restart)
npm run server
```

3. Client setup

```powershell
cd ..\client
npm install
npm run dev
```

Open the client URL printed by Vite (default `http://localhost:5173`) and the API on the server (`http://localhost:3000` by default).

## Environment variables
Create a `.env` file in `server/` (do NOT commit this file). Example keys used by the project:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/hotel-booking?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Clerk (authentication)
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# SMTP (Nodemailer)
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=

# Client origin
CLIENT_ORIGIN=http://localhost:5173
```

Also configure a `.env` for the client if needed (see `client/.env`).

## Webhooks
- Stripe and Clerk webhook endpoints require the raw request body to verify signatures. The server registers these routes using `express.raw({ type: 'application/json' })`.
- Make sure the webhook secret values are set and that your local/ngrok public URL is registered in Stripe/Clerk if testing remote webhooks.

## Common issues
- Push blocked by GitHub Push Protection: do NOT commit `.env` or API keys. If you accidentally commit secrets, remove them from history and rotate the keys.
- MongoDB Atlas connections: whitelist your IP or use 0.0.0.0/0 (not recommended) and make sure `MONGODB_URI` is correct.
- If Clerk user data doesn't appear in MongoDB immediately, the server contains a fallback to fetch user details from Clerk and create a user record on first authenticated request.

## Rename / branding
The project was originally named "QuickStay" in some UI strings. If you rename it to "Hotel hub", search the `client/src` files for occurrences of `QuickStay` and update them (some examples already updated in this repo).

## Security & cleanup
- Add `server/.env` to `.gitignore` and create `server/.env.example` with placeholder values for collaborators.
- If a secret was committed, rotate it immediately (Sendinblue/SMTP, Clerk, Stripe, Cloudinary, MongoDB credentials).

## Contribution
1. Fork the repo (or create a branch) and open a PR.
2. Run tests (if added) and follow coding style used in the repo.

## License
This repository does not include a license file. Add one if you plan to open-source the project.

---
If you want, I can also add a `server/.env.example`, update `.gitignore`, and create a short CONTRIBUTING guide. Tell me which you'd like next.
