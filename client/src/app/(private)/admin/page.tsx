"use client";

import { useEffect } from "react";
import { useHeader } from "shared";
import { IntentionsTable } from "./components";

export default function AdminPage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Administrativo");
  }, [setHeader]);

  return <IntentionsTable />;
}
