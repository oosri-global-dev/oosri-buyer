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

  .product_card {
    border: 4px solid #FEDDDD;
    border-radius: 12px;
    padding: 16px 24px;
    margin: 24px 0;
    background: white;
  }

  .product_card_content {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .product_image_container {
    background-color: #F5F5F5;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 16px;
  }

  .product_image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .product_info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
  }

  .order_id {
    color: #BBBBBB;
    font-size: 12px;
    margin: 0 0 8px 0;
  }

  .product_title {
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    margin: 0;
    line-height: 1.4;
  }

  .product_footer {
    margin-top: auto;
  }

  .product_price {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 4px 0;
  }

  .product_time {
    color: #BBBBBB;
    font-size: 12px;
    margin: 0;
  }

  .delivery_section {
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    padding: 24px 0;
    margin: 24px 0;
  }

  .delivery_header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .delivery_title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin: 0;
  }

  .delivery_details {
    padding-left: 28px;
  }

  .address_text {
    color: #616161;
    font-size: 14px;
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .landmark_label {
    color: #999999;
    font-size: 14px;
    margin: 0 0 12px 0;
    font-weight: 500;
  }

  .landmark_value {
    color: #616161;
  }

  .delivery_fee_row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fee_label {
    color: #999999;
    font-size: 14px;
    margin: 0;
    font-weight: 500;
  }

  .fee_value {
    color: #89B46D;
    font-size: 14px;
    margin: 0;
    font-weight: 600;
  }

  .grand_total {
    margin-top: 16px;
    padding-top: 16px;
  }

  .grand_total_value {
    font-size: 18px;
    font-weight: 700;
    color: #333333;
  }

  .loading_text,
  .error_text {
    text-align: center;
    padding: 40px 20px;
    color: #999999;
    font-size: 16px;
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
