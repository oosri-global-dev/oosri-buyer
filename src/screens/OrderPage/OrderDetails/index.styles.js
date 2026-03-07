import styled from "styled-components";

export const OrderDetailsWrapper=styled.div`
width:100%;
font-family:Inter;
max-width:860px;
margin:0 auto;

 .breadcrumb__paragraph {
    width:fit-content;
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

  @media screen and (max-width:560px){
      .order_title{
        flex-direction: column;
        align-items: start;
        h3{
          font-size:24px;
        }
    }

    .order_status{
      font-size:12px;
    }
  }
`

export const OrderMapWrapper =styled.div`
  width:100%;
  font-family: 'Inter';

h1{
  font-weight:400;
  color:#333333;
  font-size:30px;
 }

 .stat_title{
  color:#999999;
  font-weight:700;
  font-size:16px;
 }

 p{
  margin:0px;
 }

.stat_container{
  gap:6px;
  span{
    display:flex;
    flex-wrap:noWrap;
  }
}
 
 .text_title{
  color:#333333;
  font-weight:700;
  font-size:14px;
 }

 .span_text_brown{
  color:#999999;
  font-weight:700;
  font-size:14px;
  letter-spacing: 0px;
 }

 .span_text_black{
  color:#333333;
  font-weight:700;
  font-size:14px;
  letter-spacing: 0px;
 }

 .location_text_black{
  font-size:14px;
 }

 .location_text_brown{
  font-size:12px;
 }

 .location_bg{
  background-color:#FFEEF3;
  color:#FC5353;
  border-radius:10000%;
  padding:6px 6px;
  width:14px;
  height:14px;
  
  svg{
    width:14px;
    height:14px;
  }
 }

 .delivery_options{
  img{
    width:45px;
    height:40px;
    object-fit:cover;
    border-radius:1000%;
  }

  h3{
    color:#333333;
    font-size:16px;
    font-weight:700;
    }
    
  p{
    font-weight:700;
    color:#999999;
    font-size:14px;
  }
 }

 .phone-icon{
    background-color:#FFFFFF;
    padding:8px;
    border-radius:1000%;
    width:14px;
    height:14px;
 }

 .phone_num{
  color:#333333;
  font-weight:700;
  letter-spacing:0px;
  font-size:16px;
 }

 .copy_icon{
  color:#FC5353;

  svg{
    width:24px;
    height:24px;
    cursor:pointer;
  }
 }

 @media screen and (max-width:600px){
 
  .items_container{
    flex-direction:column;
    gap:3rem;
    justify-content:center; 
    margin-top:3rem;
  }
 }

`
