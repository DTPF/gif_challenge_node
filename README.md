# DaGif — Backend

REST API for the DaGif social GIF-sharing platform. Handles users, GIF metadata, likes, comments, and integrates with Cloudinary for media storage.

## Features

- RESTful API with Express.js
- User management with Auth0 authentication
- GIF upload and metadata storage
- Like and comment system
- Search and category filtering
- Cloudinary integration for media storage
- MongoDB with Mongoose ODM

## Tech Stack

- **Runtime:** Node.js, Express.js
- **Language:** JavaScript
- **Database:** MongoDB + Mongoose
- **Auth:** Auth0
- **Media:** Cloudinary
- **Security:** Helmet

## Getting Started

1. Clone the repo: `git clone https://github.com/DTPF/dagif-backend-node.git`
2. Install dependencies: `npm install`
3. Copy `.env.development.example` to `.env.development` and configure your environment
4. Make sure MongoDB is running
5. Start the dev server: `npm run dev`

The API runs at `http://localhost:4000`

## Related

- [dagif-frontend-react](https://github.com/DTPF/dagif-frontend-react) — React + TypeScript frontend
