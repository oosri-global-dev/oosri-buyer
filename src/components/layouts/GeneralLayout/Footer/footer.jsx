import { FooterWrapper } from "./footer.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    {
      linkName: "Home",
      linkUrl: "/",
    },
    {
      linkName: "Shop",
      linkUrl: "/shop",
    },
    {
      linkName: "New Arrivals",
      linkUrl: "/new-arrivals",
    },
    {
      linkName: "Order",
      linkUrl: "/order",
    },
  ];

  const aboutLinks = [
    {
      linkName: "Contact Us",
      linkUrl: "/contact",
    },
    {
      linkName: "FAQs",
      linkUrl: "/faq",
    },
    {
      linkName: "Terms of Use",
      linkUrl: "/terms-of-use",
    },
    {
      linkName: "Policy",
      linkUrl: "/policy",
    },
  ];
  return (
    <FooterWrapper>
      <FlexibleDiv className="section__box">
        <p>Hello</p>
      </FlexibleDiv>
      <FlexibleDiv className="section__box">
        <h3>Quick Links</h3>
        {quickLinks.map((sgn, idx) => (
          <Link className="single__link" href={sgn.linkUrl} key={idx}>
            {sgn.linkName}
          </Link>
        ))}
      </FlexibleDiv>
      <FlexibleDiv className="section__box">
        <h3>About</h3>
        {aboutLinks.map((sgn, idx) => (
          <Link className="single__link" href={sgn.linkUrl} key={idx}>
            {sgn.linkName}
          </Link>
        ))}
      </FlexibleDiv>
      <FlexibleDiv className="section__box">
        <h3>Newsletter Signup</h3>
      </FlexibleDiv>
    </FooterWrapper>
  );
}
