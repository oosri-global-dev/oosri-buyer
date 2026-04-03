import { ContactWrapper } from './ContactForm.styles'
import TextField from "@/components/lib/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import { contactUs } from "@/network/contact";
import { TbMessage as Message } from 'react-icons/tb'
import { IoCallOutline as Phone } from "react-icons/io5";
import { PiHouseLight as House } from "react-icons/pi";
import ContactHeader from "@/assets/images/contactHeader.png";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, message } = formData;
    if (!fullName || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      await contactUs(formData);
      toast.success("Message sent successfully!");
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        <form className="form" onSubmit={handleSubmit}>
          <FlexibleDiv
            className="form__inputs"
            flexDir="column"
            alignItems="start"
          >
            <label htmlFor="fullName">Your Name</label>
            <TextField
              className="input"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </FlexibleDiv>

          <FlexibleDiv
            className="form__inputs"
            flexDir="column"
            alignItems="start"
          >
            <label htmlFor="email">Email Address</label>
            <TextField
              className="input"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FlexibleDiv>

          <FlexibleDiv
            className="form__inputs"
            flexDir="column"
            alignItems="start"
          >
            <label htmlFor="message">Message</label>
            <TextField
              className="textarea"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FlexibleDiv>

          <Button
            type="submit"
            color="var(--orrsiWhite)"
            backgroundColor="var(--orrsiPrimary)"
            className="form__submit__btn"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
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
        </div>
      </FlexibleSection>
    </ContactWrapper>
  );
}