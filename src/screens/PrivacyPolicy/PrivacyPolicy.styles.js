import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const PrivacyWrapper = styled(FlexibleDiv)`
  display: block;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  background: #fafafa;
  padding-bottom: 80px;

  /* ── Hero ──────────────────────────────────────────────────── */
  .legal__hero {
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
      max-width: 500px;
      margin: 0;
      line-height: 1.6;
    }

    .hero__meta {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.4);
      margin: 0;
    }
  }

  /* ── Body ──────────────────────────────────────────────────── */
  .legal__body {
    width: 95%;
    max-width: 860px;
    margin: 40px auto 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ── Highlight intro box ───────────────────────────────────── */
  .intro__box {
    background: #fff8f8;
    border-left: 4px solid var(--orrsiPrimary);
    border-radius: 0 12px 12px 0;
    padding: 18px 22px;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.8;
  }

  /* ── TOC card ──────────────────────────────────────────────── */
  .toc__card {
    background: #fff;
    border: 1.5px solid #efefef;
    border-radius: 16px;
    padding: 28px 32px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .toc__label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #aaa;
      margin: 0 0 16px;
    }

    ol {
      margin: 0;
      padding-left: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 32px;
    }

    li {
      font-size: 0.88rem;
      color: #555;
      line-height: 1.6;
    }

    a {
      color: #555;
      text-decoration: none;
      transition: color 0.15s;
      &:hover { color: var(--orrsiPrimary); }
    }
  }

  /* ── Document content card ─────────────────────────────────── */
  .doc__content {
    background: #fff;
    border: 1.5px solid #efefef;
    border-radius: 16px;
    padding: 40px 36px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 36px 0 12px;
      padding: 14px 0 14px 14px;
      border-top: 1.5px solid #f2f2f2;
      border-left: 3px solid var(--orrsiPrimary);
      line-height: 1.4;
      scroll-margin-top: 80px;

      &:first-child { margin-top: 0; border-top: none; }
    }

    h3 {
      font-size: 0.92rem;
      font-weight: 700;
      color: #333;
      margin: 20px 0 8px;
      line-height: 1.4;
    }

    p {
      font-size: 0.9rem;
      color: #444;
      margin: 0 0 12px;
      line-height: 1.85;
    }

    ul {
      margin: 0 0 14px;
      padding-left: 22px;
      list-style-type: disc;

      li {
        font-size: 0.9rem;
        color: #444;
        margin: 7px 0;
        line-height: 1.8;
        padding-left: 4px;
      }
    }

    a {
      color: var(--orrsiPrimary);
      text-decoration: underline;
    }

    /* Retention / cookie tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0 20px;
      font-size: 0.85rem;
      overflow-x: auto;
      display: block;

      thead tr { background: #f7f7f7; }

      th {
        text-align: left;
        padding: 10px 12px;
        font-weight: 700;
        border: 1px solid #e8e8e8;
        color: #333;
        white-space: nowrap;
      }

      td {
        padding: 10px 12px;
        border: 1px solid #e8e8e8;
        vertical-align: top;
        color: #444;
      }

      tr:nth-child(even) td { background: #fafafa; }
    }

    /* Contact info box */
    .contact-box {
      background: #f7f7f7;
      border-radius: 12px;
      padding: 22px 24px;
      margin-top: 8px;

      p { margin: 0 0 8px; &:last-child { margin: 0; } }
    }
  }

  /* ── Contact CTA ───────────────────────────────────────────── */
  .contact__cta {
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
      font-family: inherit;

      &:hover { background: #e04040; transform: translateY(-1px); }
    }
  }

  /* ── Responsive ────────────────────────────────────────────── */
  @media (max-width: 560px) {
    .legal__hero {
      padding: 56px 5% 52px;
      h1 { font-size: 2rem; }
      .hero__sub { font-size: 0.88rem; }
    }

    .toc__card {
      padding: 22px 20px;
      ol { grid-template-columns: 1fr; }
    }

    .doc__content { padding: 24px 20px; }

    .contact__cta .cta__btn { width: 100%; }
  }
`;
