"use client";

import { HeaderProvider, NotificationProvider } from "shared";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <HeaderProvider>{children}</HeaderProvider>
    </NotificationProvider>
  );
}
