import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ApproveUserDTO, CreateUserDTO, UpdateUserDTO, User } from "../models";

export function makeUserController(service: UserService) {
  return {
    async create(req: Request, res: Response) {
      try {
        const payload = req.body as CreateUserDTO;
        const created = await service.createUser(payload);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _p, ...rest } = created as any;
        return res.status(201).json(rest);
      } catch (err: any) {
        if (err.message === "Email already in use") {
          return res.status(409).json({ error: err.message });
        }
        return res.status(400).json({ error: err.message || String(err) });
      }
    },
    async approve(req: Request, res: Response) {
      try {
        const payload = req.body as ApproveUserDTO;
        const approved = await service.approveUser(payload);
        return res.status(200).json(approved);
      } catch (err: any) {
        return res.status(400).json({ error: err.message || String(err) });
      }
    },
    async update(req: Request, res: Response) {
      try {
        const id = req.params.id as string;
        const token = req.params.token as string;
        const payload = req.body as UpdateUserDTO;
        const updated = await service.updateUser(id, token, payload);
        return res.status(200).json(updated);
      } catch (err: any) {
        return res.status(400).json({ error: err.message || String(err) });
      }
    },
    async getAllUsers(req: Request, res: Response) {
      try {
        const users = await service.getAllUsers();
        return res.status(200).json(users);
      } catch (err: any) {
        return res.status(400).json({ error: err.message || String(err) });
      }
    },
  };
}
