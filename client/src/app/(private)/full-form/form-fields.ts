import { Fields } from "@/presentation/components";
import { fullFormSchema } from "./schema";
import z from "zod";

export const fullFormFields: Fields<z.infer<typeof fullFormSchema>> = [
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
    placeholder: "Por que você quer participar?",
    type: "text",
    defaultValue: "",
  },
  {
    name: "gender",
    label: "Gênero",
    placeholder: "Selecione seu gênero",
    type: "select",
    defaultValue: "",
    options: [
      { value: "male", label: "Masculino" },
      { value: "female", label: "Feminino" },
      { value: "other", label: "Outro" },
      { value: "prefer_not_to_say", label: "Prefiro não informar" },
    ],
  },
  {
    name: "city",
    label: "Cidade",
    placeholder: "Digite sua cidade",
    type: "text",
    defaultValue: "",
  },
  {
    name: "state",
    label: "Estado",
    placeholder: "Digite seu estado",
    type: "text",
    defaultValue: "",
  },
  {
    name: "country",
    label: "País",
    placeholder: "Digite seu país",
    type: "text",
    defaultValue: "",
  },
  {
    name: "birthdate",
    label: "Data de Nascimento",
    placeholder: "yyyy-mm-dd",
    type: "text",
    defaultValue: "",
  },
];
