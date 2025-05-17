import { FlexibleDiv } from "@/components/lib/Box/styles";
import styled from "styled-components";

export const WishListWrapper=styled(FlexibleDiv)`

 .top_bar{
    margin-top:12px;
 }

 h1{
  font-family:Inter;
  font-weight:400;
  color:#333333;
  font-size:30px;
 }

 .content_wrap{
    padding:32px 0px;
    width:100%;
 }

 .search__textbox{
    max-width:280px;
    border-radius:12px;
 }

 @media screen and (max-width:764px){
    h1{
        font-size:24px;
        margin-bottom:12px;
    }
 }
`