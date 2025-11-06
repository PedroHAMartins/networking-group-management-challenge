"use client";

import { useHeader } from "shared";
import { Typography } from "./typography";

export function Header() {
  const { header } = useHeader();

  return (
    <header className="bg-primary text-secondary absolute top-0 left-0 right-0 p-4">
      <Typography type="h3" weight="bold">
        {header}
      </Typography>
    </header>
  );
}
