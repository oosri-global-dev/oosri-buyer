import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const HomepageWrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  gap: 0;

  /* ── Page body below hero ── */
  .home__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-bottom: 72px;
  }

  /* ── Generic section spacing ── */
  .home__section {
    padding: 28px 0 4px;
  }

  /* ── Trust strip ── */
  .trust__strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    background: #f8f9fa;
    border: 1px solid #f0f0f0;
    border-radius: 16px;
    padding: 20px 24px;
    margin: 8px 0 4px;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    @media (max-width: 440px) {
      grid-template-columns: 1fr 1fr;
      padding: 14px 12px;
      gap: 10px;
    }
  }

  .trust__item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .trust__icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .trust__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .trust__title {
    font-size: 0.82rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.3;
  }

  .trust__subtitle {
    font-size: 0.72rem;
    color: #888;
    margin: 0;
    line-height: 1.3;
  }

  /* ── Lazy category placeholder ── */
  .category__section__placeholder {
    padding: 28px 0 8px;
  }

  .ph__title {
    height: 18px;
    width: 160px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    margin-bottom: 14px;
  }

  .ph__row {
    height: 248px;
    background: rgba(0, 0, 0, 0.025);
    border-radius: 14px;
  }

  /* ── Bottom Explore CTA ── */
  .explore__cta {
    margin-top: 32px;
  }

  .explore__cta__inner {
    text-align: center;
    background: linear-gradient(135deg, #fff8f8 0%, #fff4f0 100%);
    border: 1px solid rgba(252, 83, 83, 0.14);
    border-radius: 20px;
    padding: 48px 24px;
  }

  .explore__cta__title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 10px;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  .explore__cta__sub {
    font-size: 0.9rem;
    color: #777;
    margin: 0 0 24px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .explore__cta__btn {
    display: inline-block;
    background: var(--orrsiPrimary);
    color: #fff;
    padding: 13px 40px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.12s ease, transform 0.12s ease;

    &:hover {
      background: #e04040;
      transform: translateY(-2px);
    }
  }
`;
