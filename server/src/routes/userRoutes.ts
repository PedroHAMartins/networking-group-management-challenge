import express from "express";
import { makeUserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { Db } from "../db/sqlite";

export function userRouter(db: Db) {
  const repo = new UserRepository(db);
  const service = new UserService(repo);
  const controller = makeUserController(service);

  const router = express.Router();

  router.post("/users", controller.create);

  return router;
}
