import { TableComponent } from "@/presentation";
import { columns } from "./columns";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GetAllUsersDto } from "../../../../../domain/user/dtos/get-user.dto";
import { useUseCase } from "shared/hooks";
import {
  GetAllIntentionsUseCase,
  makeGetAllIntentionsUseCase,
} from "application/users/getAllIntentionsUseCase";
import {
  ApproveUserUseCase,
  makeApproveUserUseCase,
} from "application/users/approveUserUseCase";
import type { GetUserDto } from "../../../../../domain/user/dtos/get-user.dto";
import { useNotification } from "shared";

export function IntentionsTable() {
  const [open, setOpen] = useState(false);
  const [intentions, setIntentions] = useState<GetAllUsersDto | null>(null);

  const { makeNotification } = useNotification();

  const fetchExecute = useCallback(
    (uc: GetAllIntentionsUseCase) => uc.execute(),
    []
  );

  const fetchOptions = useMemo(
    () => ({
      onSuccess: (data: GetAllUsersDto) => {
        setIntentions(data);
      },
      onError: (err: Error) => {
        console.error("Failed to fetch users:", err);
      },
    }),
    [setIntentions]
  );

  const { run: fetchUsers, loading } = useUseCase<
    GetAllIntentionsUseCase,
    GetAllUsersDto,
    []
  >(() => makeGetAllIntentionsUseCase(), fetchExecute, fetchOptions);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const approveExecute = useCallback(
    (uc: ApproveUserUseCase, id: string, approved: boolean) =>
      uc.execute(id, approved),
    []
  );

  const approveOptions = useMemo(
    () => ({
      onSuccess: (updated: GetUserDto) => {
        fetchUsers();
        makeNotification({
          title: "Aprovação de usuário",
          description: `Usuário ${updated.name} foi ${
            updated.admitted ? "aprovado" : "rejeitado"
          }.`,
          type: "success",
        });
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro ao aprovar usuário",
          description: err.message,
          type: "error",
        });
      },
    }),
    [fetchUsers, makeNotification]
  );

  const { run: approveUser, loading: approving } = useUseCase<
    ApproveUserUseCase,
    GetUserDto,
    [string, boolean]
  >(() => makeApproveUserUseCase(), approveExecute, approveOptions);

  const handleSubmit = useCallback(
    (approved: boolean, row?: GetUserDto) => {
      if (!row?.id) return;
      void approveUser(row.id, approved);
    },
    [approveUser]
  );

  return (
    <>
      {loading && <div className="text-center p-4">Carregando...</div>}
      {!loading && (
        <TableComponent
          columns={columns({ open, setOpen, onSubmit: handleSubmit })}
          data={intentions || []}
        />
      )}
      {approving && (
        <div className="text-center p-2 text-sm text-muted-foreground">
          Processando aprovação...
        </div>
      )}
    </>
  );
}
