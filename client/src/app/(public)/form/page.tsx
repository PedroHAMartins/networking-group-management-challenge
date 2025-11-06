"use client";

import { useCallback, useEffect, useState } from "react";
import { useHeader, useNotification } from "shared";
import { FormComponent } from "./components/form";
import z from "zod";
import { schema } from "./components/schema";
import {
  CreateUserUseCase,
  makeCreateUserUseCase,
} from "../../../../application/users/createUserUseCase";
import { CreateUserDTO } from "../../../../domain/user/dtos/create-user.dto";
import { useUseCase } from "shared/hooks";

export default function PublicFormPage() {
  const [data, setData] = useState<z.infer<typeof schema> | null>(null);

  const { setHeader, setShowBackButton } = useHeader();
  const { makeNotification } = useNotification();

  useEffect(() => {
    setHeader("Formulário de intenção");
    setShowBackButton(true);
  }, [setHeader, setShowBackButton]);

  const { run: createUser, loading: creating } = useUseCase<
    CreateUserUseCase,
    unknown,
    [CreateUserDTO]
  >(
    () => makeCreateUserUseCase(),
    (uc: CreateUserUseCase, dto: CreateUserDTO) => uc.execute(dto),
    {
      onSuccess: () => {
        setData(null);
        makeNotification({
          title: "Sucesso!",
          description: "Usuário criado com sucesso",
          type: "success",
          duration: 4000,
        });
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro ao criar usuário",
          description: err.message,
          type: "error",
          duration: 5000,
        });
      },
    }
  );

  const handleSubmit = useCallback(
    async (formData: z.infer<typeof schema>) => {
      const dto: CreateUserDTO = {
        email: formData.email,
        password: "password",
        name: formData.name,
        company: formData.company,
        purpose: formData.purpose,
      };
      await createUser(dto);
    },
    [createUser]
  );

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <FormComponent onSubmit={handleSubmit} onChange={setData} data={data} />
      {creating && <div className="fixed bottom-4 left-4">Enviando...</div>}
    </div>
  );
}
