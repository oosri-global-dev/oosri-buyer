import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingCategoryBox({ key }) {
  return (
    <SingleCategoryBoxWrapper key={key}>
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <div className="category__image" style={{width: "100%", maxWidth: "90%", padding: "10px 0"}}>
          <Skeleton style={{ height: "100%" }} />
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <Skeleton
            style={{ width: "60%", height: "22px", margin: "0px 0 5px 10px" }}
          />
        </div>
      </SkeletonTheme>
    </SingleCategoryBoxWrapper>
  );
}
