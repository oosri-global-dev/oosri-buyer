import { useState, useRef, useEffect } from "react";
import { useMainContext } from "@/context";
import { CURRENCIES, getCurrencyFromCountry } from "@/data-helpers/currency";
import { useBuyerAddresses } from "@/network/checkout";
import useOutsideAlerter from "@/data-helpers/hooks";

export default function CurrencySelector() {
  const { currency, setCurrency, user } = useMainContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: addressesData } = useBuyerAddresses({ enabled: !!user?.id });

  useOutsideAlerter(dropdownRef, open, setOpen);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("oosri__currency")) return;

    const addresses =
      addressesData?.body?.addresses ||
      addressesData?.addresses ||
      (Array.isArray(addressesData) ? addressesData : []);

    if (addresses.length > 0 && addresses[0]?.countryCode) {
      const detected = getCurrencyFromCountry(addresses[0].countryCode);
      setCurrency(detected);
    }
  }, [addressesData]);

  const current = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div ref={dropdownRef} className="currency__selector">
      <button
        onClick={() => setOpen((o) => !o)}
        className="currency__trigger"
        aria-label="Select currency"
      >
        <span className="currency__flag">{current.flag}</span>
        <span className="currency__code">{current.code}</span>
        <span className="currency__chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="currency__dropdown">
          {Object.values(CURRENCIES).map((c) => (
            <button
              key={c.code}
              className={`currency__option${currency === c.code ? " active" : ""}`}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
            >
              <span className="currency__flag">{c.flag}</span>
              <span>{c.code}</span>
              <span className="currency__symbol">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
