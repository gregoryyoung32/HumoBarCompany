[README (1).md](https://github.com/user-attachments/files/29359910/README.1.md)
# Humo Bar Co. — Website

A complete, production-ready website for Humo Bar Co., an event bartending company in Austin, TX. Built with plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies.

## 📁 Project Structure

```
humo-bar-co/
├── index.html          ← Main HTML file (all pages/views live here)
├── css/
│   └── styles.css      ← All styling
├── js/
│   └── app.js          ← All site logic (nav, forms, calculator, admin portal)
├── images/
│   └── README.txt       ← Currently unused — site uses no raster images
├── vercel.json          ← Vercel routing config
└── README.md            ← This file
```

## ✨ What's Included

- **Public marketing site** — hero, packages (Classic/Elevated/Premium), small bites menu, process, policies, "why us" section, and a working inquiry form
- **Payments tab** — client-facing deposit & balance payment screen (Stripe Payment Links integration)
- **Admin tab** — a full password-protected back-office portal with:
  - Dashboard with live KPIs
  - Inquiry inbox (every form submission lands here)
  - Quote calculator with automatic profit-margin guardrails (35% minimum)
  - Payments overview
  - Analytics (page views + inquiries, daily/weekly/monthly)
  - Site adjustments (Stripe links, pricing, policy text)
  - Admin user management
  - Settings

All client-side data (inquiries, page views, quote count, admin users, Stripe links) is stored in the browser's `localStorage`. There is no backend/database — this is intentional for a zero-cost, zero-maintenance static site. See **"Important Limitations"** below.

## 🚀 Deploy to Vercel

### Option 1 — Deploy via Vercel website (easiest, no terminal needed)

1. Go to **[vercel.com](https://vercel.com)** and sign up / log in (GitHub login is fastest)
2. Click **"Add New..." → "Project"**
3. Choose **"Deploy without Git"** or drag-and-drop this entire `humo-bar-co` folder onto the upload area
4. Vercel auto-detects it as a static site — leave all build settings blank/default
5. Click **Deploy**
6. You'll get a live URL like `humo-bar-co.vercel.app` within seconds

### Option 2 — Deploy via Vercel CLI

```bash
npm install -g vercel
cd humo-bar-co
vercel
```

Follow the prompts (link to your Vercel account, accept defaults). Run `vercel --prod` to push to your production URL.

### Option 3 — Deploy via GitHub (best for ongoing updates)

1. Push this folder to a new GitHub repository
2. In Vercel, click **"Add New..." → "Project"** → **"Import Git Repository"**
3. Select your repo → Deploy
4. Every future `git push` automatically redeploys the live site

## 🌐 Custom Domain

Once deployed, go to your project in the Vercel dashboard → **Settings → Domains** → add your domain (e.g. `humobarco.com`) and follow Vercel's DNS instructions. Free SSL is automatic.

## 🔐 Admin Portal Access

The admin portal is accessible from the **"Admin"** tab in the site navigation.

- **Username:** `gregory_young32@yahoo.com`
- **Password:** `Geypoint3225$`

**To change these credentials:** open `js/app.js`, find these two lines near the top, and edit them:

```js
var AV_USER = 'gregory_young32@yahoo.com';
var AV_PASS = 'Geypoint3225$';
```

Save the file and redeploy. There is no way to change the password through the UI — it must be edited directly in this file for security (it's not stored in a database).

## 💳 Connecting Stripe for Payments

The Payments tab and the deposit/balance buttons need real Stripe Payment Links to actually process money. Right now they point to placeholder URLs.

1. Go to **[dashboard.stripe.com](https://dashboard.stripe.com)** and create a free account
2. Complete identity verification (~5 minutes)
3. Go to **Payment Links → + Create** and make two links:
   - One for **"Event Deposit"**
   - One for **"Remaining Balance"**
4. Copy each Payment Link URL
5. Log into the **Admin portal** on your live site → **Site Adjustments** → paste both links into the **Stripe Payment Links** fields → **Save & Activate Links**

That's it — no code edit needed for this part. The links are saved in the browser's localStorage and the payment buttons immediately start using them.

> **Note:** Because links are saved in `localStorage`, they are saved per-browser. If you want them to work everywhere by default (i.e. hardcoded so every visitor's payment button works without you logging in first), you can also hardcode them directly in `js/app.js`:
>
> ```js
> var link = saved || 'https://buy.stripe.com/YOUR_ACTUAL_LINK_HERE';
> ```
>
> Replace `YOUR_DEPOSIT_LINK_HERE` and `YOUR_BALANCE_LINK_HERE` (search for them in `js/app.js`) with your real Stripe links, then redeploy.

## ⚠️ Important Limitations (Read Before Going Live)

This is a **static site** with no backend server or database. That keeps it free to host and simple to deploy, but it means:

1. **Inquiries are stored in the browser, not a shared database.** If a client submits the inquiry form, that data is saved to *their own browser's* localStorage — not to a central place you can see from your own computer. **As currently built, you will not actually receive client inquiries on your end.**
2. **Page view and analytics data** are also per-browser, not site-wide.
3. **Admin users you "add"** are saved to whichever browser you added them from.

### To make inquiries actually reach you, you have two realistic options:

**Option A — Add a form backend service (fastest, no code):**
Use a service like [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), or [Basin](https://usebasin.com). They give you an endpoint URL — update the inquiry form's submit handler in `js/app.js` to POST to that URL instead of (or in addition to) localStorage. Free tiers handle hundreds of submissions/month and email you instantly.

**Option B — Add a real backend (more work, full control):**
Stand up a small backend (Node/Express, or Vercel Serverless Functions) with a database (Supabase, Firebase, or Postgres) and point the form's fetch call at it. This also lets the admin portal show real, shared data instead of per-browser localStorage.

If you'd like, this can be built out as a next step — just ask.

## 🛠 Local Development

No build tools required. To preview locally:

```bash
cd humo-bar-co
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser (some features like `localStorage` will still work fine via `file://`).

## 📋 Quick Reference — Where Things Live in the Code

| Feature | File | Notes |
|---|---|---|
| Page sections / structure | `index.html` | All HTML markup |
| Colors, fonts, layout | `css/styles.css` | Edit colors via CSS custom properties at the top |
| Nav, view switching | `js/app.js` → `showView()` | Controls Home / Payments / Admin tabs |
| Inquiry form logic | `js/app.js` → `handleSubmit()` | Saves to localStorage |
| Quote calculator | `js/app.js` → `avRunCalc()` | Pricing logic + margin guardrails |
| Admin credentials | `js/app.js` → top of file | `AV_USER` / `AV_PASS` |
| Stripe links | `js/app.js` → `handleDeposit()` / `handleBalance()` | Placeholder URLs to replace |

---

Built for Humo Bar Co. — Austin, TX.
