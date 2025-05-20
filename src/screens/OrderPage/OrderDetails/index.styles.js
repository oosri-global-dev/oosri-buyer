import styled from "styled-components";

export const OrderDetailsWrapper=styled.div`
width:100%;
font-family:Inter;
 .breadcrumb__paragraph {
    font-size: 0.95rem;
    color: var(--orrsiFadedWhite);
    cursor: pointer;
    margin: 0;
    margin: 20px 0;

    span {
      color: var(--orrsiSecondaryBlack);
      font-weight: 600;
    }
  }

  .top_section{
    display:flex;
    justify-content:space-between;
    align-items:start;
    width:100%;
  }

  .order_title{
    display:flex;
    align-items:center;
    gap:6px;
    
    h3{
     font-weight:500;
     font-size:30px;
    }
  }

  .time_frame{
   color:#9E9E9E;
   font-size:14px;
  }

  .order_status{
    padding:6px 16px;
    border-radius:16px;
    border:1px solid;
    font-size:14px;
  }

  .track{
    color:#FC5353;
    color:;
    background-color:#FEDDDD;
    border-color:#FDA9A9;
  }
  .picked{
    color:#BD9814;
    background-color:#FEEFB8;
    border-color:#FEEFB8;
  }

  .total_amount{
    display:flex;
    align-items:center;
    width:100%;
    gap:4px;
    justify-content:end;
  }

  .total_text{
    color:#BBBBBB;
  }
`