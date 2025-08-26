import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const NavMenuWrapper = styled(FlexibleDiv)`
  width: fit-content;

  label {
    display: flex;
    flex-direction: column;
    width: 30px;
    cursor: pointer;
  }

  label span {
    background: var(--orrsiBlack);
    border-radius: 10px;
    height: 2.5px;
    margin: 3px 0;
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    z-index: 5;
  }

  span:nth-of-type(1) {
    width: 50%;
  }

  span:nth-of-type(2) {
    width: 100%;
  }

  span:nth-of-type(3) {
    width: 75%;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked ~ span:nth-of-type(1) {
    transform-origin: bottom;
    transform: rotatez(45deg) translate(4px, 0px);
  }

  input[type="checkbox"]:checked ~ span:nth-of-type(2) {
    transform-origin: top;
    transform: rotatez(-45deg);
  }

  input[type="checkbox"]:checked ~ span:nth-of-type(3) {
    transform-origin: bottom;
    width: 50%;
    transform: translate(13px, -4px) rotatez(45deg);
  }

  .nav__content__wrapper {
    display: ${({ inputChecked }) => (inputChecked ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 40px; 
    left: 0;
    width: 200px; 
    padding: 10px;
    background-color: #eceff1;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    z-index: 4;
  }

  .nav__content__wrapper a {
    text-align: center;
    padding: 15px 0;
    color: #555555;
    display: block;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
  }

  .nav__content__wrapper #active__link {
    border-bottom: 0.7px solid var(--orrsiPrimary);
    font-weight: bold;
    color: var(--orrsiPrimary);
  }
`;
