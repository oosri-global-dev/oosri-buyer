import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * AddressAutocompleteField
 *
 * Uses Google Maps AutocompleteService (predictions) + Geocoder (place details)
 * directly — no widget, no DOM manipulation, fully React-controlled.
 *
 * Props:
 *   value           – controlled input value (string)
 *   onChange        – called with new string value on every keystroke
 *   onAddressSelect – called with { address, cityName, postalCode, countryCode, countryName }
 *                     when the user picks a suggestion
 *   placeholder     – input placeholder
 *   disabled        – disables the input (e.g. while Maps SDK loads)
 */
const AddressAutocompleteField = ({
  value = "",
  onChange,
  onAddressSelect,
  placeholder = "Start typing your address...",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const geocoderRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync externally-supplied value (e.g. edit mode pre-fill / reset)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initialise Google Maps services once the SDK is available
  useEffect(() => {
    if (typeof window !== "undefined" && window.google?.maps?.places) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setPredictions([]);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const fetchPredictions = useCallback((input) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!input.trim() || !autocompleteServiceRef.current) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      autocompleteServiceRef.current.getPlacePredictions(
        { input },
        (results, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results?.length
          ) {
            setPredictions(results);
            setIsOpen(true);
          } else {
            setPredictions([]);
            setIsOpen(false);
          }
        }
      );
    }, 350);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const val = e.target.value;
      setInputValue(val);
      onChange?.(val);
      fetchPredictions(val);
    },
    [onChange, fetchPredictions]
  );

  // Called when user picks a suggestion — use Geocoder to get full place details
  const handleSelect = useCallback(
    (prediction) => {
      setPredictions([]);
      setIsOpen(false);

      if (!geocoderRef.current) return;

      geocoderRef.current.geocode(
        { placeId: prediction.place_id },
        (results, status) => {
          if (status !== "OK" || !results?.[0]) {
            // Fallback: at least fill the address text
            const fallback = prediction.description;
            setInputValue(fallback);
            onChange?.(fallback);
            return;
          }

          const components = results[0].address_components || [];
          let streetNumber = "";
          let route = "";
          let city = "";
          let postalCode = "";
          let countryCode = "";
          let countryName = "";

          components.forEach((comp) => {
            const types = comp.types;
            if (types.includes("street_number")) streetNumber = comp.long_name;
            if (types.includes("route")) route = comp.long_name;
            if (
              (types.includes("locality") ||
                types.includes("postal_town") ||
                types.includes("sublocality_level_1")) &&
              !city
            ) {
              city = comp.long_name;
            }
            if (types.includes("postal_code")) postalCode = comp.long_name;
            if (types.includes("country")) {
              countryCode = comp.short_name;
              countryName = comp.long_name;
            }
          });

          const fullAddress = streetNumber
            ? `${streetNumber} ${route}`.trim()
            : route || prediction.description;

          setInputValue(fullAddress);
          onChange?.(fullAddress);
          onAddressSelect?.({
            address: fullAddress,
            cityName: city,
            postalCode,
            countryCode,
            countryName,
          });
        }
      );
    },
    [onChange, onAddressSelect]
  );

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1px solid #d9d9d9",
          fontSize: "14px",
          outline: "none",
          height: "40px",
          boxSizing: "border-box",
          background: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "not-allowed" : "text",
        }}
        onFocus={(e) => {
          if (!disabled) e.target.style.borderColor = "var(--orrsiPrimary)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d9d9d9";
        }}
      />

      {isOpen && predictions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1050,
            background: "#fff",
            border: "1px solid #ececec",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {predictions.map((pred) => (
            <li key={pred.place_id}>
              {/* onMouseDown fires before onBlur, preventing dropdown from closing prematurely */}
              <button
                type="button"
                onMouseDown={() => handleSelect(pred)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 14px",
                  border: "none",
                  borderBottom: "1px solid #f5f5f5",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fff5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  style={{ fontWeight: 500, fontSize: "0.88rem", color: "#333" }}
                >
                  {pred.structured_formatting?.main_text}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                    marginTop: "2px",
                  }}
                >
                  {pred.structured_formatting?.secondary_text}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocompleteField;
