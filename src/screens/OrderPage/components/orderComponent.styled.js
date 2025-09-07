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