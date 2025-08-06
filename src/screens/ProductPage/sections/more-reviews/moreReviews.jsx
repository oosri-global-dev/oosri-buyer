import { FlexibleDiv } from '@/components/lib/Box/styles'
import React, { useEffect, useState } from 'react'
import { AiFillStar as LikeIcon } from "react-icons/ai";
import ProductReviewBox from '../product-reviews/productReview';
import { MoreReviewsWrapper } from './moreReviews.styles';
import { ConfigProvider, Pagination, Slider } from 'antd';
import ReviewDetails from './reviewDetails';
import { getAllReviews } from '@/network/reviews';
import { IoIosArrowRoundBack } from "react-icons/io";

export const MoreReviews = ({id,reviewData,starData,setMoreReviewsActive}) => {
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(10)
  const [newReviewData,setNewReviewData]=useState(reviewData)
  const [totalRatings,setTotalRatings]=useState(null)
  // const [starDetails,setStarDetails]=useState([])
  const values = Object?.values(starData?.productRatingPercentage);


  useEffect(()=>{
    const fetchReviews = async () => {
      const data = await getAllReviews(id,currentPage);
      setNewReviewData(data?.body?.reviews);
    };
     fetchReviews()
  },[id,currentPage])

    useEffect(() => {
     function fetchAndCalculateAverage() {
      if(values) {
        const totalResponses =newReviewData?.length;

        if (totalResponses === 0) {
          setTotalRatings(0);
          return;
        }

        // Calculate weighted sum
        let weightedSum = 0;
        for (let i = 1; i <= 5; i++) {
          weightedSum += (i+1) * Number(values[i] || 0);
          console.log("val:",weightedSum);
        }
        const average = weightedSum / (totalResponses *100);
        const formattedAverage = Number.isInteger(average)
          ? average
          : parseFloat(average.toFixed(2));

        setTotalRatings(formattedAverage);
      }
    }
    fetchAndCalculateAverage();
  }, [newReviewData,values]);




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
      <FlexibleDiv width={"100%"} padding={"0px 240ppx"}>
        <FlexibleDiv flexWrap={"noWrap"} justifyContent={"start"} gap={"12px"} className='slider_percent'>
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
      </FlexibleDiv>
    )
  }


  const starDetails=[
    {
      id:1,percent:values[0].replace('.00', '')
    },
    {
      id:2,percent:values[1].replace('.00', '')
    },
    {
      id:3,percent:values[2].replace('.00', '')
    },
    {
      id:4,percent:values[3].replace('.00', '')
    },
    {
      id:5,percent:values[4].replace('.00', '')
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
                <h1>{totalRatings}</h1>
                <StarRating rating={totalRatings} />
                <p>{newReviewData?.length> 1?`${newReviewData?.length} reviews`:`${newReviewData?.length} review`}</p>
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
              <FlexibleDiv justifyContent={"start"}  className='heading__text__wrapper' gap={"12px"}>
                <FlexibleDiv onClick={setMoreReviewsActive} width={"fit-content"} style={{fontSize:"34px"}}>
                 <IoIosArrowRoundBack />
                </FlexibleDiv>
                <h2 className='heading__text'>Custom Reviews</h2>
              </FlexibleDiv>
                <FlexibleDiv flexWrap={"noWrap"}>
                  <FlexibleDiv flexDir={"column"} gap={"12px"} alignItems={"start"}>
                    <p>Here is what our customers are saying</p>
                    <h3>{totalRatings}/5</h3>
                   <StarRating rating={totalRatings} fontSize={"18px"} justifyContent={"start"} gap={"0px"} />
                    <p>{newReviewData?.length> 1?`${newReviewData?.length} reviews`:`${newReviewData?.length} review`}</p>
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
          <FlexibleDiv margin={"0px 12px"}>
            <div className='mobile__review__container'>
              <ReviewDetails reviews={newReviewData} />
            </div>
              <FlexibleDiv flexWrap={"noWrap"} className='pagination'>
              <Pagination 
                // showTotal={(total) => `Page ${currentPage} of ${total}`}
                onChange={(e)=>{setCurrentPage(e)}}
                current={currentPage}
                total={newReviewData?.length}
                // total={20}
                pageSize={5}
              />
              </FlexibleDiv>
          </FlexibleDiv>
    </MoreReviewsWrapper>
  )
}
