"use client";

import React, { createContext, useContext, useState } from "react";

type HeaderContextType = {
  header: string | undefined;
  setHeader: (header: string | undefined) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  header: undefined,
  setHeader: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<string | undefined>(undefined);

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

export default HeaderProvider;
