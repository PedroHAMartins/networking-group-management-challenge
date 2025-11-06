import z from "zod";

export const schema = z.object({
  password: z.string().min(1, {
    error: "Senha é obrigatória",
  }),
});
