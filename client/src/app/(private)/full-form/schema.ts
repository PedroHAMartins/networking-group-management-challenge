import z from "zod";

export const fullFormSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter no mínimo 3 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  company: z.string().min(3, {
    message: "Nome da empresa deve ter no mínimo 3 caracteres",
  }),
  purpose: z.string().min(1, {
    message: "Finalidade é obrigatória",
  }),
  gender: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  birthdate: z.string().optional(),
});
