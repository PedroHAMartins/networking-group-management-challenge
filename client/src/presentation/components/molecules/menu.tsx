"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/presentation/ui";

interface Props {
  title?: string;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  direction?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Menu({
  title,
  description,
  trigger,
  children,
  ...props
}: Props) {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {title && (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        )}
        {description && <DrawerDescription>{description}</DrawerDescription>}
        <div className="p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
