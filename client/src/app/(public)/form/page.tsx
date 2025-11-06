"use client";

import { useEffect } from "react";
import { useHeader } from "shared";
import { FormComponent } from "./components/form";

export default function PublicFormPage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Formulário de intenção");
  }, [setHeader]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <FormComponent />
    </div>
  );
}
