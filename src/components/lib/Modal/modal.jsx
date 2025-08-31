import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import Lottie from "react-lottie";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: var(--orrsiWhite);
    border-radius: 8px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    display: none;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const DefaultIconContainer = styled.div`
  font-size: 48px;
  color: var(--orrsiPrimary);
`;

const ModalText = styled.p`
  color: var(--orrsiBlack);
  font-size: 18px;
  font-weight: 500;
  margin: 5px 0;
  font-family: "Inter", sans-serif;
`;

const CustomModal = ({ isOpen, content, icon, onCancel, canClose = false, isLottieIcon = false }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <StyledModal
      open={isOpen}
      footer={null}
      closable={canClose}
      onCancel={onCancel}
      centered
      maskClosable={canClose}
    >
      <ModalContent>
        {icon && (
          isLottieIcon ? (
            <Lottie options={defaultOptions} height={100} width={100} />
          ) : (
            <DefaultIconContainer>{icon}</DefaultIconContainer>
          )
        )}
        {content && <ModalText>{content}</ModalText>}
      </ModalContent>
    </StyledModal>
  );
};

export default CustomModal;
