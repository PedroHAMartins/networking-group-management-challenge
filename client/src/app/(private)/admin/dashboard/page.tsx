"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useHeader, useNotification, useUseCase, useAdminAuth } from "shared";
import Link from "next/link";
import { Typography } from "@/presentation";
import { Cards, Chart } from "./components";
import {
  GetTotalUsersDataUseCase,
  makeGetTotalUsersDataUseCase,
} from "application/users/get-total-users-data.usecase";
import { TotalUsersDataDto } from "domain/user/dtos/data.dto";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();
  const { setHeader, setShowBackButton, setShowMenu, setMenuItems } =
    useHeader();

  const [total, setTotal] = useState<number>(0);
  const [approved, setApproved] = useState<number>(0);
  const { makeNotification } = useNotification();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const fetchExecute = useCallback(
    (uc: GetTotalUsersDataUseCase) => uc.execute(),
    []
  );

  const fetchOptions = useMemo(
    () => ({
      onSuccess: (data: TotalUsersDataDto) => {
        setTotal(data.total);
        setApproved(data.approved);
      },
      onError: () => {
        makeNotification({
          title: "Erro",
          description: "Não foi possível carregar os dados de usuários.",
          type: "error",
        });
      },
    }),
    [setTotal, setApproved, makeNotification]
  );

  const { run: fetchData } = useUseCase<
    GetTotalUsersDataUseCase,
    TotalUsersDataDto,
    []
  >(() => makeGetTotalUsersDataUseCase(), fetchExecute, fetchOptions);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-5">
      <Typography className="px-20" type="h2" weight="bold">
        Indicadores
      </Typography>
      <Cards approvedUsers={approved} />
      <Chart totalUsers={total} approvedUsers={approved} />
    </div>
  );
}
