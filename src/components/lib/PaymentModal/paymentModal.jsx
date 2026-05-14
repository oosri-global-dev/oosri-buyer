import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./StripePaymentForm";
import { Select } from "antd";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StyledModal, PaymentModalContent } from "./paymentModal.styles";
import { FlexibleDiv } from "../Box/styles";
import Button from "../Button";
import TextField from "../TextField";
import { Form } from "antd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdAdd as AddIcon, MdLocationOn as LocationIcon } from "react-icons/md";
import {
  useBuyerAddresses,
  useCreateBuyerAddress,
  useUpdateBuyerAddress,
  useDeleteBuyerAddress,
  useGetShippingFee,
  useCreatePaymentIntent,
  useCreatePaystackCheckout,
} from "@/network/checkout";
import { useFormatPrice } from "@/data-helpers/hooks";
import { TOAST_BOX } from "@/context/types";
import { useMainContext } from "@/context";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useLoadScript } from "@react-google-maps/api";
import AddressAutocompleteField from "./AddressAutocompleteField";

const GOOGLE_MAPS_LIBRARIES = ["places"];

const NIGERIAN_FLAT_RATE_NGN = 2000;

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

const countryOptions = COUNTRIES.map((c) => ({ label: c.name, value: c.code }));
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function loadPaystackScript() {
  if (typeof window === "undefined" || document.getElementById("paystack-inline-script")) return;
  const script = document.createElement("script");
  script.id = "paystack-inline-script";
  script.src = "https://js.paystack.co/v1/inline.js";
  script.async = true;
  document.body.appendChild(script);
}

