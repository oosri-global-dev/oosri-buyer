import { ProductDescWrapper } from "./productDescription.styles";

export default function ProductDescription({ content = "" }) {

  return (
    <ProductDescWrapper>
      <p>{content}</p>
    </ProductDescWrapper>
  );
}
