"use client";

import { Button, OTP, Separator, Typography } from "@/presentation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useHeader, useNotification } from "shared";
import { useUseCase } from "shared/hooks";
import {
  VerifyUserTokenUseCase,
  makeVerifyUserTokenUseCase,
} from "application/users/verifyUserTokenUseCase";
import type { User } from "domain/user/entities/user.entity";

export default function Home() {
  const { setHeader } = useHeader();
  const { makeNotification } = useNotification();
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setHeader("Página inicial");
  }, [setHeader]);

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
            description: "O token informado não foi encontrado ou é inválido.",
            type: "error",
          });
        } else {
          makeNotification({
            title: "Token válido!",
            description: `Redirecionando para o formulário completo...`,
            type: "success",
          });
          router.push(`/full-form?token=${token}`);
        }
      },
      onError: (err: Error) => {
        makeNotification({
          title: "Erro ao verificar token",
          description: err.message,
          type: "error",
        });
      },
    }),
    [makeNotification, router, token]
  );

  const { run: verifyToken, loading } = useUseCase<
    VerifyUserTokenUseCase,
    User | false,
    [string]
  >(() => makeVerifyUserTokenUseCase(), verifyExecute, verifyOptions);

  const handleSubmit = useCallback(() => {
    if (!token || token.length < 6) {
      makeNotification({
        title: "Token incompleto",
        description: "Por favor, insira os 6 dígitos do token.",
        type: "error",
      });
      return;
    }
    void verifyToken(token);
  }, [token, verifyToken, makeNotification]);

  return (
    <div className="flex flex-col bg-red-5000 min-h-screen justify-center items-center">
      <div className="flex gap-16 justify-center items-center">
        <div>
          <Button
            variant="ghost"
            className="flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft />
            <a href="/admin">Área administrativa</a>
          </Button>
        </div>
        <div>
          <Separator
            orientation="vertical"
            decorative
            className="bg-gray-100 w-1px h-56!"
          />
        </div>
        <div>
          <Button
            variant="ghost"
            className="flex items-center justify-center cursor-pointer"
          >
            <a href="/form">Formulário de intenção</a>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <Typography
          type="p"
          weight="semibold"
          className="text-center mt-20"
          variant="subtitle"
        >
          Foi aprovado? Insira seu token abaixo!
        </Typography>
        <OTP length={6} value={token} onChange={setToken} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Verificando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
