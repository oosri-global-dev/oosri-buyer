import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { RFCWrapper } from "./remove-from-cart.styles";
import { FlexibleDiv } from "../Box/styles";
import Button from "../Button";
import { GoHeart as HeartIcon, GoTrash as DeleteIcon } from "react-icons/go";
import { useMainContext } from "@/context";

export default function RemoveFromCartModal({ isOpen, setIsOpen, item }) {
  const { removeFromCart } = useMainContext();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <RFCWrapper>
      <Modal
        title="Remove from cart"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
        closable={false}
        className="modal__style"
      >
        <p className="modal__subtext">
          Are you sure you want to delete this item from your cart?
        </p>
        <FlexibleDiv
          className="cta__section"
          justifyContent="flex-start"
          gap="20px"
        >
          <Button
            className="cta__button"
            height="35px"
            radius="10px"
            backgroundColor="var(--orrsiWhite)"
            hoverBg="var(--orrsiWhite)"
            borderColor="var(--orrsiPrimary) !important"
            color="var(--orrsiPrimary)"
            hoverColor="var(--orrsiPrimary)"
          >
            <HeartIcon size={"18px"} />
            <p>Save for Later</p>
          </Button>
          <Button
            className={`cta__button ${isOpen ? "loading__btn" : ""}`}
            height="35px"
            radius="10px"
            backgroundColor="var(--orrsiPrimary)"
            hoverBg="var(--orrsiPrimary)"
            borderColor="var(--orrsiPrimary) !important"
            color="var(--orrsiWhite)"
            hoverColor="var(--orrsiWhite)"
            loading={isLoadingBtn}
            disabled={isLoadingBtn}
            onClick={() => {
              removeFromCart(item, setIsLoadingBtn, setIsOpen);
              // setIsOpen(false);
            }}
          >
            <DeleteIcon size={"18px"} />
            <p>Remove Item</p>
          </Button>
        </FlexibleDiv>
      </Modal>
    </RFCWrapper>
  );
}
