"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHeader } from "shared";
import { fields, IntentionsTable, schema } from "./components";
import { FormBuilder } from "@/presentation";
import { makeIsVariableValidUseCase } from "application/variables/isVariableValidUseCase";

export default function AdminPage() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const adminPasswordKey = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_KEY;

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Administrativo");
  }, [setHeader]);

  const useCaseRef = useRef(makeIsVariableValidUseCase());

  const handleSubmit = useCallback(
    (data: { password: string }) => {
      if (!adminPasswordKey) {
        setError("Admin password key not configured");
        return;
      }
      setLoading(true);
      setError(null);
      useCaseRef.current
        .execute(adminPasswordKey, data.password)
        .then((verify) => {
          setVisible(verify);
          if (!verify) {
            setError("Senha incorreta");
          }
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        })
        .finally(() => setLoading(false));
    },
    [adminPasswordKey]
  );

  return (
    <div className="p-4">
      {!visible && (
        <div className="max-w-sm">
          <FormBuilder
            fields={fields}
            formSchema={schema}
            onSubmit={handleSubmit}
          />
          {loading && (
            <div className="text-sm text-muted-foreground mt-2">
              Validando...
            </div>
          )}
          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </div>
      )}
      {visible && <IntentionsTable />}
    </div>
  );
}
