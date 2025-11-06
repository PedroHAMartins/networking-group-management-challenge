"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHeader } from "shared";
import { Typography } from "../atoms/typography";
import { Button } from "@/presentation/ui";
import { ChevronLeft, Menu as MenuIcon } from "lucide-react";
import { Menu } from "./menu";

export function Header() {
  const router = useRouter();
  const { header, showBackButton, showMenu, menuItems } = useHeader();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="bg-primary text-secondary fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-40">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button
            className="text-secondary p-2 rounded cursor-pointer"
            variant="ghost"
            onClick={handleGoBack}
          >
            <ChevronLeft />
          </Button>
        )}
        <Typography type="h3" weight="bold">
          {header}
        </Typography>
      </div>
      {showMenu && (
        <Menu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          direction="right"
          trigger={
            <Button
              className="text-secondary p-2 rounded cursor-pointer"
              variant="ghost"
            >
              <MenuIcon />
            </Button>
          }
        >
          {menuItems}
        </Menu>
      )}
    </header>
  );
}
