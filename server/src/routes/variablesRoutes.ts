import express from "express";
import { makeVariablesController } from "../controllers/variablesController";
import { Db } from "../db/sqlite";
import { VariablesRepository } from "../repositories";
import { VariablesService } from "../services/variableService";

export function variablesRouter(db: Db) {
  const repo = new VariablesRepository(db);
  const service = new VariablesService(repo);
  const controller = makeVariablesController(service);

  const router = express.Router();

  router.get("/variables/:key", controller.getVariableValue);

  return router;
}
