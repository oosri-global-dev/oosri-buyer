import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FaqWrapper = styled(FlexibleDiv)`
  display: block;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  background: #fafafa;
  padding-bottom: 80px;

  /* ── Hero ──────────────────────────────────────────────────── */
  .faq__hero {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d0000 60%, var(--orrsiPrimary) 100%);
    border-top: 4px solid var(--orrsiPrimary);
    padding: 72px 24px 80px;
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

    .search__bar {
      margin-top: 8px;
      width: 100%;
      max-width: 520px;
      position: relative;

      .search__icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.45);
        pointer-events: none;
        font-size: 1rem;
      }

      input {
        width: 100%;
        height: 50px;
        border-radius: 14px;
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        color: #fff;
        font-size: 0.92rem;
        padding: 0 16px 0 44px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s, background 0.2s;
        font-family: inherit;

        &::placeholder { color: rgba(255, 255, 255, 0.45); }
        &:focus {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.15);
        }
      }

      .clear__btn {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        font-size: 1rem;
        padding: 4px;
        line-height: 1;
        transition: color 0.2s;

        &:hover { color: #fff; }
      }
    }
  }

  /* ── Body ──────────────────────────────────────────────────── */
  .faq__body {
    width: 95%;
    max-width: 820px;
    margin: 40px auto 0;
  }

  /* ── Category pills ────────────────────────────────────────── */
  .category__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;

    .pill {
      height: 34px;
      padding: 0 16px;
      border-radius: 20px;
      border: 1.5px solid #e8e8e8;
      background: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      color: #555;
      cursor: pointer;
      transition: all 0.18s ease;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;

      .pill__count {
        font-size: 0.72rem;
        font-weight: 700;
        color: #aaa;
        background: #f0f0f0;
        border-radius: 10px;
        padding: 1px 6px;
        transition: background 0.18s, color 0.18s;
      }

      &:hover {
        border-color: var(--orrsiPrimary);
        color: var(--orrsiPrimary);
      }

      &.active {
        background: var(--orrsiPrimary);
        border-color: var(--orrsiPrimary);
        color: #fff;
        box-shadow: 0 4px 14px rgba(252, 83, 83, 0.3);

        .pill__count {
          background: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
      }
    }
  }

  /* ── Search result count ───────────────────────────────────── */
  .result__note {
    font-size: 0.82rem;
    color: #999;
    margin-bottom: 20px;
    margin-top: -16px;

    strong { color: #444; }
  }

  /* ── Accordion ─────────────────────────────────────────────── */
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .faq__item {
    background: #fff;
    border: 1.5px solid #efefef;
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover { border-color: rgba(252, 83, 83, 0.3); }
    &.open {
      border-color: rgba(252, 83, 83, 0.4);
      box-shadow: 0 4px 20px rgba(252, 83, 83, 0.08);
    }
  }

  .faq__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    gap: 16px;

    .trigger__left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;

      .category__dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--orrsiPrimary);
        flex-shrink: 0;
        opacity: 0.5;
        transition: opacity 0.2s;
      }

      .question__text {
        font-size: 0.95rem;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 1.45;
      }
    }

    .chevron {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.25s ease;
      color: #888;
      font-size: 0.75rem;
    }

    &:hover .chevron { background: rgba(252, 83, 83, 0.1); color: var(--orrsiPrimary); }
  }

  .faq__item.open .faq__trigger {
    .category__dot { opacity: 1; }
    .question__text { color: var(--orrsiPrimary); }
    .chevron {
      background: rgba(252, 83, 83, 0.1);
      color: var(--orrsiPrimary);
      transform: rotate(180deg);
    }
  }

  .faq__answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    &.open { max-height: 600px; }

    .answer__inner {
      padding: 0 22px 20px 42px;
      font-size: 0.9rem;
      color: #555;
      line-height: 1.75;

      p { margin: 0 0 10px; &:last-child { margin-bottom: 0; } }

      ul {
        margin: 8px 0 0;
        padding-left: 20px;
        list-style: disc;

        li { margin: 6px 0; color: #555; line-height: 1.65; }
      }
    }
  }

  /* ── Empty state ───────────────────────────────────────────── */
  .empty__state {
    text-align: center;
    padding: 60px 0;
    color: #aaa;

    .empty__icon { font-size: 2.5rem; margin-bottom: 12px; }
    p { font-size: 0.9rem; margin: 0; }

    .clear__search {
      margin-top: 16px;
      background: none;
      border: 1.5px solid #e8e8e8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.85rem;
      color: #555;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;

      &:hover { border-color: var(--orrsiPrimary); color: var(--orrsiPrimary); }
    }
  }

  /* ── Contact CTA ───────────────────────────────────────────── */
  .contact__cta {
    margin-top: 48px;
    background: linear-gradient(135deg, #1a1a1a, #2d0000);
    border-radius: 20px;
    padding: 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    overflow: hidden;

    .cta__text {
      .cta__title {
        font-size: 1.05rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 6px;
      }
      .cta__sub {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
        line-height: 1.5;
      }
    }

    .cta__btn {
      height: 44px;
      padding: 0 24px;
      border-radius: 10px;
      background: var(--orrsiPrimary);
      color: #fff;
      border: none;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background 0.2s, transform 0.15s;
      box-shadow: 0 4px 14px rgba(252, 83, 83, 0.35);
      min-width: 160px;
      max-width: 100%;

      &:hover { background: #e04040; transform: translateY(-1px); }
    }
  }

  /* ── Responsive ────────────────────────────────────────────── */
  @media (max-width: 560px) {
    .faq__hero {
      padding: 56px 5% 52px;

      h1 { font-size: 2rem; }
      .hero__sub { font-size: 0.88rem; }
    }

    .faq__trigger {
      padding: 16px 18px;

      .trigger__left .question__text { font-size: 0.88rem; }
    }

    .faq__answer .answer__inner {
      padding: 0 18px 16px 38px;
      font-size: 0.85rem;
    }

    .contact__cta {
      .cta__btn { width: 100%; }
    }
  }
`;
