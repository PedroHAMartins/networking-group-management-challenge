import { TableComponent } from "@/presentation";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import type { GetAllUsersDto } from "../../../../../domain/user/dtos/get-user.dto";
import { useUseCase } from "shared/hooks";
import {
  GetAllIntentionsUseCase,
  makeGetAllIntentionsUseCase,
} from "application/users/getAllIntentionsUseCase";

export function IntentionsTable() {
  const [open, setOpen] = useState(false);
  const [intentions, setIntentions] = useState<GetAllUsersDto | null>(null);

  const {
    run: fetchUsers,
    loading,
    error,
  } = useUseCase<GetAllIntentionsUseCase, GetAllUsersDto, []>(
    () => makeGetAllIntentionsUseCase(),
    (uc: GetAllIntentionsUseCase) => uc.execute(),
    {
      onSuccess: (data: GetAllUsersDto) => {
        setIntentions(data);
      },
      onError: (err: Error) => {
        console.error("Failed to fetch users:", err);
      },
    }
  );

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleSubmit = (value?: boolean) => {
    console.log("Action submitted:", value);
  };

  return (
    <>
      {loading && <div className="text-center p-4">Carregando...</div>}
      {!loading && (
        <TableComponent
          columns={columns({ open, setOpen, onSubmit: handleSubmit })}
          data={intentions || []}
        />
      )}
    </>
  );
}
