import { SingleCategoryBoxWrapper } from "./single-category-box.styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingCategoryBox() {
  return (
    <SingleCategoryBoxWrapper>
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <div className="category__image" style={{ width: "100%" }}>
          <Skeleton style={{ height: "100%", width: "100%" }} />
        </div>
        <div style={{ width: "100%", padding: "11px 12px", borderTop: "1px solid #f0f0f0" }}>
          <Skeleton style={{ width: "65%", height: "14px" }} />
        </div>
      </SkeletonTheme>
    </SingleCategoryBoxWrapper>
  );
}
