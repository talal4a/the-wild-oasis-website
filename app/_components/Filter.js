"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
export default function Filter() {
  const searchPrams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchPrams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams();
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guest
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guest
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guest
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : "undefined"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
