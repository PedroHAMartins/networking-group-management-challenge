import { Column, Button, Modal } from "@/presentation";
import type { GetUserDto } from "../../../../../domain/user/dtos/get-user.dto";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (approved: boolean, row?: GetUserDto) => void;
}

export function columns({
  open,
  setOpen,
  onSubmit,
}: Props): Column<GetUserDto>[] {
  return [
    {
      key: "name",
      header: "Nome do solicitante",
    },
    {
      key: "email",
      header: "Email do solicitante",
    },
    {
      key: "company",
      header: "Empresa",
    },
    {
      key: "purpose",
      header: "Finalidade",
      render: (row) => (
        <Modal
          title="Finalidade da solicitação"
          description={String(row?.purpose ?? "")}
          triggerText="Ver mais"
          closeText="Fechar"
          onClose={() => setOpen(false)}
          isOpen={open}
        />
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <>
          <Button
            className="bg-green-400 hover:bg-green-500 cursor-pointer mr-2"
            size="sm"
            onClick={() => onSubmit(true, row)}
          >
            Aceitar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="hover:bg-red-700 cursor-pointer"
            onClick={() => onSubmit(false, row)}
          >
            Rejeitar
          </Button>
        </>
      ),
    },
  ];
}
