import styled from "styled-components";

export const OrderPageWrapper=styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:14px;
margin:0 auto;
max-width:809px;

 h1{
  font-family:Inter;
  font-weight:400;
  color:#333333;
  font-size:30px;
 }

 .details_section{
  margin-top:12px;
  display:flex;
  flex-direction:column;
  gap:12px;
 }

 @media screen and (max-width:){
    gap:8px;

 .details_section{
    gap:6px;
 }
 }

`