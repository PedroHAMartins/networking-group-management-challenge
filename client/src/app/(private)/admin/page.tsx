"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useHeader, useNotification, useAdminAuth } from "shared";
import { fields, IntentionsTable, schema } from "./components";
import { FormBuilder } from "@/presentation";
import Link from "next/link";
import {
  IsVariableValidUseCase,
  makeIsVariableValidUseCase,
} from "application/variables/isVariableValidUseCase";
import { useUseCase } from "shared/hooks";

export default function AdminPage() {
  const { isAuthenticated, setIsAuthenticated } = useAdminAuth();
  const adminPasswordKey = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_KEY;

  const { setHeader, setShowBackButton, setShowMenu, setMenuItems } =
    useHeader();
  const { makeNotification } = useNotification();

  const menuContent = useMemo(() => {
    return (
      <nav className="flex flex-col gap-2">
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/admin"
          className="px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          Intenções
        </Link>
      </nav>
    );
  }, []);

  useEffect(() => {
    setHeader("Administrativo");
    setShowBackButton(true);
    setShowMenu(true);
    setMenuItems(menuContent);
  }, [setHeader, setShowBackButton, setShowMenu, setMenuItems, menuContent]);

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
          setIsAuthenticated(true);
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
      {!isAuthenticated && (
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
      {isAuthenticated && <IntentionsTable />}
    </div>
  );
}
