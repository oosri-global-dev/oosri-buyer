import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "antd";
import { StorePageWrapper } from "./SellerStorePage.styles";
import ProductCard, { LoadingCard } from "@/components/lib/ProductCard/productCard";
import { useSellerStoreProductsQuery } from "@/network/seller";
import {
  IoCheckmarkCircle as VerifiedIcon,
  IoStorefront as StoreIcon,
  IoCalendarOutline as CalIcon,
  IoLogoInstagram as IgIcon,
  IoLogoTwitter as TwIcon,
  IoLogoFacebook as FbIcon,
  IoLogoTiktok as TkIcon,
  IoGlobeOutline as WebIcon,
  IoSearchOutline as SearchIcon,
  IoCloseCircle as ClearIcon,
} from "react-icons/io5";
import dayjs from "dayjs";

const ITEMS_PER_PAGE = 12;

const SOCIAL_CONFIG = [
  { key: "instagram", label: "Instagram", Icon: IgIcon, base: "https://instagram.com/" },
  { key: "twitter", label: "Twitter / X", Icon: TwIcon, base: "https://twitter.com/" },
  { key: "facebook", label: "Facebook", Icon: FbIcon, base: "https://facebook.com/" },
  { key: "tiktok", label: "TikTok", Icon: TkIcon, base: "https://tiktok.com/@" },
  { key: "website", label: null, Icon: WebIcon, base: "" },
];

function buildSocialHref(key, value) {
  const cfg = SOCIAL_CONFIG.find((c) => c.key === key);
  if (!cfg || !value) return null;
  if (key === "website") return value.startsWith("http") ? value : `https://${value}`;
  return `${cfg.base}${value.replace(/^@/, "")}`;
}

export default function SellerStorePage({ seller, identifier }) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: productsData,
    isLoading: isLoadingProducts,
  } = useSellerStoreProductsQuery(identifier, 0, 500);

  const allProducts = useMemo(() => productsData?.body?.products || [], [productsData?.body?.products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter((p) =>
      p.productName?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }, [allProducts, searchQuery]);

  const total = filteredProducts.length;
  const products = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (!seller) {
    return (
      <StorePageWrapper>
        <div className="store__not__found">
          <h2>Store not found</h2>
          <p>This store doesn&apos;t exist or may have been removed.</p>
          <Link href="/shop" style={{ color: "var(--orrsiPrimary)", fontWeight: 600, marginTop: 16, display: "inline-block" }}>
            Browse all products →
          </Link>
        </div>
      </StorePageWrapper>
    );
  }

  const storeProfile = seller.storeProfile || {};
  const storeName =
    storeProfile.storeName ||
    (seller.businessType === "Corporate"
      ? seller.corporateBusinessAccount?.companyName
      : null) ||
    `${seller.firstName} ${seller.lastName}`.trim();

  const initials = `${seller.firstName?.[0] || ""}${seller.lastName?.[0] || ""}`.toUpperCase();
  const memberSince = seller.createdAt ? dayjs(seller.createdAt).format("MMM YYYY") : null;

  const socialLinks = Object.entries(storeProfile.socialLinks || {}).filter(([, v]) => !!v);

  return (
    <>
      <Head>
        <title>{storeName} | Oosri</title>
        <meta name="description" content={storeProfile.description || `Shop authentic products from ${storeName} on Oosri.`} />
        <meta property="og:title" content={`${storeName} | Oosri`} />
        <meta property="og:description" content={storeProfile.description || `Shop ${storeName} on Oosri`} />
        {seller.profilePicture && <meta property="og:image" content={seller.profilePicture} />}
      </Head>

      <StorePageWrapper>
        {/* ── Banner ── */}
        <div className="store__banner">
          {storeProfile.bannerImage ? (
            <Image src={storeProfile.bannerImage} alt={`${storeName} banner`} className="banner__img" fill style={{ objectFit: "cover" }} unoptimized />
          ) : null}
          <div className="banner__overlay" />
        </div>

        {/* ── Identity ── */}
        <div className="store__identity">
          <div className="store__avatar__wrap">
            {seller.profilePicture ? (
              <Image src={seller.profilePicture} alt={storeName} fill style={{ objectFit: "cover" }} unoptimized />
            ) : (
              <span className="avatar__initials">{initials}</span>
            )}
          </div>

          <div className="store__header">
            <div className="store__name__row">
              <h1 className="store__name">{storeName}</h1>
              {seller.isVerified && (
                <span className="store__verified__badge">
                  <VerifiedIcon size={12} /> Verified Seller
                </span>
              )}
            </div>

            {seller.country && (
              <div className="store__country">
                <span>{seller.country}</span>
              </div>
            )}

            {storeProfile.description && (
              <p className="store__description">{storeProfile.description}</p>
            )}

            <div className="store__stats">
              <div className="stat__pill">
                <StoreIcon size={16} color="var(--orrsiPrimary)" />
                <span className="stat__num">{seller.productCount ?? "—"}</span>
                <span>Products</span>
              </div>
              {memberSince && (
                <div className="stat__pill">
                  <CalIcon size={16} color="var(--orrsiPrimary)" />
                  <span>Since <span className="stat__num">{memberSince}</span></span>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="store__socials">
                {socialLinks.map(([key, value]) => {
                  const cfg = SOCIAL_CONFIG.find((c) => c.key === key);
                  if (!cfg) return null;
                  const href = buildSocialHref(key, value);
                  if (!href) return null;
                  return (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="social__link">
                      <cfg.Icon size={14} />
                      {cfg.label || value}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="store__divider" />

        {/* ── Products ── */}
        <div className="store__products">
          <div className="products__header">
            <div className="products__header__left">
              <h2 className="products__title">Products</h2>
              {!isLoadingProducts && (
                <p className="products__count">
                  {searchQuery.trim()
                    ? `${total} result${total !== 1 ? "s" : ""}`
                    : `${allProducts.length} item${allProducts.length !== 1 ? "s" : ""}`}
                </p>
              )}
            </div>
            <div className="products__search__wrap">
              <SearchIcon size={15} className="search__icon" />
              <input
                className="products__search"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              />
              {searchQuery && (
                <button className="search__clear" onClick={() => { setSearchQuery(""); setPage(1); }}>
                  <ClearIcon size={16} />
                </button>
              )}
            </div>
          </div>

          {isLoadingProducts ? (
            <div className="products__grid">
              {Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)}
            </div>
          ) : products.length > 0 ? (
            <div className="products__grid">
              {products.map((p) => (
                <ProductCard card={p} key={p._id || p.productId} />
              ))}
            </div>
          ) : (
            <div className="products__empty">
              <p>{searchQuery.trim() ? `No products matching "${searchQuery}"` : "No products listed yet."}</p>
            </div>
          )}

          {total > ITEMS_PER_PAGE && (
            <div className="products__pagination">
              <Pagination
                current={page}
                pageSize={ITEMS_PER_PAGE}
                total={total}
                onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                showSizeChanger={false}
                responsive
              />
            </div>
          )}
        </div>
      </StorePageWrapper>
    </>
  );
}
