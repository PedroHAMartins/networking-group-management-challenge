"use client";

import { useRouter } from "next/navigation";
import { useHeader } from "shared";
import { Typography } from "./typography";
import { Button } from "@/presentation/ui";
import { ChevronLeft } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { header, showBackButton } = useHeader();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="bg-primary text-secondary absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
      <Typography type="h3" weight="bold">
        {header}
      </Typography>
      {showBackButton && (
        <Button
          className="text-secondary p-2 rounded cursor-pointer"
          variant="ghost"
          onClick={handleGoBack}
        >
          <ChevronLeft /> Voltar
        </Button>
      )}
    </header>
  );
}
