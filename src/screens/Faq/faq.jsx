import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { FaqWrapper } from "./faq.styles";
import { useState } from "react";
import { FlexibleDiv, FlexibleSection } from "@/components/lib/Box/styles";


export default function FAQPage() {

  const faqCollection = [
    {
        question: `What is Oosri?`,
        answer: (
          <div>
            <p>Oosri is your one-stop destination for all things mobile phones. We are a specialized e-commerce platform dedicated to offering a wide selection of high-quality mobile devices, accessories, and related products. At Oosri, we pride ourselves on providing an extensive range of smartphones, from the latest flagship models to budget-friendly options, ensuring that every customer finds the perfect phone to meet their needs.</p>
  
            <p>Our mission is to make the mobile phone shopping experience convenient and enjoyable. We offer competitive pricing, secure payment options, and a seamless ordering process. With a focus on customer satisfaction, we also provide reliable shipping, a flexible return policy, and dedicated customer support to assist you at every step.</p> 
  
            <p>Whether you`re looking for the latest iPhone, Samsung Galaxy, Google Pixel, or any other popular brand, Oosri is your trusted partner for all your mobile phone needs. Explore our diverse product catalog, enjoy peace of mind with warranties, and experience a user-friendly interface as you shop for your ideal mobile device on Oosri.</p>
          </div>
        ),
    }, {
        question: `How can I place an order on Oosri?`,
        answer:   `To place an order on Oosri, simply browse our selection of mobile phones, choose the product you want, and click "Add to Cart." Follow the checkout process, provide your shipping and payment information, and confirm your order.`
    }, {
        question:  `What payment methods are accepted on Oosri?`,
        answer: `We accept a variety of payment methods, including credit cards, debit cards, PayPal, and other secure online payment options. You can choose the method that suits you best during the checkout process.`
    }, {
        question: `Do the products on Oosri come with warranties?`,
        answer: `Yes, most of our phones come with manufacturer warranties. The duration and terms of the warranty can vary by product, so please check the product details for warranty information. We also offer extended warranty options for added peace of mind.`
    }, {
        question:  `How can I contact Oosri's customer support?`,
        answer: `We offer multiple ways to get in touch with our customer support team. You can reach us via phone at [Customer Support Phone Number], send us an email at [Customer Support Email], or use the live chat feature on our website. Our support team is available [24/7] to assist you with any questions or concerns.`
    }
  ];
  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null)
    }

    setSelected(i)
  }
  return (
    <GeneralLayout>
      <FaqWrapper>
      <FlexibleSection className="container">
            <h1 className="faq_title">FREQUENTLY ASKED QUESTIONS (FAQs)</h1>
            <FlexibleDiv className="accordion">
                
                {faqCollection.map((item, i) => (
                  <FlexibleDiv className="item"  key={i}>
                    <FlexibleDiv className="title" onClick={() => toggle(i)}>
                      <h2 className="question">{item.question}</h2>
                      <span className="expand_sign">{selected === i ? '-' : '+'}</span>
                    </FlexibleDiv>
                    <FlexibleDiv className={selected === i ? 'content show' : 'content'}>{item.answer}</FlexibleDiv>
                  </FlexibleDiv>
                ))}
            </FlexibleDiv>
        </FlexibleSection>
      </FaqWrapper>
    </GeneralLayout>
  );
}
