import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const TermsOfUseWrapper = styled(FlexibleDiv)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 40px;
  background: var(--orrsiWhite);
  color: var(--orrsiBlack);
  font-family: "Inter", sans-serif;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 550px) {
    padding: 20px 16px;
  }
`;

export const Header = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--orrsiBlack);
  margin: 0 0 30px 0;
  text-align: left;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 24px;
  }

  @media (max-width: 550px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 0 40px 0;
  padding: 14px 28px;
  background: var(--orrsiPrimary);
  color: var(--orrsiWhite);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(252, 83, 83, 0.25);
  cursor: pointer;

  &:hover {
    background: #e04545;
    box-shadow: 0 4px 12px rgba(252, 83, 83, 0.35);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(252, 83, 83, 0.25);
  }

  svg {
    flex-shrink: 0;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 24px;
    margin-bottom: 30px;
  }

  @media (max-width: 550px) {
    font-size: 13px;
    padding: 10px 20px;
    gap: 8px;

    svg {
      font-size: 16px;
    }
  }
`;

export const Section = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: var(--orrsiBlack);
  margin: 40px 0 20px 0;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  line-height: 1.4;

  &:first-of-type {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 32px 0 16px 0;
    padding-top: 16px;
  }

  @media (max-width: 550px) {
    font-size: 18px;
    margin: 28px 0 14px 0;
    padding-top: 14px;
  }
`;

export const SubSection = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--orrsiSecondaryBlack);
  margin: 28px 0 14px 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 17px;
    margin: 24px 0 12px 0;
  }

  @media (max-width: 550px) {
    font-size: 16px;
    margin: 20px 0 10px 0;
  }
`;

export const SubSubSection = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #3a3a3a;
  margin: 20px 0 10px 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 15px;
    margin: 18px 0 8px 0;
  }

  @media (max-width: 550px) {
    font-size: 14px;
    margin: 16px 0 8px 0;
  }
`;

export const Paragraph = styled.p`
  font-size: 15px;
  color: #333333;
  margin: 0 0 18px 0;
  line-height: 1.8;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 16px 0;
    line-height: 1.7;
  }

  @media (max-width: 550px) {
    font-size: 13px;
    margin: 0 0 14px 0;
    line-height: 1.6;
  }
`;

export const List = styled.ul`
  margin: 0 0 18px 0;
  padding-left: 28px;
  list-style-type: disc;

  @media (max-width: 768px) {
    padding-left: 24px;
    margin: 0 0 16px 0;
  }

  @media (max-width: 550px) {
    padding-left: 20px;
    margin: 0 0 14px 0;
  }
`;

export const ListItem = styled.li`
  font-size: 15px;
  color: #333333;
  margin: 10px 0;
  line-height: 1.7;
  padding-left: 4px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 8px 0;
    line-height: 1.6;
  }

  @media (max-width: 550px) {
    font-size: 13px;
    margin: 6px 0;
    line-height: 1.5;
  }
`;
