import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import { Input, Select } from "antd";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { StyledModal, PaymentModalContent } from "./paymentModal.styles";
import { FlexibleDiv } from "../Box/styles";
import Button from "../Button";
import TextField from "../TextField";
import { Form } from "antd";
import { MdAdd as AddIcon, MdLocationOn as LocationIcon } from "react-icons/md";
import {
  useBuyerAddresses,
  useCreateBuyerAddress,
  useUpdateBuyerAddress,
  useDeleteBuyerAddress,
  useGetShippingFee,
  useCreatePaymentIntent,
} from "@/network/checkout";
import { formatCurrency } from "@/data-helpers/hooks";
import { TOAST_BOX } from "@/context/types";
import { useMainContext } from "@/context";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";
import { Spin } from "antd";
import { useRouter } from "next/router";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
];

const countryOptions = COUNTRIES.map((country) => ({
  label: country.name,
  value: country.code,
}));

const PLACES_AUTOCOMPLETE_URL =
  "https://places.googleapis.com/v1/places:autocomplete";
const PLACES_API_BASE_URL = "https://places.googleapis.com/v1";

const PLACE_AUTOCOMPLETE_FIELD_MASK = [
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.place",
  "suggestions.placePrediction.text.text",
  "suggestions.placePrediction.structuredFormat.mainText.text",
  "suggestions.placePrediction.structuredFormat.secondaryText.text",
].join(",");

const PLACE_DETAILS_FIELD_MASK = ["addressComponents", "formattedAddress"].join(
  ","
);

// How long (ms) to wait after the last keystroke before firing a request.
// Keeping it low (200 ms) satisfies "show suggestions with every key pressed"
// while still batching burst keystrokes and staying within API quota.
const AUTOCOMPLETE_DEBOUNCE_MS = 200;

