import { WishListWrapper } from "./WishlistScreen.styles";
import { useState, useMemo } from "react";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { AiOutlineHeart as EmptyHeartIcon } from "react-icons/ai";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";
import { useSavedItemsQuery } from "@/network/product";
import { useRouter } from "next/router";

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { push } = useRouter();
  const { data: savedItemsData, isLoading } = useSavedItemsQuery();

  const savedItems = useMemo(() => {
    return savedItemsData?.body?.savedItems || [];
  }, [savedItemsData]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return savedItems;
    const query = searchQuery.toLowerCase();
    return savedItems.filter((item) => {
      const product = item?.product || item;
      const name = product?.productName?.toLowerCase() || "";
      const brand =
        product?.brandName?.toLowerCase() ||
        product?.sellerName?.toLowerCase() ||
        "";
      return name.includes(query) || brand.includes(query);
    });
  }, [savedItems, searchQuery]);

  const hasItems = savedItems.length > 0;
  const isSearchEmpty = !isLoading && hasItems && filteredItems.length === 0;
  const isWishlistEmpty = !isLoading && !hasItems;

  return (
    <WishListWrapper>
      {/* ── Header ── */}
      <div className="wishlist__header">
        <div className="header__left">
          <h1>Saved Items</h1>
          {hasItems && !isLoading && (
            <span className="item__count__badge">
              {savedItems.length} {savedItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>
        {hasItems && !isLoading && (
          <div className="search__wrapper">
            <SearchIcon size={18} className="search__icon" />
            <input
              className="search__input"
              placeholder="Search saved items…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="wishlist__content">
        {isLoading ? (
          <div className="products__grid">
            {[...Array(8)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : isWishlistEmpty ? (
          <div className="empty__state">
            <div className="empty__icon__ring">
              <EmptyHeartIcon size={44} color="#ccc" />
            </div>
            <p className="empty__title">Nothing saved yet</p>
            <p className="empty__subtitle">
              Tap the heart icon on any product to save it here for later.
            </p>
            <button className="empty__cta" onClick={() => push("/shop")}>
              Start Shopping
            </button>
          </div>
        ) : isSearchEmpty ? (
          <div className="empty__state">
            <p className="empty__title">No results found</p>
            <p className="empty__subtitle">
              Try a different product name or brand.
            </p>
          </div>
        ) : (
          <div className="products__grid">
            {filteredItems.map((item, idx) => {
              const product = item?.product || item;
              return (
                <ProductCard
                  card={{ ...product, isFavorite: true }}
                  key={product?._id || idx}
                />
              );
            })}
          </div>
        )}
      </div>
    </WishListWrapper>
  );
}
