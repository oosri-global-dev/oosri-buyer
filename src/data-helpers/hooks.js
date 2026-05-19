import { useLayoutEffect, useState, useEffect } from "react";
import { useMainContext } from "@/context";
import { formatInCurrency } from "@/data-helpers/currency";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  return [windowSize[0], windowSize[1]];
};


export default function useOutsideAlerter(ref, isOpen, setIsOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Only add the event listener if the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, setIsOpen]);
}

export const nairaFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  useGrouping: true,
  maximumFractionDigits: 2, // Up to 2 decimal places
  minimumFractionDigits: 0,
});

export const formatCurrency = (amount, currency = "USD") => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    currencyDisplay: "symbol",
    useGrouping: true,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount || 0);
};

/**
 * Strips all HTML tags from a string and returns plain text.
 * Safe alternative to dangerouslySetInnerHTML — no XSS risk.
 */
export const stripHtml = (html) => {
  if (!html) return "";
  // Use the browser's built-in parser when available (SSR-safe fallback via regex)
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  // SSR fallback: strip tags with regex
  return html.replace(/<[^>]*>/g, "").trim();
};

export function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

/**
 * Custom hook/helper to determine the correct price to display for a product.
 * @param {Object} product - The product object containing price details.
 * @returns {Object} - An object containing:
 *   - price: The current selling price.
 *   - originalPrice: The price to be crossed out (if any).
 *   - hasDiscount: Boolean indicating if there is a discount.
 *   - discount: The calculated discount amount (optional/extensible).
 */
/**
 * Helper function to calculate product price logic.
 * Always returns prices in USD.
 *
 * Priority for resolving USD price:
 *   1. regularPriceUSD   — explicit USD field from backend
 *   2. regularPrice * fxRate — NGN price converted via the rate the backend stored
 *   3. productPrice — raw fallback (may be NGN; only used if no conversion is possible)
 */
export const calculateProductPrice = (product) => {
  if (!product) return { price: 0, originalPrice: null, hasDiscount: false };

  const {
    productPrice,
    salesPrice,
    discountPrice,       // PDP endpoint uses discountPrice; treat as alias for salesPrice
    regularPrice,
    regularPriceUSD,
    salesPriceUSD,
    discountPriceUSD,    // USD version of discountPrice
    previousPriceUSD,
    fxRate, // NGN-to-USD rate stored on the product by the backend
  } = product;

  // Convert an NGN amount to USD using the per-product fxRate the backend attached.
  const toUSD = (ngnAmount) => {
    if (!ngnAmount || !fxRate) return null;
    return Number((ngnAmount * fxRate).toFixed(2));
  };

  // Resolve each price tier to USD
  const regular =
    regularPriceUSD ||
    toUSD(regularPrice) ||
    productPrice ||
    0;

  // salesPrice and discountPrice are the same concept — reduced selling price.
  // salesPriceUSD / discountPriceUSD are their USD-converted equivalents.
  const sales =
    salesPriceUSD ||
    discountPriceUSD ||
    toUSD(salesPrice) ||
    toUSD(discountPrice) ||
    null;

  const previous = previousPriceUSD || toUSD(product.previousPrice) || null;

  // Only treat as discounted when the sale price is genuinely lower than regular.
  // The backend sometimes sets salesPrice = regularPrice as a fallback — ignore those.
  if (sales && !previous) {
    if (Number(sales) < Number(regular)) {
      return { price: sales, originalPrice: regular, hasDiscount: true };
    }
    return { price: regular, originalPrice: null, hasDiscount: false };
  }

  if (previous) {
    const currentPrice = sales && Number(sales) < Number(regular) ? sales : regular;
    if (Number(previous) > Number(currentPrice)) {
      return { price: currentPrice, originalPrice: previous, hasDiscount: true };
    }
    return { price: regular, originalPrice: null, hasDiscount: false };
  }

  return { price: regular, originalPrice: null, hasDiscount: false };
};

/**
 * Custom hook wrapper for product price logic.
 */
export const useProductPrice = (product) => {
  return calculateProductPrice(product);
};

/**
 * Returns a price formatting function bound to the buyer's selected currency.
 * Uses the live admin-controlled FX rate for NGN; static rates for GBP/EUR.
 *
 * Usage: const formatPrice = useFormatPrice();
 *        formatPrice(product.regularPriceUSD)
 */
export const useFormatPrice = () => {
  const { currency, fxRates } = useMainContext();
  return (amountUSD) => formatInCurrency(amountUSD, currency, fxRates);
};
