import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const FaqWrapper = styled(FlexibleDiv)`
display: flex;

.container {
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  margin-top:100px;
  margin-bottom: 200px;
  padding:0;
}
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
  width:900px;
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column
}

.item{
  margin-bottom: 20px;
  padding: 10px 20px;
}

.title {
  margin-bottom: 10px;
  padding-bottom: 10px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  align-items:center;
  cursor:pointer;
  font-weight: 600;
  border-bottom: 1px solid #D6D6D6;
}

.expand_sign {
  font-size: 20px;
  font-weight: 600;
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

@media screen and (max-width: 768px) {

  .container {
    margin-top:30px;
    margin-bottom:0px;
  }
  .faq_title {
    max-width: 380px;
    font-size: 15px;
    margin-top: 0px;
  }

  .accordion {
    margin-top: 50px;
    width:380px;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column
  }

  .title {
    font-size: 0.6rem;
  }

  .content {
    font-size: 0.7rem;
  }
}

`;
