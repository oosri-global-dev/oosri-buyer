import EmptyState from "@/components/lib/EmptyState/EmptyState";
import { WishListWrapper } from "./WishlistScreen.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useState, useMemo } from "react";
import TextField from "@/components/lib/TextField";
import { CiSearch as SearchIcon } from "react-icons/ci";
import ProductCard from "@/components/lib/ProductCard/productCard";
import { useSavedItemsQuery } from "@/network/product";
import { Spin } from "antd";

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: savedItemsData, isLoading, isError } = useSavedItemsQuery();

  const savedItems = useMemo(() => {
    return savedItemsData?.body?.savedItems || [];
  }, [savedItemsData]);

  // Filter saved items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return savedItems;

    const query = searchQuery.toLowerCase();
    return savedItems.filter((item) => {
      // Handle different response structures
      const product = item?.product || item;
      const productName = product?.productName?.toLowerCase() || "";
      const sellerName =
        product?.sellerName?.toLowerCase() ||
        item?.sellerName?.toLowerCase() ||
        "";
      return productName.includes(query) || sellerName.includes(query);
    });
  }, [savedItems, searchQuery]);

  const hasItems = savedItems.length > 0;
  const isSearchEmpty = !isLoading && hasItems && filteredItems.length === 0;
  const isWishlistEmpty = !isLoading && !hasItems;


  return (
    <WishListWrapper flexDir={"column"} alignItems={"start"}>
      <FlexibleDiv className="top_bar" justifyContent={"space-between"}>
        <h1>Saved Items</h1>
        {hasItems && !isLoading && (
          <TextField
            border="border: 1.5px solid rgba(224, 224, 224, 0.60)"
            style={{
              boxShadow:
                "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset",
            }}
            prefix={<SearchIcon size={22} />}
            placeholder="Search by product , store name"
            className="search__textbox"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </FlexibleDiv>
      <div className="content_wrap">
        {isLoading ? (
          <FlexibleDiv
            width="100%"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "400px" }}
          >
            <Spin size="large" />
          </FlexibleDiv>
        ) : isWishlistEmpty ? (
          <EmptyState
            title={"You haven't saved an item yet!"}
            paragraph={
              "Spotted something appealing? Simply tap the heart-shaped icon beside the item to save it to your wishlist! All your cherished items will be displayed here."
            }
          />
          ) : isSearchEmpty ? (
            <EmptyState
              title={"No items found"}
              paragraph={"We couldn't find any items matching your search."}
            />
        ) : (
          <FlexibleDiv
            width="100%"
            justifyContent="space-between"
            margin="30px 0 0 0"
          >
            {filteredItems.map((item, idx) => {
              // Handle different response structures
              const product = item?.product || item;
              return <ProductCard card={product} key={product?._id || idx} />;
            })}
          </FlexibleDiv>
        )}
      </div>
    </WishListWrapper>
  );
}
