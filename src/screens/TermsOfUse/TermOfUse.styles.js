import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const TermsWrapper = styled(FlexibleDiv)`
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

    .hero__download {
      margin-top: 4px;
      height: 44px;
      padding: 0 24px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.12);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s, border-color 0.2s;
      font-family: inherit;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }
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

export const Section = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 36px 0 12px;
  padding: 14px 0 14px 14px;
  border-top: 1.5px solid #f2f2f2;
  border-left: 3px solid var(--orrsiPrimary);
  line-height: 1.4;
  scroll-margin-top: 80px;

  &:first-of-type {
    margin-top: 0;
    border-top: none;
  }

  @media (max-width: 560px) {
    font-size: 0.98rem;
    margin: 28px 0 10px;
  }
`;

export const SubSection = styled.h3`
  font-size: 0.92rem;
  font-weight: 700;
  color: #333;
  margin: 20px 0 8px;
  line-height: 1.4;

  @media (max-width: 560px) {
    font-size: 0.88rem;
    margin: 16px 0 6px;
  }
`;

export const SubSubSection = styled.h4`
  font-size: 0.88rem;
  font-weight: 700;
  color: #555;
  margin: 14px 0 6px;
  line-height: 1.4;
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 0 0 12px;
  line-height: 1.85;

  @media (max-width: 560px) {
    font-size: 0.86rem;
    line-height: 1.75;
  }
`;

export const List = styled.ul`
  margin: 0 0 14px;
  padding-left: 22px;
  list-style-type: disc;
`;

export const ListItem = styled.li`
  font-size: 0.9rem;
  color: #444;
  margin: 7px 0;
  line-height: 1.8;
  padding-left: 4px;

  @media (max-width: 560px) {
    font-size: 0.86rem;
    margin: 5px 0;
  }
`;