export default function PaymentModal({ isOpen, setIsOpen, subtotal = 0, cartItems = [] }) {
  const router = useRouter();

  const { isLoaded: isMapsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (document.requestStorageAccess) document.requestStorageAccess().catch(() => {});
  }, []);

  const { dispatch, user, setBuyNowItem, fxRates } = useMainContext();
  const formatPrice = useFormatPrice();
  const [form] = Form.useForm();

  // Address state
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(undefined);
  const [selectedCountryName, setSelectedCountryName] = useState(undefined);
  const watchedCountryCode = Form.useWatch("countryCode", form);

  useEffect(() => {
    setSelectedCountryCode(watchedCountryCode);
    if (!watchedCountryCode) { setSelectedCountryName(undefined); return; }
    const match = COUNTRIES.find((c) => c.code === watchedCountryCode);
    if (match) setSelectedCountryName(match.name);
  }, [watchedCountryCode]);

  const countrySelectOptions = useMemo(() => {
    const opts = [...countryOptions];
    if (selectedCountryCode && !opts.some((o) => o.value === selectedCountryCode)) {
      opts.unshift({ label: selectedCountryName || selectedCountryCode, value: selectedCountryCode });
    }
    return opts;
  }, [selectedCountryCode, selectedCountryName]);

  // Shipping state
  const [shippingInfo, setShippingInfo] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [isLoadingShippingFee, setIsLoadingShippingFee] = useState(false);

  // Stripe state
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const { data: addressesData, isLoading: isLoadingAddresses } = useBuyerAddresses();
  const createAddress = useCreateBuyerAddress();
  const updateAddress = useUpdateBuyerAddress();
  const deleteAddress = useDeleteBuyerAddress();
  const getShippingFee = useGetShippingFee();
  const createPaymentIntent = useCreatePaymentIntent();
  const createPaystackCheckout = useCreatePaystackCheckout();

  const addresses = useMemo(() => addressesData?.body || [], [addressesData?.body]);

  // Derive selected address and Nigerian buyer flag
  const selectedAddress = useMemo(
    () => addresses.find((a) => (a._id || a.id) === selectedAddressId),
    [addresses, selectedAddressId]
  );
  // When add/edit form is open, the form's live country input takes priority over the saved address
  // so the gateway banner reacts instantly as the user types/selects their country.
  const effectiveCountryCode = (showAddForm || isEditing)
    ? (watchedCountryCode || selectedAddress?.countryCode || null)
    : (selectedAddress?.countryCode || null);
  const isNigerianBuyer = effectiveCountryCode === "NG";

  // Shipping calculations
  const shippingEstimates = Array.isArray(shippingInfo?.estimates) ? shippingInfo.estimates : [];
  const selectedShippingOption =
    shippingEstimates.find((e) => e?.serviceType === selectedServiceType) ||
    shippingEstimates[0] ||
    null;
  const shippingFeeUSD = selectedShippingOption?.estimateUSD || shippingInfo?.totalPriceUSD || 0;
  const shippingFeeNGN = isNigerianBuyer ? NIGERIAN_FLAT_RATE_NGN : 0;

  // Ensure subtotal is treated as USD. If the caller accidentally passed an NGN amount
  // (large value with no fxRate hint), normalise it back to USD using the live rate.
  const liveNGNRate = fxRates?.NGN || 1550;
  const subtotalUSD = subtotal > 10000 && subtotal > liveNGNRate
    ? Number((subtotal / liveNGNRate).toFixed(2))
    : subtotal;

  // Derived totals
  const subtotalNGN = Math.round(subtotalUSD * liveNGNRate);
  const totalNGN = subtotalNGN + (isNigerianBuyer ? NIGERIAN_FLAT_RATE_NGN : 0);
  const totalUSD = subtotalUSD + shippingFeeUSD;

  const maxAddresses = 3;

  // Load Paystack script when a Nigerian address is selected
  useEffect(() => {
    if (isNigerianBuyer) loadPaystackScript();
  }, [isNigerianBuyer]);

  const syncAddressFormValues = useCallback(
    ({ address = "", cityName = "", postalCode = "", countryCode, countryName }) => {
      const match = COUNTRIES.find((c) => c.code === countryCode || c.name === countryName);
      const code = match?.code || countryCode || undefined;
      form.setFieldsValue({ address, cityName, postalCode, countryCode: code });
      setSelectedCountryCode(code);
      setSelectedCountryName(match?.name || countryName || code);
    },
    [form]
  );

  const onAddressAutocompleteSelect = useCallback(
    (sel) => syncAddressFormValues(sel || {}),
    [syncAddressFormValues]
  );

  const fetchShippingFee = useCallback(
    async (addressId, preferredServiceType = null) => {
      if (!addressId || cartItems.length === 0) {
        setShippingInfo(null);
        setSelectedServiceType(null);
        return;
      }

      // Nigerian buyers get flat rate — no API call needed
      const addr = addresses.find((a) => (a._id || a.id) === addressId);
      if (addr?.countryCode === "NG") {
        const flatRateUSD = Number((NIGERIAN_FLAT_RATE_NGN / liveNGNRate).toFixed(2));
        setShippingInfo({
          totalPriceNGN: NIGERIAN_FLAT_RATE_NGN,
          totalPriceUSD: flatRateUSD,
          currency: "NGN",
          provider: "FLAT_RATE",
          providerDisplayName: "Standard Delivery",
          productCode: "NG_FLAT_RATE",
          selectedServiceType: "NG_FLAT_RATE",
          totalTransitDays: 3,
          description: "Standard flat-rate delivery within Nigeria (3–5 business days)",
          features: ["Door-to-door delivery", "SMS tracking updates"],
          estimates: [],
        });
        setSelectedServiceType("NG_FLAT_RATE");
        return;
      }

      setIsLoadingShippingFee(true);
      try {
        const payload = {
          addressId,
          ...(preferredServiceType ? { serviceType: preferredServiceType } : {}),
          items: cartItems.map((item) => ({ productId: item._id, quantity: item.quantity })),
        };
        const response = await getShippingFee.mutateAsync(payload);
        const next = response?.body || null;
        setShippingInfo(next);
        setSelectedServiceType(
          next?.selectedServiceType || next?.productCode || next?.estimates?.[0]?.serviceType || null
        );
      } catch (error) {
        dispatch({
          type: TOAST_BOX,
          payload: { type: "error", message: error?.response?.data?.message || "Failed to get shipping fee" },
        });
        setShippingInfo(null);
        setSelectedServiceType(null);
      } finally {
        setIsLoadingShippingFee(false);
      }
    },
    [cartItems, dispatch, getShippingFee, addresses, liveNGNRate]
  );

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    setShippingInfo(null);
    setSelectedServiceType(null);
    fetchShippingFee(addressId);
  };

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
      setSelectedCountryCode(undefined);
      setSelectedCountryName(undefined);
      setIsEditing(false);
      setEditingAddressId(null);
      setSelectedAddressId(null);
      setShowAddForm(false);
      setShippingInfo(null);
      setSelectedServiceType(null);
      setClientSecret(null);
      setPaymentSummary(null);
    }
  }, [isOpen, addresses, selectedAddressId, fetchShippingFee, form]);

  const handleCancel = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    form.resetFields();
    setSelectedCountryCode(undefined);
    setSelectedCountryName(undefined);
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddForm(false);
    setSelectedServiceType(null);
    setClientSecret(null);
    setPaymentSummary(null);
  };

  const handleShowAddForm = () => {
    if (addresses.length >= maxAddresses) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: `You can only add up to ${maxAddresses} addresses` } });
      return;
    }
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddForm(true);
    form.resetFields();
    setSelectedCountryCode(undefined);
    setSelectedCountryName(undefined);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
    form.resetFields();
    setSelectedCountryCode(undefined);
    setSelectedCountryName(undefined);
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setEditingAddressId(address._id || address.id);
    setShowAddForm(false);
    syncAddressFormValues({
      address: address.address,
      postalCode: address.postalCode,
      cityName: address.cityName,
      countryCode: address.countryCode,
      countryName: address.countryName,
    });
  };

  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
    const match = COUNTRIES.find((c) => c.code === code);
    setSelectedCountryName(match?.name || code);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress.mutateAsync(addressId);
      dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address deleted successfully" } });
      if (selectedAddressId === addressId && addresses.length > 1) {
        const remaining = addresses.filter((a) => (a._id || a.id) !== addressId);
        if (remaining.length > 0) {
          const nextId = remaining[0]._id || remaining[0].id;
          handleAddressSelect(nextId);
        } else {
          setSelectedAddressId(null);
          setShippingInfo(null);
        }
      }
    } catch (error) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: error?.response?.data?.message || "Failed to delete address" } });
    }
  };

  const handleSubmitAddress = async (values) => {
    try {
      const resolvedCode = values.countryCode || selectedCountryCode;
      if (!resolvedCode) {
        dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please select a country" } });
        return;
      }
      const match = COUNTRIES.find((c) => c.code === resolvedCode);
      const addressData = {
        address: values.address,
        postalCode: values.postalCode,
        cityName: values.cityName,
        countryCode: match?.code || resolvedCode,
        countryName: match?.name || selectedCountryName || resolvedCode,
      };
      if (isEditing && editingAddressId) {
        await updateAddress.mutateAsync({ addressId: editingAddressId, addressData });
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address updated successfully" } });
      } else {
        await createAddress.mutateAsync(addressData);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address added successfully" } });
      }
      form.resetFields();
      setSelectedCountryCode(undefined);
      setSelectedCountryName(undefined);
      setIsEditing(false);
      setEditingAddressId(null);
      setShowAddForm(false);
    } catch (error) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: error?.response?.data?.message || "Failed to save address" } });
    }
  };

  // ── Stripe payment ─────────────────────────────────────────────────────────
  const handleCompletePayment = async () => {
    if (!selectedAddressId) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please select a delivery address" } });
      return;
    }
    if (!user?._id && !user?.id) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "User not found. Please log in." } });
      return;
    }
    try {
      const payload = {
        buyerId: user._id || user.id,
        addressId: selectedAddressId,
        serviceType: selectedServiceType || selectedShippingOption?.serviceType || shippingInfo?.productCode,
        items: cartItems.map((item) => ({ productId: item._id, quantity: item.quantity })),
      };
      const response = await createPaymentIntent.mutateAsync(payload);
      if (response?.clientSecret) {
        setClientSecret(response.clientSecret);
        setPaymentSummary(response.summary);
      } else {
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: response?.message || "Payment intent created" } });
        handleCancel();
      }
    } catch (error) {
      let msg = error?.response?.data?.message || error?.response?.data?.error || "Failed to create payment intent";
      if (error?.response?.data?.stockIssues?.length > 0) {
        msg = `Insufficient stock: ${error.response.data.stockIssues.map((i) => `${i.productName} (Available: ${i.availableStock})`).join("; ")}`;
      }
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: msg } });
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Payment successful!" } });
    if (setBuyNowItem) setBuyNowItem(null);
    handleCancel();
    router.push(paymentIntent?.id ? `/order-confirmation?payment_intent=${paymentIntent.id}` : "/order-confirmation");
  };

  // ── Paystack payment ───────────────────────────────────────────────────────
  const handlePaystackPayment = async () => {
    if (!selectedAddressId) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please select a delivery address" } });
      return;
    }
    if (!user?._id && !user?.id) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please log in to complete payment" } });
      return;
    }
    try {
      const payload = {
        buyerId: user._id || user.id,
        addressId: selectedAddressId,
        items: cartItems.map((item) => ({ productId: item._id, quantity: item.quantity })),
      };
      const response = await createPaystackCheckout.mutateAsync(payload);
      const { authorizationUrl, reference } = response?.body || response || {};

      if (!authorizationUrl || !reference) throw new Error("Paystack did not return a payment URL");

      if (typeof window !== "undefined" && window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: totalNGN * 100,
          currency: "NGN",
          ref: reference,
          onClose: () => {
            dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Payment cancelled" } });
          },
          callback: () => {
            if (setBuyNowItem) setBuyNowItem(null);
            handleCancel();
            router.push(`/order-confirmation?paystack_reference=${reference}`);
          },
        });
        handler.openIframe();
      } else {
        window.location.href = authorizationUrl;
      }
    } catch (error) {
      let msg = error?.response?.data?.message || error?.message || "Failed to initiate Paystack payment";
      if (error?.response?.data?.stockIssues?.length > 0) {
        msg = `Insufficient stock: ${error.response.data.stockIssues.map((i) => `${i.productName} (Available: ${i.availableStock})`).join("; ")}`;
      }
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: msg } });
    }
  };

  const isPaymentReady = !!selectedAddressId && !!shippingInfo && !isLoadingShippingFee;

  return (
    <StyledModal
      title={clientSecret ? "Secure Payment" : "Checkout"}
      open={isOpen}
      onCancel={handleCancel}
      centered
      footer={null}
      closable={true}
      width={620}
    >
      <PaymentModalContent>
        {clientSecret && typeof clientSecret === "string" && clientSecret.length > 5 && stripePromise ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
            <StripePaymentForm
              totalAmount={paymentSummary?.totalAmount?.dollars || totalUSD}
              onSuccess={handlePaymentSuccess}
              onBack={() => { setClientSecret(null); setPaymentSummary(null); }}
            />
          </Elements>
        ) : (
          <FlexibleDiv flexDir="column" gap="20px" justifyContent="flex-start" alignItems="flex-start">

            {/* ── 1. Address Section ─────────────────────────────────── */}
            <div className="address__section">
              <h3 className="section__title">
                <LocationIcon size={18} color="var(--orrsiPrimary)" />
                Delivery Address
              </h3>
              {isLoadingAddresses ? (
                <SkeletonTheme baseColor="rgba(148,148,148,0.1)" highlightColor="rgba(202,202,202,0.4)">
                  <FlexibleDiv flexDir="column" gap="10px" alignItems="stretch">
                    {[1, 2].map((i) => (
                      <div key={i} style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid #f0f0f0" }}>
                        <Skeleton style={{ width: "70%", height: 13, marginBottom: 6 }} />
                        <Skeleton style={{ width: "45%", height: 11, marginBottom: 4 }} />
                        <Skeleton style={{ width: "30%", height: 11 }} />
                      </div>
                    ))}
                  </FlexibleDiv>
                </SkeletonTheme>
              ) : addresses.length === 0 ? (
                <p className="no__address__text">No addresses found. Add one below.</p>
              ) : (
                <div className="address__list">
                  {addresses.map((addr) => {
                    const addressId = addr._id || addr.id;
                    const isSelected = selectedAddressId === addressId;
                    return (
                      <div
                        key={addressId}
                        className={`address__card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleAddressSelect(addressId)}
                      >
                        <FlexibleDiv justifyContent="space-between" alignItems="flex-start" width="100%">
                          <FlexibleDiv flexDir="column" gap="4px" flex="1" justifyContent="flex-start" alignItems="flex-start">
                            <p className="address__text">{addr.address}</p>
                            <p className="address__details">{addr.cityName}, {addr.postalCode}</p>
                            <p className="address__details">{addr.countryName} ({addr.countryCode})</p>
                            {addr.countryCode === "NG" && (
                              <span className="address__tag paystack__tag">🇳🇬 Paystack • ₦{NIGERIAN_FLAT_RATE_NGN.toLocaleString()} flat shipping</span>
                            )}
                            {addr.countryCode !== "NG" && (
                              <span className="address__tag stripe__tag">🌍 Stripe • DHL / Haulam shipping</span>
                            )}
                          </FlexibleDiv>
                          <FlexibleDiv gap="8px" flexWrap="nowrap" justifyContent="flex-start" alignItems="center">
                            <button className="icon__button" onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }} type="button">
                              <EditIcon size={16} />
                            </button>
                            <button
                              className="icon__button delete__btn"
                              onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addressId); }}
                              type="button"
                              disabled={deleteAddress.isPending || deleteAddress.isLoading}
                            >
                              {deleteAddress.isPending || deleteAddress.isLoading ? <Spin size="small" /> : <DeleteIcon size={16} />}
                            </button>
                          </FlexibleDiv>
                        </FlexibleDiv>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Add/Edit Address Form ──────────────────────────────── */}
            <div className="address__form__section">
              {!showAddForm && !isEditing ? (
                <FlexibleDiv justifyContent="flex-start" alignItems="center" margin="0">
                  <Button
                    onClick={handleShowAddForm}
                    backgroundColor="var(--orrsiPrimary)"
                    color="var(--orrsiWhite)"
                    radius="8px"
                    height="40px"
                    padding="0px 16px"
                    fontSize="0.9rem"
                    disabled={addresses.length >= maxAddresses}
                  >
                    <FlexibleDiv gap="6px" justifyContent="flex-start" alignItems="center" flexWrap="nowrap">
                      <AddIcon size={16} style={{ margin: 0 }} />
                      <span>Add New Address</span>
                    </FlexibleDiv>
                  </Button>
                  {addresses.length >= maxAddresses && (
                    <p className="max__address__warning" style={{ marginLeft: 12, marginTop: 0 }}>
                      Maximum {maxAddresses} addresses allowed
                    </p>
                  )}
                </FlexibleDiv>
              ) : (
                <>
                  <FlexibleDiv justifyContent="space-between" alignItems="center" margin="0 0 20px 0">
                    <h3 className="section__title">{isEditing ? "Edit Address" : "Add New Address"}</h3>
                    <button
                      className="cancel__edit__btn"
                      onClick={() => {
                        if (isEditing) { setIsEditing(false); setEditingAddressId(null); }
                        else handleCancelAddForm();
                        form.resetFields();
                        setSelectedCountryCode(undefined);
                        setSelectedCountryName(undefined);
                      }}
                      type="button"
                    >
                      {isEditing ? "Cancel Edit" : "Cancel"}
                    </button>
                  </FlexibleDiv>
                  <Form form={form} onFinish={handleSubmitAddress}>
                    <FlexibleDiv flexDir="column" gap="15px" justifyContent="flex-start" alignItems="stretch" width="100%">
                      <div className="form__field__wrapper">
                        <label className="input__label">Address</label>
                        <Form.Item name="address" rules={[{ required: true, message: "Please enter address" }]}>
                          <AddressAutocompleteField onAddressSelect={onAddressAutocompleteSelect} placeholder="Start typing your address..." disabled={!isMapsLoaded} />
                        </Form.Item>
                      </div>
                      <FlexibleDiv gap="15px" flexWrap="nowrap" justifyContent="flex-start" alignItems="flex-start" width="100%">
                        <div className="form__field__wrapper" style={{ flex: 1 }}>
                          <label className="input__label">City</label>
                          <Form.Item name="cityName" rules={[{ required: true, message: "Please enter city" }]}>
                            <TextField placeholder="Auto-filled from address" borderRadius="10px" width="100%" />
                          </Form.Item>
                        </div>
                        <div className="form__field__wrapper" style={{ flex: 1 }}>
                          <label className="input__label">Postal Code</label>
                          <Form.Item name="postalCode" rules={[{ required: true, message: "Please enter postal code" }]}>
                            <TextField placeholder="Auto-filled from address" borderRadius="10px" width="100%" />
                          </Form.Item>
                        </div>
                      </FlexibleDiv>
                      <div className="form__field__wrapper">
                        <label className="input__label">Country</label>
                        <Form.Item name="countryCode" rules={[{ required: true, message: "Please select a country" }]}>
                          <Select
                            placeholder="Auto-filled from address"
                            className="country__select"
                            onChange={handleCountryChange}
                            options={countrySelectOptions}
                            showSearch
                            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
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
                        loading={createAddress.isPending || createAddress.isLoading || updateAddress.isPending || updateAddress.isLoading}
                      >
                        {isEditing ? "Update Address" : "Add Address"}
                      </Button>
                    </FlexibleDiv>
                  </Form>
                </>
              )}
            </div>

            {/* ── 2. Payment Gateway Banner ──────────────────────────── */}
            {(selectedAddress || effectiveCountryCode) && (
              <div className={`gateway__banner ${isNigerianBuyer ? "paystack" : "stripe"}`}>
                {isNigerianBuyer ? (
                  <>
                    <span className="gateway__icon">🇳🇬</span>
                    <div className="gateway__info">
                      <p className="gateway__name">Paystack</p>
                      <p className="gateway__desc">Secure Nigerian payment — cards, bank transfer, USSD</p>
                    </div>
                    <span className="gateway__badge">Selected</span>
                  </>
                ) : (
                  <>
                    <span className="gateway__icon">💳</span>
                    <div className="gateway__info">
                      <p className="gateway__name">Stripe</p>
                      <p className="gateway__desc">Secure international payment — all major cards</p>
                    </div>
                    <span className="gateway__badge">Selected</span>
                  </>
                )}
              </div>
            )}

            {/* ── 3. Shipping Section ────────────────────────────────── */}
            {(selectedAddress || (isNigerianBuyer && (showAddForm || isEditing))) && (
              <div className="shipping__details__compact">
                <h3 className="section__title" style={{ marginBottom: 12 }}>🚚 Delivery</h3>
                {isLoadingShippingFee ? (
                  <FlexibleDiv gap="10px" justifyContent="flex-start" alignItems="center">
                    <Spin size="small" />
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>Calculating delivery…</span>
                  </FlexibleDiv>
                ) : shippingInfo ? (
                  <>
                    <FlexibleDiv gap="8px" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                      {isNigerianBuyer ? (
                        <>
                          <span className="shipping__badge">📦 Standard Delivery</span>
                          <span className="shipping__badge">⏱ 3–5 business days</span>
                          <span className="shipping__badge">₦{NIGERIAN_FLAT_RATE_NGN.toLocaleString()} flat rate</span>
                        </>
                      ) : (
                        <>
                          {shippingInfo.providerDisplayName && <span className="shipping__badge">🚛 via {shippingInfo.providerDisplayName}</span>}
                          {shippingInfo.totalTransitDays && <span className="shipping__badge">⏱ {shippingInfo.totalTransitDays} day{shippingInfo.totalTransitDays !== 1 ? "s" : ""}</span>}
                          <span className="shipping__badge">{formatPrice(shippingFeeUSD)}</span>
                        </>
                      )}
                    </FlexibleDiv>
                    {shippingInfo.description && <p className="shipping__service__description" style={{ marginTop: 8 }}>{shippingInfo.description}</p>}
                  </>
                ) : isNigerianBuyer ? (
                  <FlexibleDiv gap="8px" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                    <span className="shipping__badge">📦 Standard Delivery</span>
                    <span className="shipping__badge">⏱ 3–5 business days</span>
                    <span className="shipping__badge">₦{NIGERIAN_FLAT_RATE_NGN.toLocaleString()} flat rate</span>
                  </FlexibleDiv>
                ) : null}
              </div>
            )}

            {/* Multiple shipping options (international only) */}
            {!isNigerianBuyer && shippingEstimates.length > 1 && (
              <div className="shipping__service__section">
                <h3 className="section__title">Select Shipping Service</h3>
                <div className="shipping__service__list">
                  {shippingEstimates.map((est) => {
                    const isSelected = selectedServiceType === est.serviceType;
                    return (
                      <button
                        key={est.serviceType}
                        type="button"
                        className={`shipping__service__card ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedServiceType(est.serviceType)}
                      >
                        <FlexibleDiv justifyContent="space-between" alignItems="center">
                          <p className="shipping__service__name">{est.serviceName}</p>
                          <p className="shipping__service__price">{formatPrice(est.estimateUSD || 0)}</p>
                        </FlexibleDiv>
                        {est.description && <p className="shipping__service__description">{est.description}</p>}
                        {Array.isArray(est.features) && est.features.length > 0 && (
                          <FlexibleDiv className="shipping__service__features" gap="6px" flexWrap="wrap" justifyContent="flex-start">
                            {est.features.map((f) => <span key={f} className="shipping__service__feature">{f}</span>)}
                          </FlexibleDiv>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 4. Payment Summary ─────────────────────────────────── */}
            <div className="payment__summary">
              <h3 className="section__title">Order Summary</h3>
              <FlexibleDiv flexDir="column" gap="8px" className="summary__details" justifyContent="flex-start" alignItems="stretch">
                <FlexibleDiv justifyContent="space-between" alignItems="center">
                  <p className="summary__label">Subtotal:</p>
                  <p className="summary__value">
                    {isNigerianBuyer ? `₦${subtotalNGN.toLocaleString()}` : formatPrice(subtotalUSD)}
                  </p>
                </FlexibleDiv>
                <FlexibleDiv justifyContent="space-between" alignItems="center">
                  <p className="summary__label">Shipping:</p>
                  <p className="summary__value">
                    {isLoadingShippingFee ? (
                      <span className="calculating__loader">Calculating<span className="dots"></span></span>
                    ) : isNigerianBuyer ? (
                      `₦${NIGERIAN_FLAT_RATE_NGN.toLocaleString()}`
                    ) : (
                      formatPrice(shippingFeeUSD)
                    )}
                  </p>
                </FlexibleDiv>
                <FlexibleDiv justifyContent="space-between" alignItems="center" className="total__row">
                  <p className="summary__label total__label">Total:</p>
                  <p className="summary__value total__value">
                    {isNigerianBuyer ? `₦${totalNGN.toLocaleString()}` : formatPrice(totalUSD)}
                  </p>
                </FlexibleDiv>
              </FlexibleDiv>
            </div>

            {/* ── 5. Pay Button ──────────────────────────────────────── */}
            {isNigerianBuyer ? (
              <Button
                onClick={isPaymentReady ? handlePaystackPayment : undefined}
                backgroundColor={isPaymentReady ? "#00b14f" : "#b0bec5"}
                hoverBg={isPaymentReady ? "#00c95a" : "#b0bec5"}
                color="#fff"
                radius="10px"
                height="52px"
                width="100%"
                fontSize="1rem"
                opacity={isPaymentReady ? "1" : "0.65"}
                loading={createPaystackCheckout.isPending || createPaystackCheckout.isLoading}
                disabled={createPaystackCheckout.isPending || createPaystackCheckout.isLoading}
                style={{
                  boxShadow: isPaymentReady ? "0 4px 20px rgba(0, 177, 79, 0.35)" : "none",
                  cursor: !isPaymentReady ? "not-allowed" : "pointer",
                }}
                className="complete__payment__btn"
              >
                🇳🇬 Pay ₦{totalNGN.toLocaleString()} with Paystack
              </Button>
            ) : (
              <Button
                onClick={isPaymentReady ? handleCompletePayment : undefined}
                backgroundColor={isPaymentReady ? "var(--orrsiPrimary)" : "#b0bec5"}
                hoverBg={isPaymentReady ? "#e04040" : "#b0bec5"}
                color="#fff"
                radius="10px"
                height="52px"
                width="100%"
                fontSize="1rem"
                opacity={isPaymentReady ? "1" : "0.65"}
                loading={createPaymentIntent.isPending || createPaymentIntent.isLoading}
                disabled={createPaymentIntent.isPending || createPaymentIntent.isLoading}
                style={{
                  boxShadow: isPaymentReady ? "0 4px 20px rgba(252, 83, 83, 0.3)" : "none",
                  cursor: !isPaymentReady ? "not-allowed" : "pointer",
                }}
                className="complete__payment__btn"
              >
                💳 Pay {formatPrice(totalUSD)} with Stripe
              </Button>
            )}
          </FlexibleDiv>
        )}
      </PaymentModalContent>
    </StyledModal>
  );
}
