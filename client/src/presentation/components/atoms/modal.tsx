import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/ui";
import React from "react";

interface Props {
  isOpen: boolean;
  triggerText?: string;
  title?: string;
  description?: React.ReactNode;
  closeText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export function Modal({
  isOpen,
  triggerText,
  title,
  description,
  closeText,
  confirmText,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>{triggerText || "Abrir"}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onClose} variant="ghost">
              {closeText || "Cancelar"}
            </Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={onConfirm}>{confirmText || "Confirmar"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
