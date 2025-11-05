import { Fields } from "@/presentation/components";
import { schema } from "./schema";
import z from "zod";

export const fields: Fields<z.infer<typeof schema>> = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Digite seu nome",
    type: "text",
    defaultValue: "",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite seu email",
    type: "text",
    defaultValue: "",
  },
  {
    name: "company",
    label: "Empresa",
    placeholder: "Digite o nome da sua empresa",
    type: "text",
    defaultValue: "",
  },
  {
    name: "purpose",
    label: "Finalidade",
    placeholder: "Por que você quer paticipar?",
    type: "text",
    defaultValue: "",
  },
];
