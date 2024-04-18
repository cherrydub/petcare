"use client";

import { useSearchContext } from "@/contexts/search-context-provider";

export default function SearchForm() {
  const { searchText, handleChangeSearchQuery } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        type="search"
        value={searchText}
        placeholder="Search pets"
        className="placeholder:text-white/50 w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 "
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
