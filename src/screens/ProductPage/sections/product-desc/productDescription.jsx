import { ProductDescWrapper } from "./productDescription.styles";
import { sanitizeHtml } from "@/utils/security";

export default function ProductDescription({ content = "" }) {
  return (
    <ProductDescWrapper>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
    </ProductDescWrapper>
  );
}
