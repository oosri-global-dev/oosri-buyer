import styled from "styled-components";

export const ConfirmationContainer = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding: 40px 20px;
  background: var(--orrsiWhite);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .success-icon-wrapper {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--orrsiDarkText, #1f2937);
    margin-bottom: 12px;
  }

  .description {
    font-size: 1.1rem;
    color: var(--orrsiGray, #6b7280);
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .reference {
    background: #f3f4f6;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #4b5563;
    margin-bottom: 40px;
    word-break: break-all;
    
    strong {
      color: #111827;
    }
  }

  .button-group {
    display: flex;
    gap: 16px;
    width: 100%;
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .btn {
    flex: 1;
    padding: 14px 24px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &.primary {
      background: linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%);
      color: var(--orrsiWhite);
      border: none;
      box-shadow: 0 4px 15px rgba(252, 83, 83, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(252, 83, 83, 0.4);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--orrsiPrimary);
      border: 2px solid var(--orrsiPrimary);

      &:hover {
        background: rgba(252, 83, 83, 0.05);
        transform: translateY(-2px);
      }
    }
  }
`;
