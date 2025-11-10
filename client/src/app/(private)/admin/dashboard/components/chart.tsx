"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/presentation/ui/chart";
import {
  GetTotalUsersDataUseCase,
  makeGetTotalUsersDataUseCase,
} from "application/users/getTotalUsersDataUseCase";
import { TotalUsersDataDto } from "domain/user/dtos/data.dto";
import { Users, UserCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useNotification, useUseCase } from "shared";

interface Props {
  totalUsers: number;
  approvedUsers: number;
}

export function Chart({ totalUsers, approvedUsers }: Props) {
  const chartData = useMemo(
    () => [
      {
        category: "Usuários",
        total: totalUsers,
        aprovados: approvedUsers,
      },
    ],
    [totalUsers, approvedUsers]
  );

  const chartConfig = {
    total: {
      label: "Total de Usuários",
      color: "hsl(var(--chart-1))",
    },
    aprovados: {
      label: "Usuários Aprovados",
      color: "hsl(var(--chart-2))",
    },
  };

  const approvalRate =
    totalUsers > 0 ? ((approvedUsers / totalUsers) * 100).toFixed(1) : "0";

  return (
    <Card className="max-w-fit">
      <CardHeader>
        <CardTitle>Estatísticas de Usuários</CardTitle>
        <CardDescription>
          Total de {totalUsers} usuários • {approvedUsers} aprovados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[40dvh] w-[70dvw]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              label={{
                value: "Quantidade",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Legend />
            <Bar
              dataKey="total"
              fill="var(--color-chart-1)"
              radius={[8, 8, 0, 0]}
              name="Total de Usuários"
            />
            <Bar
              dataKey="aprovados"
              fill="var(--color-chart-2)"
              radius={[8, 8, 0, 0]}
              name="Usuários Aprovados"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              <Users className="h-4 w-4" />
              Taxa de aprovação: {approvalRate}%
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              <UserCheck className="h-4 w-4" />
              {approvedUsers} de {totalUsers} usuários foram aprovados
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
