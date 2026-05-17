import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const SellerCardWrapper = styled(FlexibleDiv)`
  width: 100%;
  padding: 20px;
  border: 1px solid rgba(187, 187, 187, 0.3);
  border-radius: 12px;
  margin: 24px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  .seller__card__top {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .seller__info {
      display: flex;
      align-items: center;
      gap: 12px;

      .seller__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--orrsiPrimary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 700;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .seller__name__wrap {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .seller__name {
          font-weight: 700;
          font-size: 1rem;
          margin: 0;
        }

        .seller__active {
          font-size: 0.75rem;
          color: #22c55e;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 4px;

          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #22c55e;
            display: inline-block;
          }
        }
      }
    }

    .seller__stats {
      display: flex;
      gap: 24px;

      .stat__item {
        text-align: center;

        .stat__value {
          font-weight: 700;
          font-size: 1rem;
          margin: 0;
          color: var(--orrsiPrimary);
        }

        .stat__label {
          font-size: 0.7rem;
          color: #888;
          margin: 0;
        }
      }
    }
  }

  .negotiate__btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1.5px solid var(--orrsiPrimary);
    border-radius: 8px;
    color: var(--orrsiPrimary);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--orrsiPrimary);
      color: #fff;
    }
  }

  @media (max-width: 550px) {
    padding: 16px;

    .seller__card__top {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      .seller__stats {
        gap: 16px;
      }
    }
  }
`;

export const CommunityWrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin: 24px 0;

  .community__header {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: nowrap;

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0;
    }

    .filter__tabs {
      display: flex;
      gap: 8px;

      button {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        border: 1px solid rgba(187, 187, 187, 0.4);
        background: transparent;
        color: #555;
        transition: all 0.15s;

        &.active {
          background: var(--orrsiPrimary);
          border-color: var(--orrsiPrimary);
          color: #fff;
        }
      }
    }
  }

  .post__box {
    width: 100%;
    border: 1px solid rgba(187, 187, 187, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;

    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      font-size: 0.9rem;
      font-family: inherit;
      color: #333;
      height: 80px;

      &::placeholder {
        color: #aaa;
      }
    }

    .post__box__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;

      .type__select {
        display: flex;
        gap: 8px;

        label {
          font-size: 0.78rem;
          color: #555;
          cursor: pointer;

          input {
            margin-right: 4px;
          }
        }
      }

      .post__btn {
        padding: 8px 20px;
        background: var(--orrsiPrimary);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.15s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  .discussion__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

export const DiscussionItemWrapper = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid rgba(187, 187, 187, 0.2);

  &:last-child {
    border-bottom: none;
  }

  .discussion__top {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 8px;

    .author__avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      color: #555;
      flex-shrink: 0;
    }

    .author__meta {
      flex: 1;

      .author__row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .author__name {
          font-weight: 600;
          font-size: 0.9rem;
          margin: 0;
        }

        .badge {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;

          &.verified {
            background: #d1fae5;
            color: #065f46;
          }

          &.seller {
            background: #fef3c7;
            color: #92400e;
          }

          &.pinned {
            background: rgba(252, 83, 83, 0.1);
            color: var(--orrsiPrimary);
          }
        }
      }

      .discussion__type {
        font-size: 0.72rem;
        color: #888;
        margin: 2px 0 0;
        text-transform: capitalize;
      }
    }
  }

  .discussion__content {
    font-size: 0.9rem;
    color: #333;
    line-height: 1.5;
    margin: 0 0 10px 46px;
  }

  .discussion__actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 46px;

    button {
      background: none;
      border: none;
      font-size: 0.78rem;
      color: #888;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: color 0.15s;

      &:hover {
        color: var(--orrsiPrimary);
      }
    }

    .reaction__group {
      display: flex;
      gap: 4px;
    }
  }

  .replies__section {
    margin-left: 46px;
    margin-top: 12px;
    padding-left: 12px;
    border-left: 2px solid rgba(187, 187, 187, 0.25);
  }
`;

export const NegotiationModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const NegotiationModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 28px;
  position: relative;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 20px;
  }

  .close__btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    color: #888;
    line-height: 1;
  }

  .offer__types {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;

    label {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: 1.5px solid rgba(187, 187, 187, 0.4);
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.15s;

      &.selected {
        border-color: var(--orrsiPrimary);
        background: rgba(252, 83, 83, 0.05);
        color: var(--orrsiPrimary);
        font-weight: 600;
      }

      input {
        display: none;
      }
    }
  }

  .price__input__group {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: #444;
    }

    input {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid rgba(187, 187, 187, 0.5);
      border-radius: 8px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.15s;
      box-sizing: border-box;

      &:focus {
        border-color: var(--orrsiPrimary);
      }
    }

    .hint {
      font-size: 0.75rem;
      color: #888;
      margin-top: 4px;
    }
  }

  .note__input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid rgba(187, 187, 187, 0.5);
    border-radius: 8px;
    font-size: 0.88rem;
    resize: none;
    height: 72px;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    margin-bottom: 20px;

    &:focus {
      border-color: var(--orrsiPrimary);
    }
  }

  .expiry__note {
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 16px;
  }

  .submit__btn {
    width: 100%;
    padding: 13px;
    background: var(--orrsiPrimary);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .error__msg {
    font-size: 0.82rem;
    color: var(--orrsiPrimary);
    margin-bottom: 10px;
    text-align: center;
  }
`;
