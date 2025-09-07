import styled from "styled-components";

export const MoreReviewsWrapper=styled.div`
    display:flex;
    gap:48px;
    align-items:start;
    flex-wrap:noWrap;
    width:100%;

    .mobile_header{
        display:none;

        h2{
            font-weight:400;
        }
    }

    .left__section{
        max-width:340px;
    }

    p{
        margin:0px;
        color:#616161;
        font-weight:400;

    }
    .customer__review{
        color:#212121;
        font-size:35px;
        font-weight:400;
        font-family:Inter;
    }

    .custom__slider{
          display: flex;
          align-items: center;
          font-family: Inter;
    }

    .progress{
        position: relative;
        width: 100%;
        height: 10px;
        background-color: #e0e0e0;
        border-radius: 10px;
    }

    .progress__bar{
        height: 100%;
        width: ${({ width }) => width}%;
        background-color: #ff4d4f;
        border-radius: 10px;
    }

    .ant-slider {
        margin: 2px 5px !important;
    }
    .ant-slider-handle::after{
        display:none !important;
    }

    .ant-slider .ant-slider-track{
        border-radius:12px !important;
    }

    .ant-slider-rail{
        border-radius:12px !important;
    }

    .slider__percent{
        color:#999999;
        font-size:14px;
    }

    .ant-slider-horizontal {
        padding-block: 10px !important;
        height: 40px !important;
    }   

        .pagination{
            // display:none;
        }

    .mobile__review__container{
        width:100%;
    }

    @media screen and (max-width: 768px) {
    .left__section{
        max-width:100%;
    }
        flex-direction:column;

        .desktop_header{
            display:none;
        }

        .ant-slider-horizontal {
            padding-block: 10px !important;
            height: 30px !important;
        }   

        .mobile_header{
            display:block;

            .heading__text__wrapper{
                padding:0px 0px 12px 12px;
                margin-bottom:12px;
                border-bottom: 1px solid #CFCFCF;
            }
        }

        .slider_percent{
            max-width:200px;
        }

        .pagination{
            display:block;
            margin-top:12px;
        }

        .mobile__review__container{
            padding:0px 12px 0px 0px;
        }
    }

    .ant-pagination-item-active:hover a {
         color: #333333;
    }

    .ant-pagination-item-active:hover {
        border-color: #FC5353;
    }
        
    .ant-pagination-item-active a {
        color: #FC5353;
        border-color: #FC5353;
    }
    .ant-pagination-item-active{
        color: #FC5353;
        border-color: #FC5353;
    }
`   



export const ReviewDetailWrapper=styled.div`
    border-bottom:1px solid #BBBBBB80;
    width:100%;
    margin:12px 0px;
`