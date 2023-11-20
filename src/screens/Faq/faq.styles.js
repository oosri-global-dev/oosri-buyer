import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FaqWrapper = styled(FlexibleDiv)`

.container {
  flex-direction:column;
  padding:0;

  .faq_title {
    background-color: #FC5353;
    padding: 57px 0;
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    align-items:center;
  }
  
  .accordion {
    margin-top: 50px;
    width:98%;

    .item{
      margin-bottom: 20px;
      padding: 10px 20px;
      width:100%;

      .title {
      margin-bottom: 10px;
      padding-bottom: 10px;
      color: #333333;
      justify-content: space-between;
      cursor:pointer;
      font-weight: 600;
      border-bottom: 1px solid #D6D6D6;
      width:100%;

    .expand_sign {
      font-size: 20px;
      font-weight: 600;
    }
    }
    .content {
      color: #555555;
      max-height: 0;
      overflow:hidden;
      transition: all 0.5s cubic-bezier(0,1,0,1);
    }
    
    .content.show {
      height: auto;
      max-height: 9999px;
      transition: all 0.5s cubic-bezier(1,0,1,0);
    }
    }
  }
}


@media screen and (max-width: 768px) {

  .container {

    .faq_title {
      font-size: 15px;
      margin-top: 0px;
    }
  
    .accordion {
      margin-top: 50px;
      flex-direction:column
        
    .title {
      font-size: 0.6rem;

    }
    h2.question{
      font-size: 1rem;
    }
    .content {
      font-size: 0.6rem;
    }
    }
  }
}

@media screen and (max-width: 550px) { 
  .container {
    .accordion {
    h2.question{
      font-size: 0.8rem;
    }
    }

  }
}

@media screen and (max-width: 370px) { 
  .container {
    .faq_title {
      padding: 30px 0;
      font-size: 1rem;
    }
  
    .accordion {
      margin-top: 0px;
      .title {
        font-size: 1rem;
  
      }
    h2.question{
      font-size: 0.5rem;
    }
    }

  }
}

`;
