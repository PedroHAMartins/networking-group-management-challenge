import { Request, Response } from "express";
import { VariablesService } from "../services/variableService";

export function makeVariablesController(service: VariablesService) {
  return {
    async getVariableValue(req: Request, res: Response) {
      try {
        const key = req.params.key as string;
        const value = await service.getVariableValue(key);
        return res.status(200).json({ value });
      } catch (err: any) {
        return res.status(400).json({ error: err.message || String(err) });
      }
    },
  };
}
