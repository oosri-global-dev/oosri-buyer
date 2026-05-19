import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const SkeletonCard = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 16px;
  padding: 20px 24px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function OrderCardSkeleton() {
  return (
    <SkeletonTheme baseColor="rgba(148,148,148,0.1)" highlightColor="rgba(202,202,202,0.4)">
      <SkeletonCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton width={160} height={18} borderRadius={6} />
          <Skeleton width={90} height={28} borderRadius={20} />
        </div>
        <div style={{ display: "flex", gap: 16, padding: "12px", background: "#fafafa", borderRadius: 10 }}>
          <Skeleton width={80} height={80} borderRadius={10} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton width="70%" height={16} borderRadius={4} />
            <Skeleton width="50%" height={12} borderRadius={4} />
            <Skeleton width="30%" height={12} borderRadius={4} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #eee" }}>
          <Skeleton width={120} height={13} borderRadius={4} />
          <Skeleton width={80} height={20} borderRadius={4} />
        </div>
      </SkeletonCard>
    </SkeletonTheme>
  );
}
