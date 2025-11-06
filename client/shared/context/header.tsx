"use client";

import React, { createContext, useContext, useState } from "react";

type HeaderContextType = {
  showBackButton: boolean;
  header: string | undefined;
  setShowBackButton: (show: boolean) => void;
  setHeader: (header: string | undefined) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  showBackButton: false,
  header: undefined,
  setShowBackButton: () => {},
  setHeader: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <HeaderContext.Provider
      value={{ showBackButton, header, setHeader, setShowBackButton }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

export default HeaderProvider;
