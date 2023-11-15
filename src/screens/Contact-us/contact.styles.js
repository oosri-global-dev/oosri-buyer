import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ContactWrapper = styled(FlexibleDiv)`

.form__container{
    display:flex;
    justify-content: space-around;
    align-items:center;
    margin: 10px 10px;
    padding: 30px;
    // border: 2px solid red;
    border-radius: 10px;
    width: 70%;
    box-shadow: 0px 10px 40px 0px #09496A1A;
}

.contact__header {
    width: 100%;
    height:150px;
    margin-bottom: 30px;
    padding:20px;
    background-size: cover;
    text-align: center;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    color:white;
}

.contact__header h2 {
    font-size:2.5rem;
}
.contact__header p {
    width:65%;
}
.form {
    display:flex;
    flex-direction:column;
    gap:15px;
}

.form__inputs label {
    display:block;
    color: #333333;
    margin-bottom: 4px;
}
.form__inputs input, .form__inputs textarea {
    border: 1.5px solid #EEEEEE;
    width: 250px;
    border-radius: 10px;
    background-color: #FAFAFA;
    outline:none;
    color: gray;
}
.form__inputs input { 
    height: 26px;
}

.form__inputs textarea {
    height: 100px;
    resize:none;
}

.form button {
    height:33px;
    width: 250px;
    border-radius: 10px;
    border:none;
    background-color: #FC5353;
    color: white;
    font-weight: 500;
    margin-top: 20px;
    cursor:pointer;
}
// Info section

.info {
    display: flex;
    flex-direction:column;
    gap:0px;
}

.info h2 {
    text-align:center;
    color: #555555;
    font-weight: 900;
    padding: 20px 0px;
}

.info .admin__details {
    display:flex;
    justify-content: space-around;
    align-items:center;
    width: 300px;
    height: 40px;
    gap: 5px;
    text-align:center;
}

.admin__details .contact__icon {
    color:#555555;
    width: 36px;
    height:20px;
    flex:0.5;

}

.admin__details p {
    flex:2;
    font-weight:500;
    text-align:left;
}

.admin__details p a{
    color: #333333;
    text-decoration: none;
}

@media screen and (max-width: 768px)  {
    .form__container{
        display:flex;
        flex-direction:column;
        width: 85%;
        gap: 30px
    }

    .contact__header {
        width: 390px;
        height:100%;
    }
    
    .contact__header p {
        width:98%;
    }
}
`;