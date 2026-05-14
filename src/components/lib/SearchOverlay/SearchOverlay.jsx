import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { FiSearch as SearchIcon, FiX as CloseIcon } from "react-icons/fi";
import { FaArrowsRotate as HistoryIcon } from "react-icons/fa6";
import { MdOutlineCategory as CategoryIcon } from "react-icons/md";
import SafeImage from "@/components/lib/SafeImage/SafeImage";
import { useSearchQuery } from "@/network/search";
import { useProductCategoriesQuery } from "@/network/product";
import { useFormatPrice } from "@/data-helpers/hooks";
import { SearchOverlayWrapper, SearchBackdrop } from "./searchOverlay.styles";

const RECENT_KEY = "recent_searches";
const MAX_RECENT = 5;

function getRecent() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
  catch { return []; }
}

function saveRecent(query) {
  if (!query?.trim()) return;
  const q = query.trim();
  let list = getRecent().filter((r) => r !== q);
  list.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [recent, setRecent] = useState([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const formatPrice = useFormatPrice();

  useEffect(() => { setMounted(true); }, []);

  // Reset + focus on open; lock scroll
  useEffect(() => {
    if (open) {
      setQuery("");
      setDebounced("");
      setRecent(getRecent());
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Debounce 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const { data: searchData, isLoading } = useSearchQuery(debounced);
  const products = useMemo(() => (searchData?.body?.products || []).slice(0, 6), [searchData]);

  const { data: catData } = useProductCategoriesQuery();
  const categories = useMemo(() => {
    if (debounced.length < 2) return [];
    const q = debounced.toLowerCase();
    return (catData?.data || []).filter((c) => c.name?.toLowerCase().includes(q)).slice(0, 3);
  }, [catData, debounced]);

  const commit = useCallback((q) => {
    const term = (q || query).trim();
    if (!term) return;
    saveRecent(term);
    onClose();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  }, [query, router, onClose]);

  const goToProduct = useCallback((id) => {
    saveRecent(query);
    onClose();
    router.push(`/product/${id}`);
  }, [query, router, onClose]);

  const goToCategory = useCallback((name) => {
    onClose();
    router.push(`/shop?category=${encodeURIComponent(name)}`);
  }, [router, onClose]);

  const handleRecentClick = useCallback((r) => {
    setQuery(r);
    setDebounced(r);
  }, []);

  const clearRecent = useCallback(() => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commit();
  };

  const showSuggestions = debounced.length >= 2;
  const hasResults = products.length > 0 || categories.length > 0;

  if (!mounted || !open) return null;

  const overlay = (
    <>
      <SearchBackdrop onClick={onClose} />
      <SearchOverlayWrapper role="dialog" aria-label="Search" aria-modal="true">
        {/* Input */}
        <div className="so__input__row">
          <SearchIcon size={20} className="so__search__icon" />
          <input
            ref={inputRef}
            type="text"
            className="so__input"
            placeholder="Search products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            aria-label="Search input"
          />
          {query && (
            <button
              className="so__clear__btn"
              onClick={() => { setQuery(""); setDebounced(""); inputRef.current?.focus(); }}
              aria-label="Clear search"
            >
              <CloseIcon size={15} />
            </button>
          )}
          <button className="so__close__btn" onClick={onClose} aria-label="Close search">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="so__body">
          {!showSuggestions ? (
            /* ── Recent searches ── */
            <div className="so__section">
              <div className="so__section__header">
                <span>Recent Searches</span>
                {recent.length > 0 && (
                  <button className="so__clear__link" onClick={clearRecent}>Clear all</button>
                )}
              </div>
              {recent.length === 0 ? (
                <p className="so__empty">No recent searches yet.</p>
              ) : (
                <div className="so__recent__list">
                  {recent.map((r, i) => (
                    <button key={i} className="so__recent__item" onClick={() => handleRecentClick(r)}>
                      <HistoryIcon size={13} className="so__history__icon" />
                      <span>{r}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* ── Loading skeleton ── */}
              {isLoading && (
                <div className="so__section">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="so__product__skeleton">
                      <div className="so__skel__img" />
                      <div className="so__skel__lines">
                        <div className="so__skel__line" style={{ width: "65%" }} />
                        <div className="so__skel__line" style={{ width: "28%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Product suggestions ── */}
              {!isLoading && products.length > 0 && (
                <div className="so__section">
                  <div className="so__section__header"><span>Products</span></div>
                  {products.map((p) => {
                    const id = p._id || p.objectID;
                    const price = p.discountPriceUSD || p.regularPriceUSD || p.salesPriceUSD || p.discountPrice || p.regularPrice || 0;
                    return (
                      <button key={id} className="so__product__row" onClick={() => goToProduct(id)}>
                        <div className="so__product__img">
                          {p.productImages?.[0] && (
                            <SafeImage
                              src={p.productImages[0]}
                              alt={p.productName || "product"}
                              fill
                              style={{ objectFit: "contain" }}
                              sizes="48px"
                            />
                          )}
                        </div>
                        <div className="so__product__info">
                          <span className="so__product__name">{p.productName}</span>
                          <span className="so__product__price">{formatPrice(price)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ── Category suggestions ── */}
              {categories.length > 0 && (
                <div className="so__section">
                  <div className="so__section__header"><span>Categories</span></div>
                  {categories.map((c) => (
                    <button key={c._id} className="so__category__row" onClick={() => goToCategory(c.name)}>
                      <CategoryIcon size={14} className="so__cat__icon" />
                      <span>{c.name}</span>
                      <span className="so__cat__arrow">→</span>
                    </button>
                  ))}
                </div>
              )}

              {/* ── No results ── */}
              {!isLoading && !hasResults && (
                <div className="so__section">
                  <p className="so__empty">No results for &ldquo;{debounced}&rdquo;. Try a different term.</p>
                </div>
              )}

              {/* ── See all CTA ── */}
              {(isLoading || products.length > 0) && (
                <div className="so__see__all">
                  <button onClick={() => commit()}>
                    See all results for &ldquo;<strong>{debounced}</strong>&rdquo; →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SearchOverlayWrapper>
    </>
  );

  return createPortal(overlay, document.body);
}
