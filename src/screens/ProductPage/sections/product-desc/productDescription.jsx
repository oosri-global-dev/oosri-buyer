import { useEffect } from "react";
import { ProductDescWrapper } from "./productDescription.styles";

export default function ProductDescription() {
  useEffect(() => {
    const seeMoreBtn = document.getElementsByClassName("see__more__reviews")[0];
    seeMoreBtn.style.display = "none";
  }, []);

  return (
    <ProductDescWrapper>
      <p>
        The iPhone 14 features a 6.1-inch (155 mm) display with Super Retina XDR
        OLED technology at a resolution of 2532 × 1170 pixels and a pixel
        density of about 460 PPI with a refresh rate of 60 Hz. The iPhone 14
        boasts a 6.1-inch (155 mm) Super Retina XDR OLED display, offering a
        resolution of 2532 × 1170 pixels and a pixel density of approximately
        460 PPI. This display operates at a 60 Hz refresh rate.
        <br />
        <br />
        The iPhone 14 features a 6.1-inch (155 mm) display with Super Retina XDR
        OLED technology at a resolution of 2532 × 1170 pixels and a pixel
        density of about 460 PPI with a refresh rate of 60 Hz.
      </p>
    </ProductDescWrapper>
  );
}
