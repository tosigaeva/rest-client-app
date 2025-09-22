# Project Description

**RestCafé** — a lightweight version of Postman, built as a full-stack Next.js (App Router) application using TypeScript and React 18+.  
The goal of the project is to provide a convenient tool for testing and debugging REST APIs with authentication, request history, variable management, and request code generation features.

---

## Key Ideas and Motivation

- Deliver a simple and fast REST client available in the browser, oriented toward team collaboration.
- Support any open REST API without building a custom backend: requests are proxied via Next.js server routes to avoid CORS issues.
- Store request history and analytics per user (via Supabase) and provide a convenient interface for replaying past requests.
- Ensure basic security (authentication/authorization), private routes, and enable teamwork within a small team.

---

## Target Audience

- Frontend developers and testers who need a lightweight REST client as part of their toolkit.
- Student teams in development courses where architecture, testing, and teamwork are required.

---

## Core Features

- **Private REST client page**:
  - HTTP method selector (GET, POST, PUT, DELETE, etc.),
  - URL input (encoded/decoded in the route),
  - request body editor (JSON / plain text) with prettify,
  - headers editor,
  - response section (HTTP status, body in read-only, size, latency),
  - auto-generated code section (curl, Fetch API, XHR, Node.js, Python, Java, C#, Go, etc.).
- **Variables**:
  - stored in `localStorage`,
  - injected into URL / headers / body via `{{varName}}`,
  - loaded after successful login.
- **History & Analytics**:
  - server-side rendered section (data aggregated and served from the server),
  - stored in Supabase: timestamp, method, endpoint, status, latency, request/response size, error details,
  - each entry is a link restoring the request in the REST client.
- **Authentication/Authorization**:
  - Sign In / Sign Up (email/password) via Supabase Auth,
  - private routes with redirects for unauthorized users,
  - client-side password validation (min 8 characters, at least one letter, one number, one special character; Unicode supported).
- **UX/UI requirements**:
  - responsive design, unified styling, max 3 fonts, readable contrast, min font size 14px,
  - animated sticky header,
  - user-friendly error display (toast / modal),
  - i18n: at least 2 languages (language toggle in header).
- **Technical guarantees**:
  - TypeScript + React 18+,
  - lazy loading for heavy sections: REST client, Variables, History,
  - tests with ≥ 80% coverage (`npm run test`),
  - lint & format commands, Husky hooks (pre-commit — lint, pre-push — test).

---

## Why Next.js (App Router)

- App Router provides server-side routes and rendering, which is useful for:
  - proxying requests to external APIs (bypassing CORS) and logging analytics to Supabase,
  - server-rendering aggregated history/analytics before sending to the client.
- Built-in TypeScript support, lazy loading, and API routes simplify the app’s architecture.

---

## Architecture (Overview)

- **Frontend (Next.js App Router)** — routes:  
  `/` (Main), `/auth` (Sign In/Up), `/rest/[method]/[encodedUrl]/[encodedBody]?headers=...` (REST client), `/variables`, `/history`.
- **Server functions (Next API / server actions)** — proxy external API calls, log request history in Supabase.
- **Database / Auth** — Supabase (Auth + Postgres) for storing history/analytics and user data.
- **Variables storage** — browser `localStorage` (synced after login).
- **Testing** — unit/integration tests with Jest + Testing Library, coverage report integrated into CI.

---

## Deployment

https://rest-client-app-wts9.vercel.app/

---

# Getting Started

Follow the steps below to set up and run the **RestCafé** locally.

---

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- Git
- Firebase registration

---

## Installation

1. **Clone the repository:**:

   git clone https://github.com/HasanDense/rest-client-app.git
   cd rest-client-app

2. **Create your own .env file:**
   Use the `.env.example` file as a template.
   Set the environment variables to the values obtained during Firebase registration.

3. **Install dependencies:**:
   npm install
   or, if you prefer yarn:
   yarn install

4. **Run the Application:**:
   npm run dev
   or  
    yarn dev

5. **Open localhost:**:
   Open http://localhost:3000 in your browser.

## Available Scripts

npm run dev – start development server

npm run build – create production build

npm run start – run production server locally

npm run lint:fix – check code with ESLint with auto-fix

npm run format – auto-format code

npm run test:coverage – run all tests with coverage report

# Developers

Information about the developers and their roles in the project can be found on the **About** page of the application.
For any questions, you can reach out to any member of the development team via Discord.
