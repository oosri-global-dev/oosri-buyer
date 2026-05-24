import { useState, useCallback, useMemo } from "react";
import { AddressBookWrapper } from "./address-book.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";
import TextField from "@/components/lib/TextField";
import { Form, Select } from "antd";
import { Spin } from "antd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  useBuyerAddresses,
  useCreateBuyerAddress,
  useUpdateBuyerAddress,
  useDeleteBuyerAddress,
  useSetDefaultAddress,
} from "@/network/checkout";
import { useMainContext } from "@/context";
import { TOAST_BOX } from "@/context/types";
import { IoIosArrowRoundBack as BackIcon } from "react-icons/io";
import { MdEdit as EditIcon, MdDelete as DeleteIcon, MdStar as StarFilledIcon, MdStarOutline as StarOutlineIcon, MdLocationOn as LocationIcon, MdAdd as AddIcon } from "react-icons/md";
import { useLoadScript } from "@react-google-maps/api";
import AddressAutocompleteField from "@/components/lib/PaymentModal/AddressAutocompleteField";

const GOOGLE_MAPS_LIBRARIES = ["places"];

const COUNTRIES = [
  { code: "NG", name: "Nigeria" }, { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" }, { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" }, { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" }, { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" }, { code: "FR", name: "France" },
  { code: "DE", name: "Germany" }, { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" }, { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" }, { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" }, { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" }, { code: "DK", name: "Denmark" },
];
const countryOptions = COUNTRIES.map((c) => ({ label: c.name, value: c.code }));
const MAX_ADDRESSES = 5;

