"use client";

import { AdminAuthProvider } from "shared";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="flex flex-col min-h-screen pt-20">
        <main>{children}</main>
      </div>
    </AdminAuthProvider>
  );
}
