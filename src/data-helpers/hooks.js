import { useState, useEffect } from "react";

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
 * Can be used in loops or outside components.
 */
export const calculateProductPrice = (product) => {
  if (!product) return { price: 0, originalPrice: null, hasDiscount: false };

  const {
    productPrice,
    salesPrice,
    regularPriceUSD,
    salesPriceUSD,
    previousPriceUSD,
  } = product;

  // Use USD values if available, falling back to older fields if not
  const regular = regularPriceUSD || productPrice || 0;
  const sales = salesPriceUSD || salesPrice;
  const previous = previousPriceUSD;

  // Logic based on user's simple explanation:

  // 1. When the item is on Sale (Sales Price exists, and no specific previous price overriding it logic-wise)
  if (sales && !previous) {
    return {
      price: sales,
      originalPrice: regular,
      hasDiscount: true,
    };
  }

  // If we have a previous price, that's the crossed out one.
  // The current selling price is the sales price if it exists, otherwise the regular price.
  if (previous) {
    return {
      price: sales || regular,
      originalPrice: previous,
      hasDiscount: true
    }
  }

  // Default / Standard Case
  return {
    price: regular,
    originalPrice: null,
    hasDiscount: false,
  };
};

/**
 * Custom hook wrapper for product price logic.
 */
export const useProductPrice = (product) => {
  return calculateProductPrice(product);
};
