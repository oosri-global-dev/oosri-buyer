import styled from "styled-components";

export const SingleCategoryBoxWrapper = styled.div`
  flex-shrink: 0;
  width: 155px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: #f8f8f8;
  border: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
    border-color: var(--orrsiPrimary);
  }

  /* Image fill area — must be position:relative for Next.js fill */
  .img__area {
    position: relative;
    width: 100%;
    height: 120px;
    flex-shrink: 0;
    overflow: hidden;
  }

  /* Name label */
  .name__area {
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 9px 10px;

    .category__name {
      margin: 0;
      font-size: 0.78rem;
      font-weight: 600;
      color: #1a1a1a;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 720px) {
    width: 128px;

    .img__area { height: 100px; }
  }

  @media (max-width: 430px) {
    width: 108px;
    border-radius: 10px;

    .img__area { height: 85px; }

    .name__area {
      padding: 7px 8px;

      .category__name { font-size: 0.72rem; }
    }
  }
`;
