import {ContactWrapper} from './ContactForm.styles'
import TextField from "@/components/lib/TextField";
import {TbMessage as Message} from 'react-icons/tb'
import { IoCallOutline as Phone} from "react-icons/io5";
import { PiHouseLight as House } from "react-icons/pi";
import ContactHeader from "@/assets/images/contactHeader.png";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";

export default function ContactForm() {
    return (
      <ContactWrapper>
        <FlexibleDiv
          className="contact__header"
          style={{ backgroundImage: `url(${ContactHeader.src})` }}
        >
          <h2>Contact Us</h2>
          <p>
            Get in touch with us; we`re here to help! Have questions, feedback,
            or need assistance? Reach out, and our dedicated team will assist
            you promptly.
          </p>
        </FlexibleDiv>

        <FlexibleSection className="form__container">
          <form className="form">
            <FlexibleDiv
              className="form__inputs"
              flexDir="column"
              alignItems="start"
            >
              <label htmlFor="name">Your Name</label>
              <TextField className="input" id="name" required />
            </FlexibleDiv>

            <FlexibleDiv
              className="form__inputs"
              flexDir="column"
              alignItems="start"
            >
              <label htmlFor="email">Email Address</label>
              <TextField className="input" id="email" required />
            </FlexibleDiv>

            <FlexibleDiv
              className="form__inputs"
              flexDir="column"
              alignItems="start"
            >
              <label htmlFor="message">Message</label>
              <TextField className="textarea" id="message" />
            </FlexibleDiv>

            <Button
              type="submit"
              color="var(--orrsiWhite)"
              backgroundColor="var(--orrsiPrimary)"
              className="form__submit__btn"
            >
              Send Message
            </Button>
          </form>

          <div className="info">
            <h2>Info</h2>
            <FlexibleDiv className="admin__mail admin__details">
              <Message className="contact__icon" />
              <p>
                <a href="mailto:support@oosri.com">support@oosri.com</a>
              </p>
            </FlexibleDiv>
            <FlexibleDiv className="admin__contact admin__details">
              <Phone className="contact__icon" />
              <p>
                <a href="tel:+2347011067109">+2347011067109</a>
              </p>
            </FlexibleDiv>
            <FlexibleDiv className="admin__location admin__details">
              <House className="contact__icon" />
              <p>LoremIpsum Lorem Ipsumlorem</p>
            </FlexibleDiv>
          </div>
        </FlexibleSection>
      </ContactWrapper>
    );
}