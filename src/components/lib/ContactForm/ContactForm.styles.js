import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ContactWrapper = styled(FlexibleDiv)`
  display: block;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  background: #fafafa;
  padding-bottom: 80px;

  /* ── Hero ──────────────────────────────────────────────────── */
  .contact__hero {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d0000 60%, var(--orrsiPrimary) 100%);
    border-top: 4px solid var(--orrsiPrimary);
    padding: 72px 24px 130px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .hero__eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      margin: 0;
    }

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      color: #fff;
      margin: 0;
      line-height: 1.15;
      width: 100%;
      word-break: break-word;
    }

    .hero__sub {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 480px;
      margin: 0;
      line-height: 1.6;
    }

    .hero__faq__link {
      margin-top: 4px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.35);
      padding-bottom: 1px;
      transition: color 0.2s;

      &:hover { color: #fff; border-bottom-color: #fff; }
    }
  }

  /* ── Body grid ─────────────────────────────────────────────── */
  .contact__body {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 32px;
    width: 95%;
    max-width: 1040px;
    margin: 48px auto 0;
    align-items: start;
  }

  /* ── Form card ─────────────────────────────────────────────── */
  .form__card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 36px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 22px;

    .form__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 10px 0;
    }

    .response__badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      color: #1a7a40;
      background: rgba(0, 180, 90, 0.08);
      border: 1px solid rgba(0, 180, 90, 0.2);
      border-radius: 20px;
      padding: 5px 12px;
      width: fit-content;
      margin-bottom: 6px;
    }

    .field__group {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label {
        font-size: 0.82rem;
        font-weight: 600;
        color: #444;
        letter-spacing: 0.3px;
      }

      .field__input {
        width: 100%;
        height: 44px;
        border: 1.5px solid #e8e8e8;
        border-radius: 10px;
        background: #fafafa;
        padding: 0 14px;
        font-size: 0.9rem;
        color: #1a1a1a;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;

        &::placeholder { color: #bbb; }
        &:focus {
          border-color: var(--orrsiPrimary);
          box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.08);
          background: #fff;
        }
      }

      .field__select {
        width: 100%;
        height: 44px;
        border: 1.5px solid #e8e8e8;
        border-radius: 10px;
        background: #fafafa;
        padding: 0 14px;
        font-size: 0.9rem;
        color: #1a1a1a;
        outline: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;

        &:focus {
          border-color: var(--orrsiPrimary);
          box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.08);
          background-color: #fff;
        }
      }

      .textarea__wrapper {
        position: relative;

        .field__textarea {
          width: 100%;
          height: 140px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          background: #fafafa;
          padding: 12px 14px;
          font-size: 0.9rem;
          color: #1a1a1a;
          outline: none;
          resize: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: inherit;

          &::placeholder { color: #bbb; }
          &:focus {
            border-color: var(--orrsiPrimary);
            box-shadow: 0 0 0 3px rgba(252, 83, 83, 0.08);
            background: #fff;
          }
        }

        .char__count {
          position: absolute;
          bottom: 10px;
          right: 12px;
          font-size: 0.72rem;
          color: #bbb;
          pointer-events: none;

          &.near__limit { color: #f5a623; }
          &.at__limit { color: var(--orrsiPrimary); }
        }
      }
    }

    .two__col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .submit__btn {
      height: 50px;
      width: 100%;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      margin-top: 4px;
      cursor: pointer;
      border: none;
      background: var(--orrsiPrimary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(252, 83, 83, 0.3);

      &:hover:not(:disabled) {
        background: #e04040;
        box-shadow: 0 6px 20px rgba(252, 83, 83, 0.4);
        transform: translateY(-1px);
      }
      &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    }

    .success__state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 40px 0;
      text-align: center;

      .success__icon {
        width: 64px;
        height: 64px;
        background: rgba(0, 200, 100, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .success__title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .success__desc {
        font-size: 0.88rem;
        color: #777;
        margin: 0;
        max-width: 320px;
        line-height: 1.6;
      }

      .send__another {
        background: none;
        border: 1.5px solid #e8e8e8;
        border-radius: 8px;
        padding: 8px 20px;
        font-size: 0.85rem;
        color: #555;
        cursor: pointer;
        margin-top: 8px;
        transition: border-color 0.2s, color 0.2s;

        &:hover { border-color: var(--orrsiPrimary); color: var(--orrsiPrimary); }
      }
    }
  }

  /* ── Info panel ────────────────────────────────────────────── */
  .info__panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 0;

    .response__badge {
      display: none;
    }

    .info__card {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: flex-start;
      gap: 14px;
      text-decoration: none;
      transition: box-shadow 0.2s, transform 0.15s;

      &:hover {
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .info__icon__wrap {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: rgba(254, 221, 221, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--orrsiPrimary);
      }

      .info__text {
        display: flex;
        flex-direction: column;
        gap: 3px;

        .info__label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #aaa;
          margin: 0;
        }

        .info__value {
          font-size: 0.92rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .info__hint {
          font-size: 0.75rem;
          color: #bbb;
          margin: 0;
        }
      }
    }

    .faq__card {
      background: linear-gradient(135deg, #1a1a1a, #2d0000);
      border-radius: 16px;
      padding: 22px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .faq__title {
        font-size: 0.95rem;
        font-weight: 700;
        color: #fff;
        margin: 0;
      }

      .faq__desc {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
        line-height: 1.5;
      }

      a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--orrsiPrimary);
        text-decoration: none;
        margin-top: 4px;

        &:hover { text-decoration: underline; }
      }
    }
  }

  /* ── Responsive ────────────────────────────────────────────── */
  @media (max-width: 860px) {
    .contact__body {
      grid-template-columns: 1fr;
      margin-top: -24px;
      /* width: 95% and margin: auto already handle centering */
    }

    .info__panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      .faq__card { grid-column: 1 / -1; }
    }
  }

  @media (max-width: 560px) {
    .contact__hero {
      padding: 56px 5% 100px;

      h1 { font-size: 2rem; }
      .hero__sub { font-size: 0.88rem; }
    }

    .form__card {
      padding: 28px 20px;

      .two__col { grid-template-columns: 1fr; }
    }

    .info__panel {
      grid-template-columns: 1fr;

      .response__badge,
      .faq__card { grid-column: auto; }
    }
  }
`;
