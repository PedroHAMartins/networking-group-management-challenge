"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useHeader, useNotification } from "shared";
import { useUseCase } from "shared/hooks";
import { FormBuilder } from "@/presentation";
import { fullFormFields } from "./form-fields";
import { fullFormSchema } from "./schema";
import z from "zod";
import {
  VerifyUserTokenUseCase,
  makeVerifyUserTokenUseCase,
} from "application/users/verifyUserTokenUseCase";
import {
  UpdateUserUseCase,
  makeUpdateUserUseCase,
} from "application/users/updateUserUseCase";
import type { User } from "domain/user/entities/user.entity";
import type { UpdateUserDTO } from "domain/user/dtos";

export default function FullFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { setHeader, setShowBackButton } = useHeader();
  const { makeNotification } = useNotification();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setHeader("Formulário Completo");
    setShowBackButton(true);
  }, [setHeader, setShowBackButton]);

  const verifyExecute = useCallback(
    (uc: VerifyUserTokenUseCase, token: string) => uc.execute(token),
    []
  );

  const verifyOptions = useMemo(
    () => ({
      onSuccess: (result: User | false) => {
        if (result === false) {
          makeNotification({
            title: "Token inválido",
            description:
              "Você precisa de um token válido para acessar esta página.",
            type: "error",
          });
          router.push("/");
        } else {
          setUser(result);
        }
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro ao verificar token",
          description: err.message,
          type: "error",
        });
        router.push("/");
      },
    }),
    [makeNotification, router]
  );

  const { run: verifyToken, loading: verifying } = useUseCase<
    VerifyUserTokenUseCase,
    User | false,
    [string]
  >(() => makeVerifyUserTokenUseCase(), verifyExecute, verifyOptions);

  useEffect(() => {
    if (!token) {
      makeNotification({
        title: "Token não fornecido",
        description: "Você precisa fornecer um token para acessar esta página.",
        type: "error",
      });
      router.push("/");
      return;
    }
    void verifyToken(token);
  }, [token, verifyToken, makeNotification, router]);

  const updateExecute = useCallback(
    (uc: UpdateUserUseCase, id: string, token: string, dto: UpdateUserDTO) =>
      uc.execute(id, token, dto),
    []
  );

  const updateOptions = useMemo(
    () => ({
      onSuccess: (updated: User) => {
        makeNotification({
          title: "Sucesso!",
          description: "Seus dados foram atualizados com sucesso.",
          type: "success",
        });
        setUser(updated);
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro ao atualizar",
          description: err.message,
          type: "error",
        });
      },
    }),
    [makeNotification]
  );

  const { run: updateUser, loading: updating } = useUseCase<
    UpdateUserUseCase,
    User,
    [string, string, UpdateUserDTO]
  >(() => makeUpdateUserUseCase(), updateExecute, updateOptions);

  const handleSubmit = useCallback(
    async (data: z.infer<typeof fullFormSchema>) => {
      if (!user || !token) return;
      await updateUser(user.id, token, data);
    },
    [user, token, updateUser]
  );

  if (verifying) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Verificando token...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const fieldsWithDefaults = fullFormFields.map((field) => ({
    ...field,
    defaultValue: (user[field.name as keyof User] ||
      field.defaultValue) as string,
  }));

  return (
    <div className="flex justify-center items-center min-h-screen p-4 mt-20">
      <div className="w-full max-w-2xl">
        <FormBuilder
          fields={fieldsWithDefaults}
          formSchema={fullFormSchema}
          onSubmit={handleSubmit}
        />
        {updating && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Atualizando dados...
          </div>
        )}
      </div>
    </div>
  );
}
