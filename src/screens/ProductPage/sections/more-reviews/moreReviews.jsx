import { FlexibleDiv } from '@/components/lib/Box/styles'
import React, { useEffect, useState } from 'react'
import { AiFillStar as LikeIcon } from "react-icons/ai";
import ProductReviewBox from '../product-reviews/productReview';
import { MoreReviewsWrapper } from './moreReviews.styles';
import { ConfigProvider, Pagination, Slider } from 'antd';
import ReviewDetails from './reviewDetails';
import { getAllReviews } from '@/network/reviews';

export const MoreReviews = () => {
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(10)
  const [reviewData,setReviewData]=useState([])

  const fetchReviews = async (id) => {
    const data = await getAllReviews({ id });
    setReviewData(data);
  };

  useEffect(() => {
    fetchReviews("67b1a362b48f754a83d1a152");
  }, [currentPage]);


  useEffect(()=>{
    const handlefetch=async()=>{
      try{
        const data=await getAllReviews()
        console.log(data)
      }catch(errors){
        console.log(errors)
      }
    }
    handlefetch()
  },[])

  const StarRating = ({ rating, totalStars = 5, fontSize,justifyContent="center", gap="4px" }) => {
      const filledStars = Math.round(rating); // Round to nearest integer
      return (
          <FlexibleDiv justifyContent={justifyContent} gap={gap} style={{fontSize:fontSize?fontSize:"35px"}}>
          {Array.from({ length: totalStars }, (_, index) => (
              <LikeIcon key={index} color={index < filledStars ? "#FCCB1B":"#BBBBBB"} />
          ))}
          </FlexibleDiv>
      );
  };

    const CustomSlider=({rating,number,size})=>{
      return(
        <FlexibleDiv flexWrap={"noWrap"} gap={"12px"} className='slider_percent'>
          <FlexibleDiv width={"fit-content"} flexWrap={"noWrap"}>
            <p>{number}</p>
            <LikeIcon color="#FCCB1B"/>
          </FlexibleDiv>
          <ConfigProvider
            theme={{
              components:{
                Slider:{
                  trackBgDisabled:"#D24545",
                  trackBg:"#D24545",
                  trackHoverBg:"#D24545",
                  handleColor:"#D24545",
                  dotSize:"0px",
                  handleSize:10,
                  handleSizeHover:0,
                  railSize:size?size:19,
                }
              }
            }}
          >
            <Slider
                value={rating}
                max={100}
                range={false}
                draggableTrack={false}
                style={{ width: '200px'}}
            />
          </ConfigProvider>
          <p className='slider__percent'>{rating}%</p>
        </FlexibleDiv>
      )
    }
  const reviews = [
    {
      reviewerName: "Mike Tyson",
      likes: 4,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
      date:"24-11-2023",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 3,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",      date:"24-11-2023",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 5,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
      date:"24-11-2023",
    },
    {
      reviewerName: "Mike Tyson",
      likes: 1,
      review:
        "The iPhone 14 is a very good phone for the money, offering improved cameras, a faster A15 Bionic chip and fun.",
      date:"24-11-2023",
    },
  ];

  const starDetails=[
    {
      id:1,percent:60
    },
    {
      id:2,percent:47
    },
    {
      id:3,percent:34
    },
    {
      id:4,percent:23
    },
    {
      id:5,percent:12
    },
  ]

  return (
    <MoreReviewsWrapper>
          <FlexibleDiv className='left__section' gap={"16px"} >
            <div className='desktop_header'>
              <FlexibleDiv gap={"8px"}>
                <h1 className='customer__review'>Customer Reviews</h1>
                <p >Here is what our customers are saying</p>
              </FlexibleDiv>
              <FlexibleDiv flexDir={"column"} gap={"8px"}>
                <h1>4.0</h1>
                <StarRating rating={4} />
                <p>180 reviews</p>
              </FlexibleDiv>
              {/* Input */}
              <FlexibleDiv>
                {
                  starDetails.map((item,idx)=>{
                    return <CustomSlider key={idx} number={item.id} rating={item.percent} />
                  })
                }
              </FlexibleDiv>
            </div>
            <div className='mobile_header'>
              <FlexibleDiv justifyContent={"start"}>
                <h2>Custom Reviews</h2>
              </FlexibleDiv>
                <FlexibleDiv flexWrap={"noWrap"}>
                  <FlexibleDiv flexDir={"column"} gap={"12px"} alignItems={"start"}>
                    <p>Here is what our customers are saying</p>
                    <h3>4.3/5</h3>
                   <StarRating rating={4} fontSize={"18px"} justifyContent={"start"} gap={"0px"} />
                   <p>180 reviews</p>
                  </FlexibleDiv>
                  <FlexibleDiv>
                    {
                      starDetails.map((item,idx)=>{
                        return <CustomSlider size={10} key={idx} number={item.id} rating={item.percent} />
                      })
                    }
                  </FlexibleDiv>
                </FlexibleDiv>
            </div>
          </FlexibleDiv>
          {/*  right section*/}
          <FlexibleDiv>
              <ReviewDetails reviews={reviews} />
              <FlexibleDiv flexWrap={"noWrap"}>
              <Pagination 
                // showTotal={(total) => `Page ${currentPage} of ${total}`}
                onChange={(e)=>{setCurrentPage(e)}}
                current={currentPage}
                total={50}
                pageSize={5}
              />
              </FlexibleDiv>
          </FlexibleDiv>
    </MoreReviewsWrapper>
  )
}
