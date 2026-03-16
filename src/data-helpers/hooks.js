import { useLayoutEffect, useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const updateWindowSize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };
  useLayoutEffect(() => {
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

  // Use USD values if available (from buyerProductService conversion), falling back to NGN
  const regular = product.regularPriceUSD || product.productPrice || product.regularPrice || 0;
  const discounted = product.discountPriceUSD || product.discountPrice || null;

  // If a valid discount exists
  if (discounted && discounted < regular) {
    return {
      price: discounted, // The main price shown
      originalPrice: regular, // The struck-through price
      hasDiscount: true,
    };
  }

  // Default case: no discount (or invalid discount that is somehow higher than regular)
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
