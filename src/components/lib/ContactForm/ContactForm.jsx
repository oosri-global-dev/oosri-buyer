import { ContactWrapper } from "./ContactForm.styles";
import { useState } from "react";
import { contactUs } from "@/network/contact";
import { useMainContext } from "@/context";
import { TOAST_BOX } from "@/context/types";
import { TbMessage as MailIcon } from "react-icons/tb";
import { IoCallOutline as PhoneIcon } from "react-icons/io5";
import { MdCheckCircle as CheckIcon, MdArrowForward as ArrowIcon, MdSchedule as ClockIcon } from "react-icons/md";
import Link from "next/link";

const MAX_MESSAGE = 1000;

const SUBJECTS = [
  { value: "", label: "Select a topic…" },
  { value: "order", label: "Order issue" },
  { value: "payment", label: "Payment problem" },
  { value: "product", label: "Product inquiry" },
  { value: "return", label: "Return or refund" },
  { value: "shipping", label: "Shipping & delivery" },
  { value: "account", label: "Account help" },
  { value: "partnership", label: "Partnership or business" },
  { value: "feedback", label: "General feedback" },
  { value: "other", label: "Other" },
];

const EMPTY = { fullName: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const { dispatch } = useMainContext();
  const [formData, setFormData] = useState(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const msgLen = formData.message.length;
  const charClass = msgLen >= MAX_MESSAGE ? "at__limit" : msgLen >= MAX_MESSAGE * 0.85 ? "near__limit" : "";

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "message" && value.length > MAX_MESSAGE) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, subject, message } = formData;
    if (!fullName || !email || !subject || !message) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please fill in all fields." } });
      return;
    }
    try {
      setIsLoading(true);
      await contactUs(formData);
      setSubmitted(true);
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: { type: "error", message: error?.response?.data?.message || "Something went wrong. Please try again." },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContactWrapper>
      {/* ── Hero ── */}
      <div className="contact__hero">
        <p className="hero__eyebrow">Support</p>
        <h1>How can we help?</h1>
        <p className="hero__sub">
          Our team is here for you. Send us a message and we&apos;ll get back
          to you within one business day.
        </p>
        <Link href="/faq" className="hero__faq__link">
          Looking for quick answers? Browse our FAQ <ArrowIcon size={13} />
        </Link>
      </div>

      {/* ── Body ── */}
      <div className="contact__body">

        {/* ── Form card ── */}
        <div className="form__card">
          {submitted ? (
            <div className="success__state">
              <div className="success__icon">
                <CheckIcon size={32} color="#00b85a" />
              </div>
              <p className="success__title">Message received!</p>
              <p className="success__desc">
                Thanks for reaching out. We&apos;ll review your message and reply to{" "}
                <strong>{formData.email}</strong> within one business day.
              </p>
              <button className="send__another" onClick={() => { setSubmitted(false); setFormData(EMPTY); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="form__title">Send us a message</p>
              <div className="response__badge">
                <ClockIcon size={15} />
                We typically reply within 1 business day
              </div>

              <div className="two__col">
                <div className="field__group">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    className="field__input"
                    id="fullName"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
                <div className="field__group">
                  <label htmlFor="email">Email address</label>
                  <input
                    className="field__input"
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field__group">
                <label htmlFor="subject">Topic</label>
                <select
                  className="field__select"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value} disabled={s.value === ""}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field__group">
                <label htmlFor="message">Message</label>
                <div className="textarea__wrapper">
                  <textarea
                    className="field__textarea"
                    id="message"
                    placeholder="Describe your issue or question in detail…"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <span className={`char__count ${charClass}`}>
                    {msgLen}/{MAX_MESSAGE}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="submit__btn"
                disabled={isLoading}
              >
                {isLoading ? "Sending…" : <>Send message <ArrowIcon size={16} /></>}
              </button>
            </form>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="info__panel">
          <a href="mailto:support@oosri.com" className="info__card">
            <div className="info__icon__wrap">
              <MailIcon size={20} />
            </div>
            <div className="info__text">
              <p className="info__label">Email</p>
              <p className="info__value">support@oosri.com</p>
              <p className="info__hint">Best for detailed inquiries</p>
            </div>
          </a>

          <a href="tel:+2347011067109" className="info__card">
            <div className="info__icon__wrap">
              <PhoneIcon size={20} />
            </div>
            <div className="info__text">
              <p className="info__label">Phone</p>
              <p className="info__value">+234 701 106 7109</p>
              <p className="info__hint">Mon – Fri, 9 am – 6 pm WAT</p>
            </div>
          </a>

          <div className="faq__card">
            <p className="faq__title">Quick answers</p>
            <p className="faq__desc">
              Shipping timelines, return policy, payment methods — our FAQ covers the most common questions.
            </p>
            <Link href="/faq">
              Browse FAQ <ArrowIcon size={13} />
            </Link>
          </div>
        </div>
      </div>
    </ContactWrapper>
  );
}
