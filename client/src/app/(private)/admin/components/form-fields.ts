import { Fields } from "@/presentation";
import { schema } from "./schema";
import z from "zod";

export const fields: Fields<z.infer<typeof schema>> = [
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite a senha",
    isPassword: true,
  },
];
