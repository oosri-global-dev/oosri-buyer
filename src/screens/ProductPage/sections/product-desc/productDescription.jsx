import { ProductDescWrapper } from "./productDescription.styles";

export default function ProductDescription({ content = "" }) {
  useEffect(() => {
    const seeMoreBtn = document.getElementsByClassName("see__more__reviews")[0];
    seeMoreBtn.style.display = "none";
  }, []);

  return (
    <ProductDescWrapper>
      <p>{content}</p>
    </ProductDescWrapper>
  );
}