export default function AddressBook({ setCurrentPage }) {
  const { dispatch } = useMainContext();
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(undefined);
  const [selectedCountryName, setSelectedCountryName] = useState(undefined);

  const { isLoaded: isMapsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const { data: addressesData, isLoading } = useBuyerAddresses();
  const createAddress = useCreateBuyerAddress();
  const updateAddress = useUpdateBuyerAddress();
  const deleteAddress = useDeleteBuyerAddress();
  const setDefault = useSetDefaultAddress();

  const addresses = useMemo(() => addressesData?.body || [], [addressesData?.body]);

  const countrySelectOptions = useMemo(() => {
    const opts = [...countryOptions];
    if (selectedCountryCode && !opts.some((o) => o.value === selectedCountryCode)) {
      opts.unshift({ label: selectedCountryName || selectedCountryCode, value: selectedCountryCode });
    }
    return opts;
  }, [selectedCountryCode, selectedCountryName]);

  const syncForm = useCallback(
    ({ address = "", cityName = "", postalCode = "", countryCode, countryName }) => {
      const match = COUNTRIES.find((c) => c.code === countryCode || c.name === countryName);
      const code = match?.code || countryCode || undefined;
      form.setFieldsValue({ address, cityName, postalCode, countryCode: code });
      setSelectedCountryCode(code);
      setSelectedCountryName(match?.name || countryName || code);
    },
    [form]
  );

  const resetForm = useCallback(() => {
    form.resetFields();
    setSelectedCountryCode(undefined);
    setSelectedCountryName(undefined);
    setEditingId(null);
    setShowForm(false);
  }, [form]);

  const handleEdit = (addr) => {
    setEditingId(addr._id || addr.id);
    setShowForm(true);
    syncForm({
      address: addr.address,
      cityName: addr.cityName,
      postalCode: addr.postalCode,
      countryCode: addr.countryCode,
      countryName: addr.countryName,
    });
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress.mutateAsync(addressId);
      dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address deleted" } });
    } catch (err) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: err?.response?.data?.message || "Failed to delete address" } });
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefault.mutateAsync(addressId);
      dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Default address updated" } });
    } catch (err) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: err?.response?.data?.message || "Failed to set default" } });
    }
  };

  const handleSubmit = async (values) => {
    const resolvedCode = values.countryCode || selectedCountryCode;
    if (!resolvedCode) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please select a country" } });
      return;
    }
    const match = COUNTRIES.find((c) => c.code === resolvedCode);
    const payload = {
      address: values.address,
      postalCode: values.postalCode,
      cityName: values.cityName,
      countryCode: match?.code || resolvedCode,
      countryName: match?.name || selectedCountryName || resolvedCode,
    };
    try {
      if (editingId) {
        await updateAddress.mutateAsync({ addressId: editingId, addressData: payload });
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address updated" } });
      } else {
        await createAddress.mutateAsync(payload);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Address saved" } });
      }
      resetForm();
    } catch (err) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: err?.response?.data?.message || "Failed to save address" } });
    }
  };

  const isSaving = createAddress.isPending || createAddress.isLoading || updateAddress.isPending || updateAddress.isLoading;

  return (
    <AddressBookWrapper>
      {/* Back nav */}
      <FlexibleDiv className="top__nav" justifyContent="flex-start">
        <span className="left__section" onClick={() => setCurrentPage("Profile Overview")}>
          <BackIcon size={20} />
          Back
        </span>
      </FlexibleDiv>

      <p className="section__heading">
        <LocationIcon size={18} color="var(--orrsiPrimary)" style={{ verticalAlign: "middle", marginRight: 6 }} />
        Saved Addresses
      </p>

      {/* Address list */}
      {isLoading ? (
        <SkeletonTheme baseColor="rgba(148,148,148,0.1)" highlightColor="rgba(202,202,202,0.4)">
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, padding: "0 10px", boxSizing: "border-box" }}>
            {[1, 2].map((i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid #f0f0f0" }}>
                <Skeleton style={{ width: "70%", height: 13, marginBottom: 6 }} />
                <Skeleton style={{ width: "45%", height: 11, marginBottom: 4 }} />
                <Skeleton style={{ width: "30%", height: 11 }} />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      ) : addresses.length === 0 ? (
        <p className="empty__text">No saved addresses yet. Add one below to speed up future checkouts.</p>
      ) : (
        <div className="address__list">
          {addresses.map((addr) => {
            const id = addr._id || addr.id;
            return (
              <div key={id} className={`address__card${addr.isDefault ? " default__card" : ""}`}>
                <FlexibleDiv justifyContent="space-between" alignItems="flex-start" width="100%">
                  <FlexibleDiv flexDir="column" gap="3px" flex="1" justifyContent="flex-start" alignItems="flex-start">
                    <p className="address__text">{addr.address}</p>
                    <p className="address__details">{addr.cityName}, {addr.postalCode}</p>
                    <p className="address__details">{addr.countryName} ({addr.countryCode})</p>
                    {addr.isDefault && (
                      <span className="default__badge">
                        <StarFilledIcon size={11} color="#f5a623" /> Default
                      </span>
                    )}
                    <span className="payment__tag">
                      {addr.countryCode === "NG" ? "🇳🇬 Paystack · Flat-rate delivery" : "💳 Stripe · Haulam delivery"}
                    </span>
                  </FlexibleDiv>
                  <FlexibleDiv gap="6px" flexWrap="nowrap" alignItems="center">
                    {!addr.isDefault && (
                      <button
                        className="icon__button star__btn"
                        onClick={() => handleSetDefault(id)}
                        title="Set as default"
                        type="button"
                        disabled={setDefault.isPending}
                      >
                        <StarOutlineIcon size={17} />
                      </button>
                    )}
                    <button className="icon__button" onClick={() => handleEdit(addr)} type="button">
                      <EditIcon size={16} />
                    </button>
                    <button
                      className="icon__button delete__btn"
                      onClick={() => handleDelete(id)}
                      type="button"
                      disabled={deleteAddress.isPending || deleteAddress.isLoading}
                    >
                      {(deleteAddress.isPending || deleteAddress.isLoading) ? <Spin size="small" /> : <DeleteIcon size={16} />}
                    </button>
                  </FlexibleDiv>
                </FlexibleDiv>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new / edit form */}
      {!showForm && addresses.length < MAX_ADDRESSES && (
        <div className="add__btn__row">
          <Button
            onClick={() => { setEditingId(null); setShowForm(true); form.resetFields(); }}
            backgroundColor="var(--orrsiPrimary)"
            color="#fff"
            radius="8px"
            height="40px"
            padding="0 16px"
            fontSize="0.88rem"
          >
            <FlexibleDiv gap="6px" flexWrap="nowrap" alignItems="center">
              <AddIcon size={16} />
              <span>Add New Address</span>
            </FlexibleDiv>
          </Button>
        </div>
      )}

      {!showForm && addresses.length >= MAX_ADDRESSES && (
        <p className="max__warning" style={{ paddingLeft: 10 }}>
          Maximum {MAX_ADDRESSES} addresses. Delete one to add another.
        </p>
      )}

      {showForm && (
        <div className="address__form__section">
          <p className="form__section__title">
            {editingId ? "Edit Address" : "Add New Address"}
            <button className="cancel__btn" type="button" onClick={resetForm}>Cancel</button>
          </p>
          <Form form={form} onFinish={handleSubmit}>
            <FlexibleDiv flexDir="column" gap="14px" alignItems="stretch" width="100%">
              <div className="form__field__wrapper">
                <label className="input__label">Address</label>
                <Form.Item name="address" rules={[{ required: true, message: "Please enter address" }]}>
                  <AddressAutocompleteField
                    onAddressSelect={(sel) => syncForm(sel || {})}
                    placeholder="Start typing your address..."
                    disabled={!isMapsLoaded}
                  />
                </Form.Item>
              </div>
              <FlexibleDiv gap="14px" flexWrap="nowrap" alignItems="flex-start" width="100%">
                <div className="form__field__wrapper" style={{ flex: 1 }}>
                  <label className="input__label">City</label>
                  <Form.Item name="cityName" rules={[{ required: true, message: "Required" }]}>
                    <TextField placeholder="City" borderRadius="10px" width="100%" />
                  </Form.Item>
                </div>
                <div className="form__field__wrapper" style={{ flex: 1 }}>
                  <label className="input__label">Postal Code</label>
                  <Form.Item name="postalCode" rules={[{ required: true, message: "Required" }]}>
                    <TextField placeholder="Postal code" borderRadius="10px" width="100%" />
                  </Form.Item>
                </div>
              </FlexibleDiv>
              <div className="form__field__wrapper">
                <label className="input__label">Country</label>
                <Form.Item name="countryCode" rules={[{ required: true, message: "Please select a country" }]}>
                  <Select
                    placeholder="Select country"
                    className="country__select"
                    onChange={(code) => {
                      setSelectedCountryCode(code);
                      const match = COUNTRIES.find((c) => c.code === code);
                      setSelectedCountryName(match?.name || code);
                    }}
                    options={countrySelectOptions}
                    showSearch
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  />
                </Form.Item>
              </div>
              <Button
                htmlType="submit"
                backgroundColor="var(--orrsiPrimary)"
                color="#fff"
                radius="10px"
                height="42px"
                loading={isSaving}
                width="100%"
              >
                {editingId ? "Update Address" : "Save Address"}
              </Button>
            </FlexibleDiv>
          </Form>
        </div>
      )}
    </AddressBookWrapper>
  );
}
