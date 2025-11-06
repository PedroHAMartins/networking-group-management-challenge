import express from "express";
import { makeVariablesController } from "../controllers/variablesController";
import { Db } from "../db/sqlite";
import { VariablesRepository } from "../repositories";
import { VariablesService } from "../services/variableService";

export function variablesRouter(db: Db) {
  // eslint-disable-next-line no-console
  console.log("[variablesRouter] mounting variables routes");
  const repo = new VariablesRepository(db);
  const service = new VariablesService(repo);
  const controller = makeVariablesController(service);

  const router = express.Router();
  router.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log(`[variablesRouter] ${req.method} ${req.path}`);
    next();
  });
  router.get("/variables/:key", controller.getVariableValue);
  router.post("/variables/valid/:key", controller.isVariableValid);

  return router;
}
