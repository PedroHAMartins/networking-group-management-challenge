"use client";

import { Button, Separator, Typography } from "@/presentation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useHeader } from "shared";

export default function Home() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Página inicial");
  }, [setHeader]);

  return (
    <div className="h-screen w-screen flex gap-16 justify-center items-center">
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
  );
}
