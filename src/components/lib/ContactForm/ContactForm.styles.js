import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ContactWrapper = styled(FlexibleDiv)`
.contact__header {
    width: 100%;
    height:150px;
    margin-bottom: 30px;
    padding:20px;
    background-size: cover;
    background-position: center;
    text-align: center;
    flex-direction:column;
    justify-content: center;
    color:var(--orrsiWhite);

h2 {
        font-size:2.5rem;
}
p {
        width:65%;
        font-size:1rem;
}    
}

.form__container{
    justify-content: space-around;
    margin: 10px 10px;
    padding: 30px;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0px 10px 40px 0px #09496A1A;

    .form {
        display:flex;
        flex-direction:column;
        gap:15px;
        border-right: 0.01px solid #BBBBBB4D;
        height:100%;
        // width:50%;


        .form__inputs label {
            color: #333333;
            margin-bottom: 4px;
        }
        .form__inputs .input, .form__inputs .textarea {
            border: 1.5px solid #EEEEEE;
            width: 300px;
            border-radius: 10px;
            background-color: #FAFAFA;
            outline:none;
            color: black;
        }
        .form__inputs .input { 
            height: 33px;
        }
        
        .form__inputs .textarea {
            height: 100px;
            resize:none;
            height:130px;
        }
        
        .form__submit__btn {
            height:36px;
            width: 300px;
            border-radius: 10px;
            font-weight: 600;
            margin-top: 15px;
            cursor:pointer;
        }
    }
}

// Info section

.info {
    display: flex;
    flex-direction:column;
    gap:0px;
    // border: 1px solid red;
    // width:30%;

    h2 {
        text-align:center;
        color: #555555;
        font-weight: 900;
        padding: 20px 0px;
    }

    .admin__details {
        justify-content: space-around;
        width: 300px;
        height: 40px;
        gap: 5px;
        text-align:center;

        .contact__icon {
            color:#555555;
            width: 36px;
            height:20px;
            flex:0.5;
        }
        
        p {
            flex:2;
            font-weight:500;
            text-align:left;
        }
        
        a{
            color: #333333;
            text-decoration: none;
        }
    }
}


@media screen and (max-width: 768px)  {
    .form__container{
        flex-direction:column;
        width: 85%;
        gap: 30px
    }

    .contact__header {
        width: 390px;
        height:100%;

        h2 {
            font-size:2rem;
        }
        p {
            width:98%;
            font-size:0.7rem;
        }
    }
}


@media screen and (max-width: 300px)  { 
    .form__container{
        width: 90%;
        flex-direction: row;
        
        .form {
            .form__inputs .input, .form__inputs .textarea {
                width: 180px;
            }
            
            .form__submit__btn {
                width: 180px;
            }
        }
    }

    .info {
        display: flex;
        flex-direction:column;
        gap:0px;
        // border: 1px solid red;
        // width:30%;
    
        h2 {
            text-align:center;
            color: #555555;
            font-weight: 900;
            padding: 20px 0px;
        }
    
        .admin__details {
            
            
            p {
                flex:2;
                font-weight:500;
                font-size: 0.8rem;
                text-align:left;
            }
        }
    }
}
`;