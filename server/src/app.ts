import express from "express";
import cors from "cors";
import { initDb, Db } from "./db/sqlite";
import { userRouter } from "./routes/userRoutes";

export async function createApp() {
  const db = await initDb();
  const app = express();

  // Enable CORS for development. In production, restrict origins accordingly.
  app.use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());

  app.use("/api", userRouter(db as Db));

  app.get("/health", (req, res) => res.json({ ok: true }));

  return { app, db } as { app: express.Express; db: Db };
}