// Minimum characters before we bother the API.
const MIN_QUERY_LENGTH = 2;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const createPlacesSessionToken = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `oosri-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getAddressComponent = (components = [], type, nameType = "longText") =>
  components.find((c) => c.types?.includes(type))?.[nameType] ?? "";

const buildStreetAddress = (components = [], fallback = "") => {
  const streetNumber = getAddressComponent(components, "street_number");
  const route = getAddressComponent(components, "route");
  const premise = getAddressComponent(components, "premise");
  const subpremise = getAddressComponent(components, "subpremise");

  const addressLine = [streetNumber, route].filter(Boolean).join(" ").trim();
  if (addressLine) {
    return [subpremise, premise, addressLine].filter(Boolean).join(", ");
  }

  return fallback.split(",").slice(0, 2).join(", ").trim() || fallback;
};

const buildPostalCode = (components = []) => {
  const postalCode = getAddressComponent(components, "postal_code");
  const postalCodeSuffix = getAddressComponent(
    components,
    "postal_code_suffix"
  );

  if (postalCode && postalCodeSuffix) {
    return `${postalCode}-${postalCodeSuffix}`;
  }

  return postalCode || "";
};

const normalizeGooglePlace = (place) => {
  const components = place?.addressComponents ?? [];

  const cityName =
    getAddressComponent(components, "locality") ||
    getAddressComponent(components, "postal_town") ||
    getAddressComponent(components, "administrative_area_level_2") ||
    getAddressComponent(components, "administrative_area_level_1");

  return {
    address: buildStreetAddress(components, place?.formattedAddress ?? ""),
    postalCode: buildPostalCode(components),
    cityName,
    countryCode: getAddressComponent(components, "country", "shortText"),
  };
};

// ---------------------------------------------------------------------------
// AddressAutocomplete
// ---------------------------------------------------------------------------
//
// Key fixes vs. the original implementation:
//
// 1. RACE-CONDITION FIX
//    The old code incremented `activeRequestRef` inside the setTimeout callback
//    *after* already creating a new AbortController, so the guard check
//    `requestId !== activeRequestRef.current` was always comparing equal values.
//    Fix: capture a monotonically-increasing request ID *before* the fetch,
//    store it in a ref, and only commit results when the ID still matches.
//
// 2. DEBOUNCE FIX
//    The old effect listed `inputValue` as a dependency AND ran clearTimeout
//    inside the cleanup. That is correct in principle, but the `suppressFetchRef`
//    trick that skips one cycle was fragile — it fired once on mount and once
//    after a selection, easily going out of sync.
//    Fix: completely remove `suppressFetchRef`. Instead, track whether the
//    current input value was "just set by a selection" via a dedicated ref
//    (`selectionInProgressRef`). We set it to `true` synchronously before
//    updating `inputValue` from `handleSuggestionSelect`, and the effect clears
//    it at the top of its body so the very next user keystroke triggers normally.
//
// 3. FIELD POPULATION
//    The parent passes `initialValue` which is used for *both* the edit-mode
//    seed value and the post-selection display value. The child must re-sync
//    when `initialValue` changes (e.g. the parent opens the edit form for a
//    saved address). This is preserved. The `onPlaceSelected` callback in the
//    parent calls `form.setFieldsValue` which populates postal code, city, and
//    country automatically.
//
// 4. MIN_QUERY_LENGTH lowered to 2
//    Suggestions appear one character sooner, which matches the UX goal of
//    "display with every key pressed".
// ---------------------------------------------------------------------------

const AddressAutocomplete = React.memo(
  ({
    googleMapsApiKey,
    onPlaceSelected,
    initialValue = "",
    error = "",
    isFormVisible = false,
    resetTrigger = 0,
  }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [localInputError, setLocalInputError] = useState(error);

    // Refs that must NOT trigger re-renders
    const sessionTokenRef = useRef(createPlacesSessionToken());
    // Monotonically increasing ID; only the latest request may commit its results.
    const latestRequestIdRef = useRef(0);
    // Set to `true` synchronously when the user picks a suggestion so the
    // debounce effect skips the synthetic inputValue change it causes.
    const selectionInProgressRef = useRef(false);
    const blurTimeoutRef = useRef(null);
    const autocompleteAbortControllerRef = useRef(null);
    const detailsAbortControllerRef = useRef(null);
    const inputRef = useRef(null);

    // ── Sync external props ────────────────────────────────────────────────

    useEffect(() => {
      setInputValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      setLocalInputError(error);
    }, [error]);

    useEffect(() => {
      if (resetTrigger > 0) {
        // Cancel any in-flight requests
        autocompleteAbortControllerRef.current?.abort();
        detailsAbortControllerRef.current?.abort();
        latestRequestIdRef.current += 1; // invalidate any queued callbacks
        selectionInProgressRef.current = false;
        setInputValue("");
        setSuggestions([]);
        setIsOpen(false);
        setIsFetching(false);
        setFetchError(false);
      }
    }, [resetTrigger]);

    useEffect(() => {
      if (!isFormVisible) return;

      const focusTimer = setTimeout(() => {
        inputRef.current?.focus?.({
          cursor: "end",
        });
      }, 0);

      return () => clearTimeout(focusTimer);
    }, [isFormVisible]);

    // ── Close suggestions list cleanly ────────────────────────────────────

    const closeSuggestions = useCallback(() => {
      autocompleteAbortControllerRef.current?.abort();
      autocompleteAbortControllerRef.current = null;
      latestRequestIdRef.current += 1;
      setSuggestions([]);
      setIsOpen(false);
      setIsFetching(false);
    }, []);

    // ── Input event handlers ───────────────────────────────────────────────

    const handleInputChange = useCallback(
      (e) => {
        const next = e.target.value;
        // Any manual keystroke clears the selection-in-progress guard so
        // the debounce effect runs normally on the new value.
        selectionInProgressRef.current = false;
        setInputValue(next);
        if (localInputError && next.trim()) setLocalInputError("");
        // Keep the dropdown open while the user continues typing
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = null;
        }
      },
      [localInputError]
    );

    const handleInputFocus = useCallback(() => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      if (suggestions.length > 0) setIsOpen(true);
    }, [suggestions.length]);

    const handleInputBlur = useCallback(() => {
      blurTimeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }, []);

    // ── Select a suggestion → fetch place details ─────────────────────────

    const handleSuggestionSelect = useCallback(
      (suggestion) => {
        if (
          !googleMapsApiKey ||
          (!suggestion?.placeId && !suggestion?.placeResourceName)
        )
          return;

        // Cancel any pending autocomplete request
        autocompleteAbortControllerRef.current?.abort();
        autocompleteAbortControllerRef.current = null;
        detailsAbortControllerRef.current?.abort();

        const controller = new AbortController();
        detailsAbortControllerRef.current = controller;

        setIsFetching(true);
        setIsOpen(false); // close dropdown immediately on selection

        const placeResourcePath =
          suggestion.placeResourceName || `places/${suggestion.placeId}`;

        fetch(
          `${PLACES_API_BASE_URL}/${placeResourcePath}?languageCode=en`,
          {
            method: "GET",
            headers: {
              "X-Goog-Api-Key": googleMapsApiKey,
              "X-Goog-FieldMask": PLACE_DETAILS_FIELD_MASK,
            },
            signal: controller.signal,
          }
        )
          .then(async (res) => {
            const payload = await res.json().catch(() => ({}));
            if (!res.ok)
              throw new Error(
                payload?.error?.message ?? "Failed to fetch place details"
              );
            return payload;
          })
          .then((place) => {
            const normalized = normalizeGooglePlace(place);

            // Mark that the upcoming inputValue change comes from a selection,
            // not from user typing, so the autocomplete effect skips it.
            selectionInProgressRef.current = true;

            setInputValue(normalized.address || suggestion.description);
            setLocalInputError("");
            setSuggestions([]);
            setFetchError(false);

            // Rotate the session token after a billable Place Details call
            sessionTokenRef.current = createPlacesSessionToken();

            // Notify parent to populate the remaining form fields
            onPlaceSelected(normalized, suggestion.description);
          })
          .catch((err) => {
            if (!controller.signal.aborted) {
              console.error("Place details request failed:", err);
              setFetchError(true);
            }
          })
          .finally(() => {
            if (!controller.signal.aborted) setIsFetching(false);
          });
      },
      [googleMapsApiKey, onPlaceSelected]
    );

    // ── Debounced autocomplete fetch ───────────────────────────────────────
    //
    // Runs whenever `inputValue` or `isFormVisible` changes.
    // Guards:
    //   • form must be visible
    //   • API key must be present
    //   • value must meet minimum length
    //   • must NOT be a selection-driven change (selectionInProgressRef)
    //
    // Race-condition fix: we increment `latestRequestIdRef` synchronously
    // *inside* the timeout callback, capture that value, and only allow the
    // fetch's `.then()` handlers to run when the captured ID still equals the
    // ref. Any subsequent keystroke increments the ref again, automatically
    // invalidating in-flight callbacks without needing explicit AbortController
    // cancellation (though we still abort the HTTP request to save bandwidth).

    useEffect(() => {
      // If this change came from a selection, skip — reset the flag and bail.
      if (selectionInProgressRef.current) {
        selectionInProgressRef.current = false;
        return;
      }

      if (!isFormVisible) {
        closeSuggestions();
        return;
      }

      if (!googleMapsApiKey) {
        setFetchError(true);
        closeSuggestions();
        return;
      }

      const query = inputValue?.trim() ?? "";

      if (query.length < MIN_QUERY_LENGTH) {
        closeSuggestions();
        return;
      }

      // Debounce: clear any pending timer from the previous keystroke.
      const timerId = setTimeout(() => {
        // ── RACE-CONDITION GUARD ──────────────────────────────────────────
        // Increment the counter here, inside the callback, so it only advances
        // when a debounced request actually fires (not on every keystroke).
        const requestId = ++latestRequestIdRef.current;

        // Abort any still-running HTTP request from the previous debounce cycle.
        autocompleteAbortControllerRef.current?.abort();
        const controller = new AbortController();
        autocompleteAbortControllerRef.current = controller;

        setIsFetching(true);

        fetch(PLACES_AUTOCOMPLETE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": googleMapsApiKey,
            "X-Goog-FieldMask": PLACE_AUTOCOMPLETE_FIELD_MASK,
          },
          body: JSON.stringify({
            input: query,
            sessionToken: sessionTokenRef.current,
          }),
          signal: controller.signal,
        })
          .then(async (res) => {
            const payload = await res.json().catch(() => ({}));
            if (!res.ok)
              throw new Error("Failed to fetch address suggestions");
            return payload;
          })
          .then((payload) => {
            // Only commit if this is still the latest request.
            if (requestId !== latestRequestIdRef.current) return;

            const predictions = (payload?.suggestions ?? [])
              .map((item) => item?.placePrediction)
              .filter(Boolean)
              .map((p) => ({
                placeId: p.placeId,
                placeResourceName: p.place,
                description:
                  p.text?.text ||
                  [
                    p.structuredFormat?.mainText?.text,
                    p.structuredFormat?.secondaryText?.text,
                  ]
                    .filter(Boolean)
                    .join(", "),
                primaryText:
                  p.structuredFormat?.mainText?.text || p.text?.text || "",
                secondaryText:
                  p.structuredFormat?.secondaryText?.text || "",
              }));

            setSuggestions(predictions);
            setIsOpen(predictions.length > 0);
            setFetchError(false);
          })
          .catch((err) => {
            // Ignore aborted requests and stale responses.
            if (
              controller.signal.aborted ||
              requestId !== latestRequestIdRef.current
            )
              return;
            console.error("Autocomplete request failed:", err);
            setSuggestions([]);
            setIsOpen(false);
            setFetchError(true);
          })
          .finally(() => {
            if (
              !controller.signal.aborted &&
              requestId === latestRequestIdRef.current
            ) {
              setIsFetching(false);
            }
          });
      }, AUTOCOMPLETE_DEBOUNCE_MS);

      // Cleanup: cancel the debounce timer if the value changes again before
      // it fires. This is the classic debounce pattern — correct and sufficient.
      return () => clearTimeout(timerId);
    }, [inputValue, isFormVisible, googleMapsApiKey, closeSuggestions]);

    // ── Render ─────────────────────────────────────────────────────────────

    return (
      <div className="form__field__wrapper">
        <label className="input__label">Address</label>
        <div className="address__autocomplete">
          <Input
            ref={inputRef}
            placeholder="Start typing your address"
            className={`address__input ${localInputError ? "has__error" : ""}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            // Prevent keyboard events from bubbling to parent modal shortcuts
            onKeyDown={(e) => e.stopPropagation()}
            autoComplete="off"
            suffix={isFetching ? <Spin size="small" /> : null}
          />

          {isOpen && suggestions.length > 0 && (
            <div className="address__suggestions" role="listbox">
              {suggestions.map((s) => (
                <button
                  key={s.placeId}
                  type="button"
                  role="option"
                  className="address__suggestion"
                  // onMouseDown prevents the input blur from firing before onClick
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionSelect(s)}
                >
                  <span className="address__suggestion__primary">
                    {s.primaryText}
                  </span>
                  {s.secondaryText && (
                    <span className="address__suggestion__secondary">
                      {s.secondaryText}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {localInputError && (
          <p className="address__error__text">{localInputError}</p>
        )}

        <p className="address__helper__text">
          {fetchError
            ? "Google address suggestions are unavailable right now. You can still enter the address manually."
            : "Choose a Google suggestion to auto-fill the address details, or continue typing manually."}
        </p>
      </div>
    );
  }
);

AddressAutocomplete.displayName = "AddressAutocomplete";

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// ---------------------------------------------------------------------------
// PaymentModal
// ---------------------------------------------------------------------------

export default function PaymentModal({
  isOpen,
  setIsOpen,
  subtotal = 0,
  cartItems = [],
}) {
  const router = useRouter();

  useEffect(() => {
    if (document.requestStorageAccess) {
      document.requestStorageAccess().catch(() => {});
    }
  }, []);

  const { dispatch, user, setBuyNowItem } = useMainContext();
  const [form] = Form.useForm();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [isLoadingShippingFee, setIsLoadingShippingFee] = useState(false);
  const [addressInputValue, setAddressInputValue] = useState("");
  const [addressInputError, setAddressInputError] = useState("");
  const [addressResetTrigger, setAddressResetTrigger] = useState(0);

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const { data: addressesData, isLoading: isLoadingAddresses } =
    useBuyerAddresses();
  const createAddress = useCreateBuyerAddress();
  const updateAddress = useUpdateBuyerAddress();
  const deleteAddress = useDeleteBuyerAddress();
  const getShippingFee = useGetShippingFee();
  const createPaymentIntent = useCreatePaymentIntent();

  const addresses = useMemo(
    () => addressesData?.body ?? [],
    [addressesData]
  );
  const shippingFee = shippingInfo?.totalPriceUSD ?? 0;
  const total = subtotal + shippingFee;
  const maxAddresses = 3;
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const isAddressFormVisible = showAddForm || isEditing;

  // ── Helpers ──────────────────────────────────────────────────────────────

  const resetAddressAutocomplete = useCallback(() => {
    setAddressResetTrigger((prev) => prev + 1);
    setAddressInputValue("");
    setAddressInputError("");
  }, []);

  // ── Place selected → populate all form fields ─────────────────────────────
  //
  // This is the single source of truth for auto-filling postal code, city, and
  // country after the user picks a Google suggestion. `form.setFieldsValue` is
  // called with all three fields so AntD Form considers them "touched" and
  // renders the values immediately.

  const handlePlaceSelected = useCallback(
    (normalizedPlace, description) => {
      const supportedCountry = COUNTRIES.find(
        (c) =>
          c.code.toUpperCase() ===
          normalizedPlace.countryCode?.toUpperCase()
      );

      // Update the uncontrolled address string that lives outside AntD Form
      setAddressInputValue(normalizedPlace.address || description);
      setAddressInputError("");

      const nextFields = {
        // Postal/ZIP code
        postalCode: normalizedPlace.postalCode || "",
        // City
        cityName: normalizedPlace.cityName || "",
        // Country — populate only if it's in the supported list
        ...(supportedCountry
          ? {
              country: supportedCountry.code,
              countryCode: supportedCountry.code,
              countryName: supportedCountry.name,
            }
          : {}),
      };

      form.setFieldsValue(nextFields);
    },
    [form]
  );

  // ── Shipping fee ──────────────────────────────────────────────────────────

  const fetchShippingFee = useCallback(
    async (addressId) => {
      if (!addressId || cartItems.length === 0) {
        setShippingInfo(null);
        return;
      }
      setIsLoadingShippingFee(true);
      try {
        const response = await getShippingFee.mutateAsync({
          addressId,
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        });
        setShippingInfo(response?.body ?? null);
      } catch (error) {
        dispatch({
          type: TOAST_BOX,
          payload: {
            type: "error",
            message:
              error?.response?.data?.message ?? "Failed to get shipping fee",
          },
        });
        setShippingInfo(null);
      } finally {
        setIsLoadingShippingFee(false);
      }
    },
    [cartItems, dispatch, getShippingFee]
  );

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    setShippingInfo(null);
    fetchShippingFee(addressId);
  };

  // ── Modal open/close lifecycle ────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (addresses.length > 0 && !selectedAddressId) {
        const firstId = addresses[0]._id || addresses[0].id;
        setSelectedAddressId(firstId);
        fetchShippingFee(firstId);
      }
    } else {
      document.body.style.overflow = "unset";
      form.resetFields();
      setIsEditing(false);
      setEditingAddressId(null);
      setSelectedAddressId(null);
      setShowAddForm(false);
      setShippingInfo(null);
      setClientSecret(null);
      setPaymentSummary(null);
      resetAddressAutocomplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Reset autocomplete whenever the address form hides
  useEffect(() => {
    if (!isAddressFormVisible) {
      resetAddressAutocomplete();
    }
  }, [isAddressFormVisible, resetAddressAutocomplete]);

  // ── UI event handlers ─────────────────────────────────────────────────────

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddForm(false);
    setClientSecret(null);
    setPaymentSummary(null);
    resetAddressAutocomplete();
  };

  const handleShowAddForm = () => {
    if (addresses.length >= maxAddresses) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: `You can only add up to ${maxAddresses} addresses`,
        },
      });
      return;
    }
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddForm(true);
    form.resetFields();
    resetAddressAutocomplete();
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
    form.resetFields();
    resetAddressAutocomplete();
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setEditingAddressId(address._id || address.id);
    setShowAddForm(false);
    resetAddressAutocomplete();

    const country = COUNTRIES.find(
      (c) => c.code === address.countryCode || c.name === address.countryName
    );
    form.setFieldsValue({
      postalCode: address.postalCode,
      cityName: address.cityName,
      country: country ? country.code : address.countryCode,
    });
    setAddressInputValue(address.address || "");
    setAddressInputError("");
  };

  const handleCountryChange = (countryCode) => {
    const selected = COUNTRIES.find((c) => c.code === countryCode);
    if (selected) {
      form.setFieldsValue({
        countryCode: selected.code,
        countryName: selected.name,
      });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress.mutateAsync(addressId);
      dispatch({
        type: TOAST_BOX,
        payload: { type: "success", message: "Address deleted successfully" },
      });
      if (selectedAddressId === addressId) {
        const remaining = addresses.filter(
          (a) => (a._id || a.id) !== addressId
        );
        if (remaining.length > 0) {
          const nextId = remaining[0]._id || remaining[0].id;
          handleAddressSelect(nextId);
        } else {
          setSelectedAddressId(null);
          setShippingInfo(null);
        }
      }
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message:
            error?.response?.data?.message ?? "Failed to delete address",
        },
      });
    }
  };

  const handleSubmitAddress = async (values) => {
    const trimmedAddress = addressInputValue.trim();
    if (!trimmedAddress) {
      setAddressInputError("Please enter address");
      return;
    }

    const selectedCountry = COUNTRIES.find((c) => c.code === values.country);
    if (!selectedCountry) {
      dispatch({
        type: TOAST_BOX,
        payload: { type: "error", message: "Please select a valid country" },
      });
      return;
    }

    const addressData = {
      address: trimmedAddress,
      postalCode: values.postalCode,
      cityName: values.cityName,
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
    };

    try {
      if (isEditing && editingAddressId) {
        await updateAddress.mutateAsync({
          addressId: editingAddressId,
          addressData,
        });
        dispatch({
          type: TOAST_BOX,
          payload: { type: "success", message: "Address updated successfully" },
        });
      } else {
        await createAddress.mutateAsync(addressData);
        dispatch({
          type: TOAST_BOX,
          payload: { type: "success", message: "Address added successfully" },
        });
      }
      form.resetFields();
      setIsEditing(false);
      setEditingAddressId(null);
      setShowAddForm(false);
      resetAddressAutocomplete();
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message:
            error?.response?.data?.message ?? "Failed to save address",
        },
      });
    }
  };

  const handleCompletePayment = async () => {
    if (!selectedAddressId) {
      dispatch({
        type: TOAST_BOX,
        payload: { type: "error", message: "Please select a delivery address" },
      });
      return;
    }
    if (!user?._id && !user?.id) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "User not found. Please log in.",
        },
      });
      return;
    }

    try {
      const response = await createPaymentIntent.mutateAsync({
        buyerId: user._id || user.id,
        addressId: selectedAddressId,
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      });

      if (response?.clientSecret) {
        setClientSecret(response.clientSecret);
        setPaymentSummary(response.summary);
      } else {
        dispatch({
          type: TOAST_BOX,
          payload: {
            type: "success",
            message: response?.message ?? "Payment intent created successfully",
          },
        });
        handleCancel();
      }
    } catch (error) {
      let errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create payment intent";

      if (error?.response?.data?.stockIssues?.length > 0) {
        errorMessage = `Insufficient stock for: ${error.response.data.stockIssues
          .map(
            (i) =>
              `${i.productName} (Requested: ${i.requestedQuantity}, Available: ${i.availableStock})`
          )
          .join("; ")}`;
      }

      dispatch({
        type: TOAST_BOX,
        payload: { type: "error", message: errorMessage },
      });
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    dispatch({
      type: TOAST_BOX,
      payload: { type: "success", message: "Payment successful!" },
    });
    if (setBuyNowItem) setBuyNowItem(null);
    handleCancel();
    router.push(
      paymentIntent?.id
        ? `/order-confirmation?payment_intent=${paymentIntent.id}`
        : "/order-confirmation"
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <StyledModal
      title={clientSecret ? "Secure Payment" : "Complete Payment"}
      open={isOpen}
      onCancel={handleCancel}
      centered
      footer={null}
      closable
      width={600}
    >
      <PaymentModalContent>
        {clientSecret &&
        typeof clientSecret === "string" &&
        clientSecret.length > 5 &&
        stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "stripe" } }}
          >
            <StripePaymentForm
              totalAmount={
                paymentSummary?.totalAmount?.dollars ?? total
              }
              onSuccess={handlePaymentSuccess}
              onBack={() => {
                setClientSecret(null);
                setPaymentSummary(null);
              }}
            />
          </Elements>
        ) : (
          <FlexibleDiv
            flexDir="column"
            gap="25px"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* ── Address Selection ── */}
            <div className="address__section">
              <h3 className="section__title">
                <LocationIcon size={18} color="var(--orrsiPrimary)" />
                Select Delivery Address
              </h3>

              {isLoadingAddresses ? (
                <FlexibleDiv justifyContent="center" padding="20px">
                  <Spin size="large" />
                </FlexibleDiv>
              ) : addresses.length === 0 ? (
                <p className="no__address__text">
                  No addresses found. Please add an address below.
                </p>
              ) : (
                <div className="address__list">
                  {addresses.map((addr) => {
                    const addressId = addr._id || addr.id;
                    const isSelected = selectedAddressId === addressId;
                    return (
                      <div
                        key={addressId}
                        className={`address__card ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => handleAddressSelect(addressId)}
                      >
                        <FlexibleDiv
                          justifyContent="space-between"
                          alignItems="flex-start"
                          width="100%"
                        >
                          <FlexibleDiv
                            flexDir="column"
                            gap="4px"
                            flex="1"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            <p className="address__text">{addr.address}</p>
                            <p className="address__details">
                              {addr.cityName}, {addr.postalCode}
                            </p>
                            <p className="address__details">
                              {addr.countryName} ({addr.countryCode})
                            </p>
                          </FlexibleDiv>
                          <FlexibleDiv
                            gap="8px"
                            flexWrap="nowrap"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <button
                              className="icon__button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(addr);
                              }}
                              type="button"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              className="icon__button delete__btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(addressId);
                              }}
                              type="button"
                              disabled={
                                deleteAddress.isPending ||
                                deleteAddress.isLoading
                              }
                            >
                              {deleteAddress.isPending ||
                              deleteAddress.isLoading ? (
                                <Spin size="small" />
                              ) : (
                                <DeleteIcon size={16} />
                              )}
                            </button>
                          </FlexibleDiv>
                        </FlexibleDiv>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Add / Edit Form ── */}
            <div className="address__form__section">
              {!showAddForm && !isEditing ? (
                <FlexibleDiv
                  justifyContent="flex-start"
                  alignItems="center"
                  margin="0"
                >
                  <Button
                    onClick={handleShowAddForm}
                    backgroundColor="var(--orrsiPrimary)"
                    color="var(--orrsiWhite)"
                    radius="8px"
                    height="40px"
                    padding="0px 16px"
                    fontSize="0.9rem"
                    disabled={addresses.length >= maxAddresses}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FlexibleDiv
                      gap="6px"
                      justifyContent="flex-start"
                      alignItems="center"
                      flexWrap="nowrap"
                    >
                      <AddIcon size={16} style={{ margin: 0 }} />
                      <span>Add New Address</span>
                    </FlexibleDiv>
                  </Button>
                  {addresses.length >= maxAddresses && (
                    <p
                      className="max__address__warning"
                      style={{ marginLeft: 12, marginTop: 0 }}
                    >
                      Maximum {maxAddresses} addresses allowed
                    </p>
                  )}
                </FlexibleDiv>
              ) : (
                <>
                  <FlexibleDiv
                    justifyContent="space-between"
                    alignItems="center"
                    margin="0 0 20px 0"
                  >
                    <h3 className="section__title">
                      {isEditing ? "Edit Address" : "Add New Address"}
                    </h3>
                    <button
                      className="cancel__edit__btn"
                      onClick={() => {
                        if (isEditing) {
                          setIsEditing(false);
                          setEditingAddressId(null);
                        } else {
                          handleCancelAddForm();
                        }
                        resetAddressAutocomplete();
                        form.resetFields();
                      }}
                      type="button"
                    >
                      {isEditing ? "Cancel Edit" : "Cancel"}
                    </button>
                  </FlexibleDiv>

                  <Form form={form} onFinish={handleSubmitAddress}>
                    <FlexibleDiv
                      flexDir="column"
                      gap="15px"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      width="100%"
                    >
                      {/* Address autocomplete — initialValue kept in sync by
                          parent so edit-mode pre-fills correctly */}
                      <AddressAutocomplete
                        googleMapsApiKey={googleMapsApiKey}
                        onPlaceSelected={handlePlaceSelected}
                        initialValue={addressInputValue}
                        error={addressInputError}
                        isFormVisible={isAddressFormVisible}
                        resetTrigger={addressResetTrigger}
                      />

                      <FlexibleDiv
                        gap="15px"
                        flexWrap="nowrap"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        width="100%"
                      >
                        <div
                          className="form__field__wrapper"
                          style={{ flex: "1" }}
                        >
                          <label className="input__label">City</label>
                          <Form.Item
                            name="cityName"
                            rules={[
                              {
                                required: true,
                                message: "Please enter city",
                              },
                            ]}
                          >
                            <TextField
                              placeholder="Enter city"
                              borderRadius="10px"
                              className="move__down"
                              width="100%"
                            />
                          </Form.Item>
                        </div>

                        <div
                          className="form__field__wrapper"
                          style={{ flex: "1" }}
                        >
                          <label className="input__label">Postal Code</label>
                          <Form.Item
                            name="postalCode"
                            rules={[
                              {
                                required: true,
                                message: "Please enter postal code",
                              },
                            ]}
                          >
                            <TextField
                              placeholder="Enter postal code"
                              borderRadius="10px"
                              className="move__down"
                              width="100%"
                            />
                          </Form.Item>
                        </div>
                      </FlexibleDiv>

                      <div className="form__field__wrapper">
                        <label className="input__label">Country</label>
                        <Form.Item
                          name="country"
                          rules={[
                            {
                              required: true,
                              message: "Please select a country",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select country"
                            className="country__select"
                            onChange={handleCountryChange}
                            options={countryOptions}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </div>

                      <Button
                        type="submit"
                        htmlType="submit"
                        backgroundColor="var(--orrsiPrimary)"
                        color="var(--orrsiWhite)"
                        radius="10px"
                        height="40px"
                        loading={
                          createAddress.isPending ||
                          createAddress.isLoading ||
                          updateAddress.isPending ||
                          updateAddress.isLoading
                        }
                      >
                        {isEditing ? "Update Address" : "Add Address"}
                      </Button>
                    </FlexibleDiv>
                  </Form>
                </>
              )}
            </div>

            {/* ── Shipping Details ── */}
            {shippingInfo && (
              <div className="shipping__details__compact">
                <FlexibleDiv
                  gap="8px"
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <span className="shipping__badge">
                    📦 {shippingInfo.product}
                  </span>
                  {shippingInfo.estimatedDeliveryDate && (
                    <span className="shipping__badge">
                      🚚 Arrives on or before{" "}
                      {new Date(
                        shippingInfo.estimatedDeliveryDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {shippingInfo.totalTransitDays && (
                    <span className="shipping__badge">
                      ⏱️ {shippingInfo.totalTransitDays}{" "}
                      {shippingInfo.totalTransitDays === 1 ? "day" : "days"}
                    </span>
                  )}
                </FlexibleDiv>
              </div>
            )}

            {/* ── Payment Summary ── */}
            <div className="payment__summary">
              <h3 className="section__title">Payment Summary</h3>
              <FlexibleDiv
                flexDir="column"
                gap="8px"
                className="summary__details"
                justifyContent="flex-start"
                alignItems="stretch"
              >
                <FlexibleDiv
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <p className="summary__label">Subtotal:</p>
                  <p className="summary__value">{formatCurrency(subtotal)}</p>
                </FlexibleDiv>
                <FlexibleDiv
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <p className="summary__label">Shipping Fee:</p>
                  <p className="summary__value">
                    {isLoadingShippingFee ? (
                      <span className="calculating__loader">
                        Calculating<span className="dots" />
                      </span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </p>
                </FlexibleDiv>
                <FlexibleDiv
                  justifyContent="space-between"
                  alignItems="center"
                  className="total__row"
                >
                  <p className="summary__label total__label">Total:</p>
                  <p className="summary__value total__value">
                    {formatCurrency(total)}
                  </p>
                </FlexibleDiv>
              </FlexibleDiv>
            </div>

            {/* ── Complete Payment Button ── */}
            <Button
              onClick={handleCompletePayment}
              backgroundColor={
                !selectedAddressId || !shippingFee || isLoadingShippingFee
                  ? "#ccc"
                  : "linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%)"
              }
              color="var(--orrsiWhite)"
              radius="10px"
              height="48px"
              width="100%"
              fontSize="0.95rem"
              fontWeight="600"
              loading={
                createPaymentIntent.isPending || createPaymentIntent.isLoading
              }
              disabled={
                !selectedAddressId ||
                !shippingFee ||
                isLoadingShippingFee ||
                createPaymentIntent.isPending ||
                createPaymentIntent.isLoading
              }
              style={{
                boxShadow:
                  !selectedAddressId ||
                  !shippingFee ||
                  isLoadingShippingFee ||
                  createPaymentIntent.isPending ||
                  createPaymentIntent.isLoading
                    ? "none"
                    : "0 4px 20px rgba(252, 83, 83, 0.3)",
                transition: "all 0.3s ease",
              }}
              className="complete__payment__btn"
            >
              Complete Payment ({formatCurrency(total)})
            </Button>
          </FlexibleDiv>
        )}
      </PaymentModalContent>
    </StyledModal>
  );
}
