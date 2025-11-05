import z from "zod";

export const schema = z.object({
  name: z.string().min(3, {
    error: "Nome deve ter no mínimo 3 caracteres",
  }),
  email: z.email({
    error: "Email inválido",
  }),
  company: z.string().min(3, {
    error: "Nome da empresa deve ter no mínimo 3 caracteres",
  }),
  purpose: z.string().min(1, {
    error: "Finalidade é obrigatória",
  }),
});
