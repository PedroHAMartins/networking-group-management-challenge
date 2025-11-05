"use client";

import { HeaderProvider } from "shared";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeaderProvider>{children}</HeaderProvider>;
}
