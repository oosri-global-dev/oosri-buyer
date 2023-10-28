import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ProfileNavWrapper = styled(FlexibleDiv)`
  width: 50px;
  height: 20px;
  flex-direction: row;
  gap: 5px;
  flex-wrap: nowrap;
  border: 1.5px solid #9e9e9e;
  padding: 5px;
  border-radius: 70px;

  img {
    width: 17px;
  }
`;
