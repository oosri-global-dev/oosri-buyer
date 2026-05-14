import styled from "styled-components";

export const SDWrapper = styled.section`
  width: 100%;
  margin-top: 28px;

  .section__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a1a1a;
    }
  }

  .view__all__style {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--orrsiPrimary);
    cursor: pointer;
    margin: 0;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }

  .cards__scroller {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 10px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .card__slot {
    flex: 0 0 auto;
    width: 200px;

    @media (max-width: 480px) {
      width: 170px;
    }
  }

  @media (max-width: 440px) {
    .section__header h2 {
      font-size: 1.1rem;
    }
  }
`;
