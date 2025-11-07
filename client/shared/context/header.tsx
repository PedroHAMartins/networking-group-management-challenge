"use client";

import React, { createContext, useContext, useState } from "react";

type HeaderContextType = {
  showBackButton: boolean;
  showMenu: boolean;
  header: string | undefined;
  menuItems: React.ReactNode;
  setShowBackButton: (show: boolean) => void;
  setShowMenu: (show: boolean) => void;
  setHeader: (header: string | undefined) => void;
  setMenuItems: (items: React.ReactNode) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  showBackButton: false,
  showMenu: false,
  header: undefined,
  menuItems: null,
  setShowBackButton: () => {},
  setShowMenu: () => {},
  setHeader: () => {},
  setMenuItems: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState<React.ReactNode>(null);

  return (
    <HeaderContext.Provider
      value={{
        showBackButton,
        showMenu,
        header,
        menuItems,
        setHeader,
        setShowBackButton,
        setShowMenu,
        setMenuItems,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

export default HeaderProvider;
