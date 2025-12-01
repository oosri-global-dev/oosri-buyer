import { FooterWrapper, TopSectionWrapper } from "./footer.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Link from "next/link";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import PaymentMethodImage from '@/assets/images/payment-method.svg'
import {PiCopyrightLight as CopyrightIcon} from 'react-icons/pi'
import Logo from "@/assets/images/homepage/logo.png";
import Image from "next/image";
import {
  BsFacebook as FacebookIcon,
  BsInstagram as InstagramIcon,
} from "react-icons/bs";
import { FaSquareXTwitter as TwitterIcon } from "react-icons/fa6";

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
      linkName: "Order",
      linkUrl: "/order",
    },
  ];

  const aboutLinks = [
    {
      linkName: "Contact Us",
      linkUrl: "/contact-us",
    },
    {
      linkName: "FAQs",
      linkUrl: "/faq",
    },
    {
      linkName: "Terms of Use",
      linkUrl: "/terms-of-use",
    },
  ];
  return (
    <FooterWrapper>
      <FlexibleDiv className="footer__content">
        <TopSectionWrapper>
          <FlexibleDiv className="section__box box__1">
            <Image className="site__logo" src={Logo} alt="site-logo" />
            <FlexibleDiv
              justifyContent="flex-start"
              flexWrap="nowrap"
              alignItems="flex-start"
              gap="15px"
            >
              <FacebookIcon size={28} />
              <TwitterIcon size={30} />
              <InstagramIcon size={28} />
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv className="section__box box__2">
            <h3>Quick Links</h3>
            {quickLinks.map((sgn, idx) => (
              <Link className="single__link" href={sgn.linkUrl} key={idx}>
                {sgn.linkName}
              </Link>
            ))}
          </FlexibleDiv>
          <FlexibleDiv className="section__box box__3">
            <h3>About</h3>
            {aboutLinks.map((sgn, idx) => (
              <Link className={`single__link`} href={sgn.linkUrl} key={idx}>
                {sgn.linkName}
              </Link>
            ))}
          </FlexibleDiv>
          <FlexibleDiv className="section__box box__4">
            <h3>Newsletter Signup?</h3>
            <FlexibleDiv className="newsletter__wrapper" flexWrap="nowrap">
              <TextField placeholder="Enter your Email Address" />
              <Button
                color="var(--orrsiWhite)"
                backgroundColor="var(--orrsiPrimary)"
              >
                Subscribe
              </Button>
            </FlexibleDiv>
            <p>We Accept</p>
            <img src={PaymentMethodImage.src} alt="payment-methods" />
          </FlexibleDiv>
        </TopSectionWrapper>
        <FlexibleDiv className="bottom__section">
          <p>
            <CopyrightIcon /> {new Date().getFullYear()} Oosri.com All rights
            reserved
          </p>
        </FlexibleDiv>
      </FlexibleDiv>
    </FooterWrapper>
  );
}
