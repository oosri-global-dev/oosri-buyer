import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FaqWrapper = styled(FlexibleDiv)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0;

  .container {
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    padding: 0;

    .faq_title {
      background-color: var(--orrsiPrimary);
      padding: 57px 0;
      color: white;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      font-size: 28px;
      font-weight: 700;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 22px;
        padding: 40px 0;
        margin-top: 0;
      }

      @media (max-width: 550px) {
        font-size: 18px;
        padding: 30px 0;
      }
    }

    .accordion {
      margin-top: 50px;
      width: 100%;
      padding: 0 20px;

      @media (max-width: 768px) {
        margin-top: 40px;
        padding: 0 16px;
      }

      @media (max-width: 550px) {
        margin-top: 30px;
        padding: 0 12px;
      }
    }
  }
`;

export const FaqItem = styled.div`
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--orrsiWhite);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--orrsiPrimary);
    box-shadow: 0 2px 8px rgba(252, 83, 83, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
    border-radius: 6px;
  }
`;

export const FaqTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  background: var(--orrsiWhite);
  transition: background-color 0.2s ease;

  &:hover {
    background: #fafafa;
  }

  .question {
    font-size: 16px;
    font-weight: 600;
    color: var(--orrsiBlack);
    margin: 0;
    flex: 1;
    line-height: 1.5;
    padding-right: 20px;

    @media (max-width: 768px) {
      font-size: 15px;
      padding-right: 16px;
    }

    @media (max-width: 550px) {
      font-size: 14px;
      padding-right: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }

  @media (max-width: 550px) {
    padding: 14px 16px;
  }
`;

export const ExpandIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 24px;
  font-weight: 600;
  color: var(--orrsiPrimary);
  background: rgba(252, 83, 83, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.3s ease;
  transform: rotate(${(props) => (props.isOpen ? "0deg" : "0deg")});

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 20px;
  }

  @media (max-width: 550px) {
    width: 22px;
    height: 22px;
    font-size: 18px;
  }
`;

export const FaqContent = styled.div`
  max-height: ${(props) => (props.isOpen ? "2000px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${(props) => (props.isOpen ? "0 24px 20px 24px" : "0 24px")};

  .answer-content {
    color: #555555;
    font-size: 15px;
    line-height: 1.7;
    padding-top: ${(props) => (props.isOpen ? "8px" : "0")};
    transition: padding-top 0.3s ease;

    p {
      margin: 0 0 12px 0;
      color: #555555;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      margin: 12px 0 0 0;
      padding-left: 24px;
      list-style-type: disc;

      li {
        margin: 8px 0;
        color: #555555;
        line-height: 1.6;
      }
    }

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 1.6;

      ul {
        padding-left: 20px;

        li {
          margin: 6px 0;
        }
      }
    }

    @media (max-width: 550px) {
      font-size: 13px;
      line-height: 1.5;

      ul {
        padding-left: 18px;

        li {
          margin: 5px 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: ${(props) => (props.isOpen ? "0 20px 16px 20px" : "0 20px")};
  }

  @media (max-width: 550px) {
    padding: ${(props) => (props.isOpen ? "0 16px 14px 16px" : "0 16px")};
  }
`;
