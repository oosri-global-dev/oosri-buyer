import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  padding: 36px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .modal__icon {
    font-size: 2.2rem;
    text-align: center;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: #111;
  }

  p {
    font-size: 0.92rem;
    color: #555;
    text-align: center;
    line-height: 1.7;
    margin: 0;
  }

  a {
    color: var(--orrsiPrimary, #e05555);
    text-decoration: underline;
  }

  .modal__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
  }

  .btn__accept {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: var(--orrsiPrimary, #e05555);
    color: #fff;
    font-size: 0.97rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .btn__accept:hover {
    opacity: 0.88;
  }

  .btn__reject {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: 1.5px solid #ddd;
    background: #fff;
    color: #444;
    font-size: 0.97rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .btn__reject:hover {
    background: #f5f5f5;
  }

  .modal__note {
    font-size: 0.8rem;
    color: #aaa;
    text-align: center;
    margin: 0;
  }
`;

const CONSENT_KEY = "oosri_cookie_consent";

export default function PrivacyConsentModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Must run client-side only
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch (e) {}
    setVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Overlay>
      <ModalBox>
        <div className="modal__icon">🍪</div>
        <h2>We value your privacy</h2>
        <p>
          We use cookies to improve your experience, analyze site traffic, and
          personalize content. By clicking &quot;Accept All&quot;, you consent to our use
          of cookies.
        </p>
        <p>
          Read our{" "}
          <Link href="/privacy-policy" target="_blank">
            Privacy Policy
          </Link>{" "}
          to learn more about how we handle your data.
        </p>
        <div className="modal__buttons">
          <button className="btn__accept" onClick={handleAccept}>
            Accept All
          </button>
          <button className="btn__reject" onClick={handleReject}>
            Reject Non-Essential
          </button>
        </div>
        <p className="modal__note">
          You can update your preferences anytime via our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </ModalBox>
    </Overlay>
  );
}