"use client";

import { useEffect, useMemo } from "react";
import { useHeader } from "shared";
import Link from "next/link";

export default function DashboardPage() {
  const { setHeader, setShowBackButton, setShowMenu, setMenuItems } =
    useHeader();

  const menuContent = useMemo(() => {
    return (
      <nav className="flex flex-col gap-2">
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/admin"
          className="px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          Intenções
        </Link>
      </nav>
    );
  }, []);

  useEffect(() => {
    setHeader("Dashboard");
    setShowBackButton(true);
    setShowMenu(true);
    setMenuItems(menuContent);
  }, [setHeader, setShowBackButton, setShowMenu, setMenuItems, menuContent]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
    </div>
  );
}
