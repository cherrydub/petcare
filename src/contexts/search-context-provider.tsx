"use client";

import React, { createContext, useContext, useState } from "react";

type TSearchContext = {
  searchText: string;
  handleChangeSearchQuery: (searchValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");

  function handleChangeSearchQuery(searchValue: string) {
    setSearchText(searchValue);
  }

  return (
    <SearchContext.Provider value={{ searchText, handleChangeSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
}
