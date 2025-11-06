"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHeader } from "shared";
import { FormComponent } from "./components/form";
import z from "zod";
import { schema } from "./components/schema";
import { makeCreateUserUseCase } from "../../../../application/users/createUserUseCase";
import { CreateUserDTO } from "../../../../domain/user/dtos/create-user.dto";
import { Typography } from "@/presentation";

export default function PublicFormPage() {
  const [data, setData] = useState<z.infer<typeof schema> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setHeader, setShowBackButton } = useHeader();

  useEffect(() => {
    setHeader("Formulário de intenção");
    setShowBackButton(true);
  }, [setHeader, setShowBackButton]);

  const useCaseRef = useRef(makeCreateUserUseCase());

  const handleSubmit = useCallback(async (formData: z.infer<typeof schema>) => {
    setError(null);
    setLoading(true);
    try {
      const dto: CreateUserDTO = {
        email: formData.email,
        password: "password",
        name: formData.name,
        company: formData.company,
        purpose: formData.purpose,
      };

      const created = await useCaseRef.current.execute(dto);
      console.log("User created:", created);
      setData(null);
      alert("Usuário criado com sucesso");
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      alert("Falha ao criar usuário: " + message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <FormComponent onSubmit={handleSubmit} onChange={setData} data={data} />
    </div>
  );
}
