import styled from "styled-components";

export const OrderItemWrapper = styled.div`
border: 4px solid #FEDDDD;
padding: 16px 24px;
border-radius: 12px;
margin-bottom: 16px;
max-width:809px;

 .wrapper{
   display: flex;
   gap: 16px;
   flex-wrap: wrap;
   flex-wrap: nowrap;
  }

 .img_container{
   background-color:#F5F5F5;
   max-width:150px;
   max-height:150px;
   padding:24px 16px;
   display:flex;
   align-items:center;
   justify-content:center;
   border-radius: 8px;
  }

.avatar_img{
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 8px;
}

   .top_bar{
    font-family:Inter;
      p{
       color:#BBBBBB;
       font-size:12px;
       margin:4px 0px;
      }
       h3{
        font-weight:500;
        font-size:16px;
        color:#212121;
       }
   }

   .bottom_bar{
    position:relative;
      h3{
        font-weight:600;
        font-size:16px;
        color:#333333;
       }
      p{
       color:#BBBBBB;
       font-size:12px;
       margin:4px 0px;
       font-weight:500;
      }
   }

   .text_container{
    display: flex;
    justify-content:space-between;
    flex-direction:column;
    max-width:300px;

    @media screen and (max-width:560px){
      h3{
         font-size:14px;
      }
    }
   }

  
 .cancel_wrapper{
    width: 100%;
    justify-content: end;
    display: flex;
 }

 .cancel__button{
     background: none;
     border: none;
     color: #FC5353;
     font-weight: 500;
     cursor: pointer;
     font-size:13px;
     justify-content:end;
     
     span{
      gap:3px;
      display:flex;
      align-items:center;
     }
 }

 .delivered_wrapper{
  background-color:#55D352E5;
  padding:8px 18px;
  color:white;
  width:fit-content;
  // width: 100%;
  justify-content: end;
  display: flex;
  border-radius:1000px;
  font-size:13px;

  p{
    margin:0px;
  }
 }

 @media screen and (max-width:560px){
  padding: 24px 8px;

   .wrapper{
      gap: 4px;
      padding-top: 12px;
    }

  .img_container{
  padding: 10px 8px;
    max-width:90px;
    max-height:90px;
  }
}
  .cancel__button{
    font-size: 11px;
    margin-top:5px;
  }

`

export const PickupStationWrapper=styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 24px;
  padding:24px 0px;
  font-size: 0.95rem;
  display:flex;
  align-items:start;
  gap:8px;
  max-width:860px;

  .title{
    font-size:16px;
  }

  .icon{
    color:#FC5353;
  }

  span{
   display:flex;
   align-items:center;
   gap:4px;
  }

  p{
   margin:4px 0px;
   color:#999999;
   font-family:Inter;
   font-weight:500;
  }  

  .arrival_details{
   color:#616161;
  }

  .bottom_text{
   margin-top:12px;
  }

  .green_text{
   color:#89B46D;
   font-weight:600;
  }
`

export const NameTagWrapper=styled.div`
  width:100%;
  border-top:1px solid #EEEEEE;
  max-width:860px;


  .content{
   display:flex;
   align-items:center;
   gap:8px;
   color:#777777;
   font-family:Inter;
   font-size:12px;
   padding:2px 12px;
   border-radius:0px 0px 24px 24px;
   background-color:#F5F5F5;
   width:fit-content;
  }

  img{
   width:24px;
   height:24px;
   border-radius:1000%;
   object-fit:cover;
  }
`

export const OrderCardWrapper = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 16px;
  padding: 20px 24px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  background: #fff;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    border-color: #e0e0e0;
  }

  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 12px;

    .header__left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .order__number {
      font-size: 0.92rem;
      font-weight: 700;
      color: #1a1a1a;
      font-family: Inter, sans-serif;
      letter-spacing: 0.03em;
    }

    .order__date {
      font-size: 0.78rem;
      color: #aaa;
      font-family: Inter, sans-serif;
    }

    .header__right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .status__badge {
      padding: 5px 14px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      font-family: Inter, sans-serif;

      &.pending   { background: #f5f5f5; color: #888; }
      &.picked    { background: #fff4e6; color: #e07b00; }
      &.delivered { background: #eaf7ee; color: #27a448; }
      &.cancelled { background: #fff0f0; color: #e53935; }
    }
  }

  .product__preview {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 14px;
    background: #fafafa;
    border-radius: 12px;
    margin-bottom: 16px;

    .product__image {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      overflow: hidden;
      background: #f0f0f0;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product__info {
      flex: 1;
      min-width: 0;

      .product__title {
        font-size: 0.92rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 4px;
        font-family: Inter, sans-serif;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product__desc {
        font-size: 0.78rem;
        color: #888;
        margin: 0 0 4px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .extra__items {
        font-size: 0.75rem;
        color: var(--orrsiPrimary);
        font-weight: 500;
        margin: 0;
      }
    }
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #f5f5f5;

    .footer__items__count {
      font-size: 0.8rem;
      color: #aaa;
      font-family: Inter, sans-serif;
    }

    .order__total {
      font-size: 1rem;
      font-weight: 700;
      color: var(--orrsiPrimary);
      font-family: Inter, sans-serif;
    }
  }

  @media (max-width: 560px) {
    padding: 16px;

    .card__header .order__number { font-size: 0.82rem; }
    .product__preview { padding: 10px; }
    .product__preview .product__image { width: 60px; height: 60px; }
    .card__footer .order__total { font-size: 0.92rem; }
  }
`