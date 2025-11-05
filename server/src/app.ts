import express from "express";
import { initDb, Db } from "./db/sqlite";
import { userRouter } from "./routes/userRoutes";

export async function createApp() {
  const db = await initDb();
  const app = express();

  app.use(express.json());

  // Mount API under /api
  app.use("/api", userRouter(db as Db));

  // Health-check
  app.get("/health", (req, res) => res.json({ ok: true }));

  return { app, db } as { app: express.Express; db: Db };
}
