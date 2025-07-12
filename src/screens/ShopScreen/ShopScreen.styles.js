import styled from "styled-components";
import { FlexibleDiv } from "@/components/lib/Box/styles";

export const ShopPageWrapper = styled(FlexibleDiv)`
  position: relative;

  hr {
    border: 0.4px solid #f5f5f5;
    width: 100%;
  }

  .products__section {
    margin-top: 25px;

    .filter__box {
      width: 25%;
      height: auto;
      border-radius: 15px;
      border: 1px solid #ccc;
      min-width: 270px;
      padding: 10px 14px;
      box-sizing: border-box;

      .category__filters {
        width: 100%;
        .custom__checkbox__group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .ant-checkbox-wrapper-checked {
            color: var(--orrsiPrimary);
          }
        }

        .price__range {
          width: 100%;
        }

        .subcategory__select {
          width: 100%;
          margin-top: 10px;

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
          }
        }

        .selected__tags {
          margin-top: 15px;
          width: 100%;
          p {
            font-weight: 500;
          }
          .ant-tag {
            margin-top: 5px;
          }
        }
      }
    }

    .products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      justify-items: start;
      justify-content: start;
      flex: 1;
      max-width: initial;
      align-items: flex-start;
    }
  }

  @media (max-width: 600px) {
    .products__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
