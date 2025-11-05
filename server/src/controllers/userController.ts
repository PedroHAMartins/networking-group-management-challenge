import { Request, Response } from "express";
import { UserService } from "../services/userService";

export function makeUserController(service: UserService) {
  return {
    async create(req: Request, res: Response) {
      try {
        const { name, email, password } = req.body;
        const created = await service.createUser({ name, email, password });

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
  };
}
