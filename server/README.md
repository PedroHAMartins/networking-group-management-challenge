# Server (backend) - MVC base

This folder contains a small MVC-style backend using Express and SQLite (TypeScript).

What was added
- SQLite DB initializer (`src/db/sqlite.ts`)
- `models`, `repositories`, `services`, `controllers`, `routes` for `users`
- A POST /api/users route that creates a user (stored in `database.sqlite`)
- `server.ts` entrypoint and `tsconfig.json`

Quick start
1. cd into the `server` folder
2. Install dependencies: `npm install`
3. Run in dev mode (requires dev dependencies): `npm run dev`

Notes
- The code is TypeScript; we used `sqlite` + `sqlite3` driver. If you prefer plain JS just transpile or rewrite files to `.js`.
- Passwords are stored as plain text for this starter example. Add hashing (bcrypt) before using in production.
