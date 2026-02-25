# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DaGif backend — a GIF sharing REST API built with Express.js and MongoDB. Users authenticate via Auth0, upload GIFs stored on Cloudinary, and organize them by categories. Live at https://dagif.dtpf.es/.

## Commands

- `npm run dev` — Start dev server with nodemon (NODE_ENV=development, port 4000)
- `npm start` — Start production server (NODE_ENV=production, port 4006)
- `npm install` — Install dependencies

No test framework is configured.

## Environment Setup

Copy `.env.development.example` to `.env.development` and fill in Auth0 and Cloudinary credentials. Required vars: `API_VERSION`, `IP_SERVER`, `PORT_MONGO_DB`, `DB_NAME`, `PORT_SERVER`, `AUTH0_AUDIENCE`, `AUTH0_ISSUER`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Production additionally requires `DB_USER_PASSWORD` and `AUTH0_SECRET`.

## Architecture

**Entry point:** `src/index.js` connects to MongoDB then starts `src/server.js` (Express app with middleware stack: JSON parsing, CORS, Helmet CSP, file upload with 15MB limit).

**Request flow:** Routes (`src/router/`) → Auth middleware (optional, per-route) → Controllers (`src/controllers/`) → Models (`src/models/`) → Response via `makeResponse` utility.

**Three domain entities** with Mongoose schemas in `src/models/`:
- **User** — linked to Auth0 via `userId` (sub claim), has array of Gif refs
- **Gif** — has Cloudinary image, references User and Categories, text index on `name` for search
- **Category** — has gifsCount counter and array of Gif refs; 16 pre-seeded categories

**Relationship integrity** is maintained manually via cascade utilities in `src/utils/dbCascade.js` (`migrateCascadeArray`, `migrateCascadeObject`, `deleteCascadeArray`, `deleteCascadeObject`) — no MongoDB transactions.

**Auth middleware** (`src/middlewares/auth.middleware.js`) validates Auth0 JWT Bearer tokens using `express-oauth2-jwt-bearer`. Applied selectively — read endpoints are public, write endpoints are protected.

**Image handling** (`src/utils/cloudinary.js`) uploads to folder structure `dagif/{environment}/gifImages|categoryImages/` and handles cleanup on delete/update.

**Config** (`src/config/config.js`) switches between dev and prod settings based on `NODE_ENV`.

**API base path:** `/api/v1` with three route groups: user, gif, category.

## Database Seeding

Category seeder exists in `src/db_seeder/` but is commented out in `src/index.js`. It's destructive — clears all existing categories before re-seeding.

## Commit Conventions

Use prefixes: `feat()` for new features, `change()` for improvements, `fix()` for bug fixes.
