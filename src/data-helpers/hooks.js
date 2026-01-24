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
    currencyDisplay: "symbol", // Explicitly use currency symbol (₦, $, €, etc.) instead of code
    useGrouping: true,
    maximumFractionDigits: 2, // Up to 2 decimal places
    minimumFractionDigits: 0,
  });
  return formatter.format(amount || 0);
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
