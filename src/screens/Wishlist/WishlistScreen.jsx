import EmptyState from "@/components/lib/EmptyState/EmptyState";
import { WishListWrapper } from "./WishlistScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useState } from "react";
import TextField from "@/components/lib/TextField";
import { CiSearch as SearchIcon } from "react-icons/ci";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";

export default function WishlistPage() {
  const [isEmpty,setIsEmpty]=useState(false)
  return (
    <WishListWrapper flexDir={"column"} alignItems={"start"}>
      <FlexibleDiv className="top_bar" justifyContent={"space-between"}>
       <h1>Saved Items</h1>
       {
        !isEmpty &&
        <TextField
          border="border: 1.5px solid rgba(224, 224, 224, 0.60)"
          style={{
            boxShadow:
              "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset",
          }}
          prefix={<SearchIcon size={22} />}
          placeholder="Search by product , store name"
          className="search__textbox"
        />
       }
      </FlexibleDiv>
      <div className="content_wrap">
        {
          isEmpty?
          <EmptyState />:
          <ProductCarousel carouselTitle={""} />
        }
      </div>
    </WishListWrapper>
  )
}
