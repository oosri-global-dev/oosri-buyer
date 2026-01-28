import { ProductDescWrapper } from "./productDescription.styles";

export default function ProductDescription({ content = "" }) {

  return (
    <ProductDescWrapper>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ProductDescWrapper>
  );
}
