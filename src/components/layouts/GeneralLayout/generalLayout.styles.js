import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const GeneralLayoutWrapper = styled(FlexibleDiv)`
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  padding: 30px;
  height: 100%;
  width: 100%;
  position: relative;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  min-height: calc(100dvh - 300px);
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .page__title {
    width: 100%;
    text-align: left;
    font-weight: 400;
    margin: 20px 0;
    font-size: 1.6rem;
  }

  @media (max-width: 1370px) {
    padding: 20px;
  }

  @media (max-width: 550px) {
    padding: 10px;
    min-height: fit-content;
  }
`;

export const AuthOverlay = styled(FlexibleDiv)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
