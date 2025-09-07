const { default: styled } = require("styled-components");

export const TabsWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
`;


export const Tab = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  font-family:Inter;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "#ff4d4f" : "#a1a1a1")};
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background-color: #ff4d4f;
    transition: width 0.3s ease;
  }
`;
