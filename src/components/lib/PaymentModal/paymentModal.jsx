import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
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
} from "@/network/checkout";
import { formatCurrency } from "@/data-helpers/hooks";
import { TOAST_BOX } from "@/context/types";
import { useMainContext } from "@/context";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";
import { Spin } from "antd";
const { TextArea } = Input;

// Common countries list
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


export default function PaymentModal({ isOpen, setIsOpen, subtotal = 0 }) {
  const { dispatch } = useMainContext();
  const [form] = Form.useForm();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: addressesData, isLoading: isLoadingAddresses } =
    useBuyerAddresses();
  const createAddress = useCreateBuyerAddress();
  const updateAddress = useUpdateBuyerAddress();
  const deleteAddress = useDeleteBuyerAddress();

  const addresses = addressesData?.body || [];
  const shippingFee = 0;
  const total = subtotal + shippingFee;
  const maxAddresses = 3;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Select first address by default if available
      if (addresses.length > 0 && !selectedAddressId) {
        setSelectedAddressId(addresses[0]._id || addresses[0].id);
      }
    } else {
      document.body.style.overflow = "unset";
      form.resetFields();
      setIsEditing(false);
      setEditingAddressId(null);
      setSelectedAddressId(null);
      setShowAddForm(false);
    }
  }, [isOpen, addresses.length, form]);

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    setIsEditing(false);
    setEditingAddressId(null);
    setShowAddForm(false);
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
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
    form.resetFields();
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setEditingAddressId(address._id || address.id);
    setShowAddForm(false);
    // Find country code from country name or use existing code
    const country = COUNTRIES.find(
      (c) => c.code === address.countryCode || c.name === address.countryName
    );
    form.setFieldsValue({
      address: address.address,
      postalCode: address.postalCode,
      cityName: address.cityName,
      country: country ? country.code : address.countryCode,
    });
  };

  const handleCountryChange = (countryCode) => {
    const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);
    if (selectedCountry) {
      form.setFieldsValue({
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
      });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress.mutateAsync(addressId);
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: "Address deleted successfully",
        },
      });
      // If deleted address was selected, select first available
      if (selectedAddressId === addressId && addresses.length > 1) {
        const remainingAddresses = addresses.filter(
          (addr) => (addr._id || addr.id) !== addressId
        );
        if (remainingAddresses.length > 0) {
          setSelectedAddressId(
            remainingAddresses[0]._id || remainingAddresses[0].id
          );
        } else {
          setSelectedAddressId(null);
        }
      }
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: error?.response?.data?.message || "Failed to delete address",
        },
      });
    }
  };

  const handleSubmitAddress = async (values) => {
    try {
      // Get country details from selected country code
      const selectedCountry = COUNTRIES.find((c) => c.code === values.country);
      if (!selectedCountry) {
        dispatch({
          type: TOAST_BOX,
          payload: {
            type: "error",
            message: "Please select a valid country",
          },
        });
        return;
      }

      const addressData = {
        address: values.address,
        postalCode: values.postalCode,
        cityName: values.cityName,
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
      };

      if (isEditing && editingAddressId) {
        await updateAddress.mutateAsync({
          addressId: editingAddressId,
          addressData,
        });
        dispatch({
          type: TOAST_BOX,
          payload: {
            type: "success",
            message: "Address updated successfully",
          },
        });
      } else {
        await createAddress.mutateAsync(addressData);
        dispatch({
          type: TOAST_BOX,
          payload: {
            type: "success",
            message: "Address added successfully",
          },
        });
      }
      form.resetFields();
      setIsEditing(false);
      setEditingAddressId(null);
      setShowAddForm(false);
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: error?.response?.data?.message || "Failed to save address",
        },
      });
    }
  };

  const handleCompletePayment = () => {
    if (!selectedAddressId) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Please select a delivery address",
        },
      });
      return;
    }
    // Handle payment completion logic here
    dispatch({
      type: TOAST_BOX,
      payload: {
        type: "success",
        message: "Payment completed successfully",
      },
    });
    handleCancel();
  };

  return (
    <StyledModal
      title="Complete Payment"
      open={isOpen}
      onCancel={handleCancel}
      centered
      footer={null}
      closable={true}
      width={600}
    >
      <PaymentModalContent>
        <FlexibleDiv
          flexDir="column"
          gap="25px"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* Address Selection Section */}
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
                      onClick={() => setSelectedAddressId(addressId)}
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
                              deleteAddress.isPending || deleteAddress.isLoading
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

          {/* Add/Edit Address Form */}
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
                    <AddIcon size={16} style={{ margin: "0px" }} />
                    <span>Add New Address</span>
                  </FlexibleDiv>
                </Button>
                {addresses.length >= maxAddresses && (
                  <p
                    className="max__address__warning"
                    style={{ marginLeft: "12px", marginTop: 0 }}
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
                    <div className="form__field__wrapper">
                      <label className="input__label">Address</label>
                      <Form.Item
                        name="address"
                        rules={[
                          { required: true, message: "Please enter address" },
                        ]}
                      >
                        <TextArea
                          placeholder="Enter street address"
                          rows={3}
                          className="address__textarea"
                        />
                      </Form.Item>
                    </div>

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
                            { required: true, message: "Please enter city" },
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

          {/* Payment Summary */}
          <div className="payment__summary">
            <h3 className="section__title">Payment Summary</h3>
            <FlexibleDiv
              flexDir="column"
              gap="8px"
              className="summary__details"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <FlexibleDiv justifyContent="space-between" alignItems="center">
                <p className="summary__label">Subtotal:</p>
                <p className="summary__value">{formatCurrency(subtotal)}</p>
              </FlexibleDiv>
              <FlexibleDiv justifyContent="space-between" alignItems="center">
                <p className="summary__label">Shipping Fee:</p>
                <p className="summary__value">{formatCurrency(shippingFee)}</p>
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

          {/* Complete Payment Button */}
          <Button
            onClick={handleCompletePayment}
            backgroundColor="var(--orrsiPrimary)"
            color="var(--orrsiWhite)"
            radius="10px"
            height="48px"
            width="100%"
            fontSize="0.95rem"
            fontWeight="600"
            disabled={!selectedAddressId}
            style={{
              background: !selectedAddressId
                ? "#ccc"
                : "linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%)",
              boxShadow: !selectedAddressId
                ? "none"
                : "0 4px 20px rgba(252, 83, 83, 0.3)",
              transition: "all 0.3s ease",
            }}
            className="complete__payment__btn"
          >
            Complete Payment ({formatCurrency(total)})
          </Button>
        </FlexibleDiv>
      </PaymentModalContent>
    </StyledModal>
  );
}
