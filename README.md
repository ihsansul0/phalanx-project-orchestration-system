# Phalanx // Project Orchestration System

<div align="left">
  <sub>Built with the T3 Stack, engineered for absolute security and high-velocity synchronization.</sub>
</div>

---

**Phalanx** is a real-time, zero-trust multi-tenant B2B SaaS project management platform and issue tracker custom-built for high-performance engineering squads. 

Unlike generic management platforms that burden rendering engines with extensive database joins, Phalanx utilizes a **Direct Tenant Pinning Pattern** to enforce unbreachable data boundaries right at the persistence layer, while streaming active operational telemetry via real-time WebSockets.

---

## 🛠️ System Architecture & Stack

Phalanx leverages a hard-wired, fully type-safe technical architecture:

*   **Framework:** Next.js (App Router) execution layers.
*   **Data Tier:** Neon Serverless PostgreSQL instances mapped through Drizzle ORM.
*   **Authentication & Perimeter Control:** Clerk Enterprise Middleware with transactional webhook state mirroring.
*   **Real-Time Data Matrix:** Pusher WebSocket channel synchronization.
*   **Type Safety Pipeline:** End-to-end tRPC routing procedures.
*   **Interface Layer:** Tailwind CSS engine running an optimized, responsive monospace terminal layout.

---

## 🔒 Zero-Trust Multi-Tenancy (The Security Blueprint)

Phalanx is architected under strict B2B isolation requirements. Every user, workspace node, asset, and task element is securely guarded.

[ Clerk Authentication Gateway ]
│
▼
[ Next.js Edge Middleware ] ──► (Validates Org Tokens)
│
▼
[ tRPC Router Shield ]
│
▼
┌─────────────────────────────────────────┐
│         Drizzle ORM Engine Layer        │
│  (Enforces direct workspaceId matching) │
└─────────────────────────────────────────┘
│
┌────────┴────────┐
▼                 ▼
[ Tenant Alpha ]   [ Tenant Beta ]
(Isolated Node)    (Isolated Node)

Rather than abstracting organization security upstream, `workspaceId` is stamped directly onto every relational data entity (`projects`, `tasks`, and `comments`). Queries filter via atomic conditions, eliminating data leakage vector risks entirely.

### Core Schema Blueprint (`schema.ts`)

*   **`users`**: Synced securely via incoming Clerk cryptographic webhooks.
*   **`workspaces`**: Directly mapped to isolated Clerk Organization structures.
*   **`projects`**: Concrete execution nodes bound to an active tenant workspace frame.
*   **`tasks`**: Workflow entities supporting strict state machines (`TODO`, `IN_PROGRESS`, `DONE`).
*   **`comments`**: Fully cascaded collaboration entries with dual security anchors (`userId` + `workspaceId`).

---

## 📁 Repository Map

saas
├── src
│   ├── app
│   │   ├── (auth)            # Encrypted registration/login loops
│   │   ├── api/webhooks      # Clerk identity sync ingestion pipeline
│   │   ├── api/trpc          # Batch tRPC procedure endpoints
│   │   └── dashboard         # Main responsive runtime viewports
│   ├── components/shared     # Task boards, analytics engines, navigation rails
│   ├── lib/utils.ts          # Core styling & system helper wrappers
│   ├── middleware.ts         # Global edge route interception bouncer
│   └── server
│       ├── api/routers       # Validated CRUD transaction matrices
│       ├── db/schema.ts      # Multi-tenant Postgres schema topologies
│       └── pusher.ts         # Real-time WebSocket emitter pipelines

---

## ⚡ Quickstart Infrastructure Guide

### 1. Initialize Local Environment Variables

Duplicate your configuration sample file or construct a `.env` block at the root directory:

```env
# Database Credentials
DATABASE_URL="postgresql://..."

# Clerk Security Perimeter Tokens
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Pusher Real-Time Communication Bus
NEXT_PUBLIC_PUSHER_APP_KEY="..."
PUSHER_APP_ID="..."
PUSHER_SECRET="..."
PUSHER_CLUSTER="..."

# Clean install execution
pnpm install

# Push local structural schemas to remote Postgres instances
pnpm drizzle-kit push

# Spin up local development runtime environment
pnpm dev

Your system terminal console will initialize natively on localhost:3000.

🎛️ Operational Highlights
Responsive Structural Shell: Fully responsive layouts. Sidebar configurations adapt from fixed desktop viewports into hidden mobile overlays with a touch-hold purge protection matrix.

Optimized Client Fluidity: Input validation catch boundaries intercept structural inputs under 3 characters on both creation and modification operations prior to server processing, logging clean errors to console readouts.

Live Node Synchronicity: KanBan updates utilize instantaneous state transforms via Pusher channels, synchronizing active dashboards across all connected team sessions without layout flashing.