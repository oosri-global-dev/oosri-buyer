import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: ${fadeIn} 0.25s ease-out;
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
  animation: ${slideUp} 0.3s ease-out;

  .modal__icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 4px;
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
    background: var(--orrsiPrimary, #fc5353);
    color: #fff;
    font-size: 0.97rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease, opacity 0.15s ease;
  }

  .btn__accept:active {
    transform: scale(0.98);
  }

  .btn__accept:hover {
    opacity: 0.9;
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
    background: #f9f9f9;
  }

  .modal__note {
    font-size: 0.8rem;
    color: #aaa;
    text-align: center;
    margin: 0;
  }
`;

const CONSENT_KEY = "oosri_cookie_consent";

/**
 * PrivacyConsentModal Component
 * Shows a cookie consent banner if the user hasn't accepted/rejected yet.
 */
export default function PrivacyConsentModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ensuring this only runs on the client side
    if (typeof window !== "undefined") {
      try {
        const consent = localStorage.getItem(CONSENT_KEY);
        // Explicitly check for lack of definite consent
        if (consent !== "accepted" && consent !== "rejected") {
          // Small delay to ensure smooth entry after hydration
          const timer = setTimeout(() => setVisible(true), 500);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.warn("LocalStorage access failed:", err);
        // Fallback: show modal if we can't check
        setVisible(true);
      }
    }
  }, []);

  const handleAction = (status) => {
    try {
      localStorage.setItem(CONSENT_KEY, status);
    } catch (e) {
      console.warn("Failed to save consent:", e);
    }
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
          personalize content. By clicking "Accept All", you consent to our use
          of cookies.
        </p>
        <p>
          Read our{" "}
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>{" "}
          to learn more about how we handle your data.
        </p>
        <div className="modal__buttons">
          <button className="btn__accept" onClick={() => handleAction("accepted")}>
            Accept All
          </button>
          <button className="btn__reject" onClick={() => handleAction("rejected")}>
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