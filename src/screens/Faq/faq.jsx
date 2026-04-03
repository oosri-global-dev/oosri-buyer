import {
  FaqWrapper,
  FaqItem,
  FaqTitle,
  FaqContent,
  ExpandIcon,
} from "./faq.styles";
import { useState } from "react";
import { FlexibleSection } from "@/components/lib/Box/styles";

export default function FAQPage() {
  const faqCollection = [
    // 1. GETTING STARTED
    {
      question: `1.1 What is Oosri?`,
      answer: `Oosri is an African marketplace serving international buyers in the USA, UK, Canada, EU, Australia, UAE, and more with authentic African made products.`,
    },
    {
      question: `1.2 Do I need an account?`,
      answer: `Yes. Register with your email and password.`,
    },
    {
      question: `1.3 Supported Countries`,
      answer: `Oosri ships internationally only—no deliveries within Nigeria.`,
    },
    // 2. SHOPPING & ORDERS
    {
      question: `2.1 How to Order`,
      answer: `Browse → Choose product → Add to cart → Pay → Track.`,
    },
    {
      question: `2.2 No Direct Messaging`,
      answer: `Buyers cannot message Sellers. Oosri Support handles communication.`,
    },
    {
      question: `2.3 Product Quality`,
      answer: `All Sellers are verified, and all items are reviewed for authenticity and quality.`,
    },
    // 3. PAYMENTS
    {
      question: `3.1 Payment Methods`,
      answer: (
        <div>
          <p>Payment methods accepted:</p>
          <ul>
            <li>International debit/credit cards</li>
            <li>Supported payment gateways</li>
          </ul>
        </div>
      ),
    },
    {
      question: `3.2 Extra Charges`,
      answer: (
        <div>
          <p>Additional charges may apply:</p>
          <ul>
            <li>International shipping</li>
            <li>Customs fees (varies by country)</li>
            <li>FX charges from your bank</li>
          </ul>
        </div>
      ),
    },
    // 4. DELIVERY & TRACKING
    {
      question: `4.1 Delivery Time`,
      answer: (
        <div>
          <p>All shipments are from Africa to international destinations.</p>
          <ul>
            <li>Express: 3–7 days</li>
            <li>Standard: 5–14 days</li>
          </ul>
        </div>
      ),
    },
    {
      question: `4.2 Tracking`,
      answer: `Available under Account → Orders → Track Package`,
    },
    {
      question: `4.3 If Marked Delivered but Missing`,
      answer: `Check neighbours, mailbox areas, reception, then contact Oosri Support.`,
    },
    // 5. RETURNS & REFUNDS
    {
      question: `5.1 Return Eligibility`,
      answer: (
        <div>
          <p>Allowed if:</p>
          <ul>
            <li>Damaged</li>
            <li>Wrong item</li>
            <li>Not as described</li>
            <li>Never arrived</li>
          </ul>
        </div>
      ),
    },
    {
      question: `5.2 Return Process`,
      answer: `Go to Account → Orders → Report an Issue.`,
    },
    {
      question: `5.3 Refund Time`,
      answer: (
        <div>
          <ul>
            <li>Wallet: 0–3 days</li>
            <li>Card: 5–15 days</li>
          </ul>
        </div>
      ),
    },
    // 6. DISPUTES
    {
      question: `6. DISPUTES`,
      answer: `Oosri mediates all issues and issues decisions based on evidence.`,
    },
    // 7. TRUST & SAFETY
    {
      question: `7. TRUST & SAFETY`,
      answer: (
        <div>
          <p>Buyer accounts may be restricted for:</p>
          <ul>
            <li>Chargeback abuse</li>
            <li>Fraudulent claims</li>
            <li>Policy violations</li>
          </ul>
        </div>
      ),
    },
    // 8. OTHER QUESTIONS
    {
      question: `8.1 Order Cancellation`,
      answer: `Allowed ONLY before Seller delivers item to Oosri warehouse.`,
    },
    {
      question: `8.2 Multi-Seller Orders`,
      answer: `Yes, items arrive separately based on Seller packaging times.`,
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FaqWrapper>
      <FlexibleSection className="container">
        <h1 className="faq_title">OOSRI BUYER FAQ</h1>
        <div className="accordion">
          {faqCollection.map((item, index) => (
            <FaqItem key={index} isOpen={openIndex === index}>
              <FaqTitle onClick={() => toggleItem(index)}>
                <h2 className="question">{item.question}</h2>
                <ExpandIcon isOpen={openIndex === index}>
                  {openIndex === index ? "−" : "+"}
                </ExpandIcon>
              </FaqTitle>
              <FaqContent isOpen={openIndex === index}>
                <div className="answer-content">{item.answer}</div>
              </FaqContent>
            </FaqItem>
          ))}
        </div>
      </FlexibleSection>
    </FaqWrapper>
  );
}
