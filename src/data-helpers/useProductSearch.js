import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";

export function useProductSearch(products, debounceMs = 300) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // debounce input
  useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // configure fuse
  const fuse = useMemo(() => {
    return new Fuse(products, {
      includeScore: true,
      threshold: 0.35, // lower = stricter, higher = more fuzzy
      keys: [
        { name: "name", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "category", weight: 0.15 },
        { name: "subcategory", weight: 0.1 },
        { name: "brand", weight: 0.1 },
        { name: "tags", weight: 0.05 },
      ],
    });
  }, [products]);

  // run search
  const results = useMemo(() => {
    if (!debouncedQuery) return products;

    const searchResults = fuse.search(debouncedQuery);

    return searchResults.map((result) => result.item);
  }, [fuse, debouncedQuery, products]);

  // suggestions (basic)
  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];

    return results.slice(0, 5).map((p) => p.name);
  }, [results, query]);

  const updateQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    query,
    results,
    suggestions,
    isSearching,
    updateQuery,
    clearSearch,
  };
}