"use client";

import { useCallback, useEffect, useState } from "react";
import { useHeader, useNotification } from "shared";
import { fields, IntentionsTable, schema } from "./components";
import { FormBuilder } from "@/presentation";
import {
  IsVariableValidUseCase,
  makeIsVariableValidUseCase,
} from "application/variables/isVariableValidUseCase";
import { useUseCase } from "shared/hooks";

export default function AdminPage() {
  const [visible, setVisible] = useState(false);
  const adminPasswordKey = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_KEY;

  const { setHeader, setShowBackButton } = useHeader();
  const { makeNotification } = useNotification();

  useEffect(() => {
    setHeader("Administrativo");
    setShowBackButton(true);
  }, [setHeader, setShowBackButton]);

  const { run: validate, loading } = useUseCase<
    IsVariableValidUseCase,
    boolean,
    [string, string]
  >(
    () => makeIsVariableValidUseCase(),
    (uc: IsVariableValidUseCase, key: string, value: string) =>
      uc.execute(key, value),
    {
      onSuccess: (isValid: boolean) => {
        if (isValid) {
          setVisible(true);
          makeNotification({
            title: "Sucesso!",
            description: "Login realizado com sucesso",
            type: "success",
            duration: 3000,
          });
        } else {
          makeNotification({
            title: "Erro",
            description: "Senha incorreta",
            type: "error",
            duration: 3000,
          });
        }
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro",
          description: err.message,
          type: "error",
          duration: 5000,
        });
      },
    }
  );

  const handleSubmit = useCallback(
    (data: { password: string }) => {
      if (!adminPasswordKey) {
        makeNotification({
          title: "Erro de configuração",
          description: "Admin password key not configured",
          type: "error",
        });
        return;
      }
      void validate(adminPasswordKey, data.password);
    },
    [adminPasswordKey, validate, makeNotification]
  );

  return (
    <div className="flex justify-center items-center">
      {!visible && (
        <div className="w-screen h-[calc(100dvh-100px)] flex flex-col justify-center items-center">
          <FormBuilder
            fields={fields}
            formSchema={schema}
            onSubmit={handleSubmit}
            className="w-[20%]"
          />
          {loading && (
            <div className="text-sm text-muted-foreground mt-2">
              Validando...
            </div>
          )}
        </div>
      )}
      {visible && <IntentionsTable />}
    </div>
  );
}
