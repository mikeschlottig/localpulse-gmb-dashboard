# LocalPulse

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/localpulse-gmb-dashboard)]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

A full-stack chat application built with Cloudflare Workers, Durable Objects, React, and Tailwind CSS. This demo showcases a production-ready architecture for managing users, chat boards, and messages with persistent storage, indexing, and a modern UI.

## Features

- **Durable Objects for Entities**: One Durable Object per user and chat board with automatic indexing for efficient listing.
- **Real-time Chat**: Send and retrieve messages per chat board with timestamped history.
- **Indexed Listing**: Paginated lists of users and chats with cursor-based navigation.
- **Modern React UI**: Built with Shadcn UI components, Tailwind CSS, and TanStack Query for data fetching.
- **Type-Safe API**: Shared TypeScript types between frontend and worker for end-to-end type safety.
- **Seed Data**: Pre-populated mock users, chats, and messages for instant demo.
- **Error Handling**: Comprehensive client and server-side error reporting.
- **Theme Support**: Light/dark mode with persistent storage.
- **Responsive Design**: Mobile-friendly sidebar and layouts.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Data**: Cloudflare Durable Objects (SQLite-backed)
- **State/Data**: TanStack Query, Zustand, React Hook Form
- **UI/UX**: Lucide React icons, Framer Motion, Sonner toasts
- **Dev Tools**: Bun, ESLint, TypeScript, Wrangler

## Quick Start

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Run locally**:
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or your configured port).

3. **Type generation** (for Workers env):
   ```bash
   bun cf-typegen
   ```

## Local Development

- **Frontend**: `bun dev` – Hot-reloads at `localhost:3000`.
- **Worker**: Automatically proxied via Vite/Cloudflare plugin.
- **API Routes**: Add custom routes in `worker/user-routes.ts`. Core utils in `worker/core-utils.ts` and entities in `worker/entities.ts`.
- **Entities**: Extend `IndexedEntity` for new models (see `worker/entities.ts`).
- **Shared Types**: Edit `shared/types.ts` and `shared/mock-data.ts` for seed data.
- **Linting**: `bun lint`
- **Build**: `bun build`

Changes to `worker/user-routes.ts` hot-reload automatically.

## API Endpoints

All endpoints under `/api/` with JSON responses `{ success: boolean, data?: T, error?: string }`.

- `GET /api/users` – List users (supports `?cursor` & `?limit`)
- `POST /api/users` – Create user `{ name: string }`
- `DELETE /api/users/:id` – Delete user
- `POST /api/users/deleteMany` – Bulk delete `{ ids: string[] }`
- `GET /api/chats` – List chats
- `POST /api/chats` – Create chat `{ title: string }`
- `GET /api/chats/:chatId/messages` – List messages
- `POST /api/chats/:chatId/messages` – Send message `{ userId: string, text: string }`
- Similar delete endpoints for chats.

Use `src/lib/api-client.ts` for frontend calls.

## Deployment

1. **Build assets**:
   ```bash
   bun build
   ```

2. **Deploy to Cloudflare**:
   ```bash
   bun deploy
   ```
   Or use Wrangler CLI: `npx wrangler deploy`.

3. **Configure**:
   - Edit `wrangler.jsonc` for custom bindings/migrations.
   - Set up custom domain via Cloudflare dashboard.

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/localpulse-gmb-dashboard)]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

**One-click deploy** with the button above – includes Workers, Pages, and DO storage.

## Customization

- **New Entities**: Extend `IndexedEntity<S>` in `worker/entities.ts`, add statics (`entityName`, `indexName`, `seedData`), and routes in `user-routes.ts`.
- **UI Components**: Shadcn components in `src/components/ui/`. Add via `npx shadcn-ui@latest add <component>`.
- **Theme**: Customize `tailwind.config.js` and `src/index.css`.
- **Routes**: React Router in `src/main.tsx`.

## Troubleshooting

- **Durable Objects**: Ensure `GlobalDurableObject` binding in `wrangler.jsonc`.
- **Types**: Run `bun cf-typegen` after Worker changes.
- **CORS**: Enabled for `/api/*`.
- **Errors**: Client errors reported to `/api/client-errors`.

## License

MIT – See [LICENSE](LICENSE) for details.