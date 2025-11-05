import { TableComponent } from "@/presentation";
import { columns } from "./columns";
import { useState } from "react";

const data = [
  {
    name: "João Silva",
    email: "l9PdM@example.com",
    company: "Empresa A",
    purpose: "Networking",
  },
  {
    name: "Maria Souza",
    email: "4QKlO@example.com",
    company: "Empresa B",
    purpose: "Parcerias",
  },
  {
    name: "Carlos Pereira",
    email: "o0I1o@example.com",
    company: "Empresa C",
    purpose: "Colaboração",
  },
  {
    name: "Ana Santos",
    email: "5H0rB@example.com",
    company: "Empresa D",
    purpose: "Consultoria",
  },
];

export function IntentionsTable() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (value?: boolean) => {
    console.log("Action submitted:", value);
  };

  return (
    <TableComponent
      columns={columns({ open, setOpen, onSubmit: handleSubmit })}
      data={data}
    />
  );
}
