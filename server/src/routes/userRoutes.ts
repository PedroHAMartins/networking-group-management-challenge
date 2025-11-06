import express from "express";
import { makeUserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { Db } from "../db/sqlite";
import { UserRepository } from "../repositories";

export function userRouter(db: Db) {
  const repo = new UserRepository(db);
  const service = new UserService(repo);
  const controller = makeUserController(service);

  const router = express.Router();

  router.post("/users", controller.create);

  router.put("/users/approve/:id", controller.approve);
  router.put("/users/:id", controller.update);

  router.get("/users", controller.getAllUsers);

  return router;
}
