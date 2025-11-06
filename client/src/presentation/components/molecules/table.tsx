import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/presentation/ui";
import { Typography } from "../atoms";
import React from "react";

export type Column<T> = {
  key: string;
  header?: React.ReactNode;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  render?: (row: T) => React.ReactNode;
  className?: string;
};

interface Props<T> {
  caption?: string;
  columns: Column<T>[];
  data?: T[];
  rowKey?: (row: T, index: number) => string | number;
}

export function TableComponent<T>({
  caption,
  columns,
  data = [],
  rowKey,
}: Props<T>) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={col.className}>
              {col.header ?? (
                <Typography type="h6" weight="semibold">
                  {String(col.key)}
                </Typography>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={String(rowKey ? rowKey(row, rowIndex) : rowIndex)}>
            {columns.map((col) => {
              let content: React.ReactNode = null;
              if (col.render) {
                content = col.render(row);
              } else if (typeof col.accessor === "function") {
                content = col.accessor(row);
              } else if (col.accessor) {
                const record = row as unknown as Record<string, unknown>;
                content = record[col.accessor as string] as React.ReactNode;
              } else {
                const record = row as unknown as Record<string, unknown>;
                content = record[col.key] as React.ReactNode;
              }
              return (
                <TableCell key={col.key} className={col.className}>
                  <Typography type="p" weight="normal">
                    {content}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
