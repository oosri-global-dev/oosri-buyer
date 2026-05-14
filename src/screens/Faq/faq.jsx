import { FaqWrapper } from "./faq.styles";
import { useState, useMemo } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "getting-started", label: "Getting Started" },
  { id: "shopping", label: "Shopping & Orders" },
  { id: "payments", label: "Payments" },
  { id: "delivery", label: "Delivery & Tracking" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "disputes", label: "Disputes" },
  { id: "trust", label: "Trust & Safety" },
  { id: "other", label: "Other" },
];

const FAQ_DATA = [
  // Getting Started
  {
    category: "getting-started",
    question: "What is Oosri?",
    answer: "Oosri is an African marketplace serving international buyers in the USA, UK, Canada, EU, Australia, UAE, and more with authentic African made products.",
  },
  {
    category: "getting-started",
    question: "Do I need an account to shop?",
    answer: "Yes. Register with your email and password to place orders and track deliveries.",
  },
  {
    category: "getting-started",
    question: "Which countries does Oosri ship to?",
    answer: "Oosri ships internationally only — no deliveries within Nigeria.",
  },
  // Shopping & Orders
  {
    category: "shopping",
    question: "How do I place an order?",
    answer: "Browse → Choose a product → Add to cart → Pay → Track. It's that simple.",
  },
  {
    category: "shopping",
    question: "Can I message a seller directly?",
    answer: "Buyers cannot message sellers directly. All communication is handled by Oosri Support to ensure a safe and consistent experience.",
  },
  {
    category: "shopping",
    question: "How is product quality guaranteed?",
    answer: "All sellers are verified, and all items are reviewed for authenticity and quality before being listed on the platform.",
  },
  // Payments
  {
    category: "payments",
    question: "What payment methods are accepted?",
    answer: (
      <div>
        <p>We accept the following payment methods:</p>
        <ul>
          <li>International debit / credit cards</li>
          <li>Supported payment gateways</li>
        </ul>
      </div>
    ),
  },
  {
    category: "payments",
    question: "Are there extra charges at checkout?",
    answer: (
      <div>
        <p>Additional charges may apply depending on your location:</p>
        <ul>
          <li>International shipping fees</li>
          <li>Customs / import duties (varies by country)</li>
          <li>Foreign exchange charges from your bank</li>
        </ul>
      </div>
    ),
  },
  // Delivery & Tracking
  {
    category: "delivery",
    question: "How long does delivery take?",
    answer: (
      <div>
        <p>All shipments originate from Africa to international destinations:</p>
        <ul>
          <li>Express: 3–7 business days</li>
          <li>Standard: 5–14 business days</li>
        </ul>
      </div>
    ),
  },
  {
    category: "delivery",
    question: "How do I track my order?",
    answer: "Navigate to Account → Orders → Track Package to see live tracking updates for your shipment.",
  },
  {
    category: "delivery",
    question: "My order shows delivered but I haven't received it — what do I do?",
    answer: "First check with neighbours, your mailbox area, or reception desk. If still missing, contact Oosri Support right away and we'll investigate.",
  },
  // Returns & Refunds
  {
    category: "returns",
    question: "When am I eligible for a return?",
    answer: (
      <div>
        <p>Returns are accepted when:</p>
        <ul>
          <li>Item arrived damaged</li>
          <li>Wrong item was delivered</li>
          <li>Item is not as described in the listing</li>
          <li>Package never arrived</li>
        </ul>
      </div>
    ),
  },
  {
    category: "returns",
    question: "How do I initiate a return?",
    answer: "Go to Account → Orders → Report an Issue. Our support team will guide you through the return process.",
  },
  {
    category: "returns",
    question: "How long does a refund take?",
    answer: (
      <div>
        <ul>
          <li>Oosri wallet credit: 0–3 business days</li>
          <li>Card refund: 5–15 business days</li>
        </ul>
      </div>
    ),
  },
  // Disputes
  {
    category: "disputes",
    question: "How are disputes handled?",
    answer: "Oosri mediates all buyer-seller disputes. Our team reviews the evidence provided by both parties and issues a fair decision based on our policies.",
  },
  // Trust & Safety
  {
    category: "trust",
    question: "Why might my account be restricted?",
    answer: (
      <div>
        <p>Buyer accounts may be restricted for the following reasons:</p>
        <ul>
          <li>Chargeback abuse</li>
          <li>Fraudulent claims</li>
          <li>Repeated policy violations</li>
        </ul>
      </div>
    ),
  },
  // Other
  {
    category: "other",
    question: "Can I cancel my order?",
    answer: "Cancellations are allowed only before the seller has delivered the item to the Oosri warehouse. Once dispatched, cancellations cannot be processed.",
  },
  {
    category: "other",
    question: "Can I order from multiple sellers at once?",
    answer: "Yes. Items from different sellers are packaged and shipped separately, so arrival times may vary based on each seller's processing time.",
  },
];

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const questionText = typeof item.question === "string" ? item.question.toLowerCase() : "";
      const answerText = typeof item.answer === "string" ? item.answer.toLowerCase() : "";
      return questionText.includes(query) || answerText.includes(query);
    });
  }, [activeCategory, search]);

  const countForCategory = (id) =>
    id === "all"
      ? FAQ_DATA.length
      : FAQ_DATA.filter((item) => item.category === id).length;

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setOpenIndex(null);
  };

  const clearSearch = () => {
    setSearch("");
    setOpenIndex(null);
  };

  return (
    <FaqWrapper>
      {/* Hero */}
      <div className="faq__hero">
        <p className="hero__eyebrow">Help Center</p>
        <h1>Frequently Asked Questions</h1>
        <p className="hero__sub">
          Find quick answers about shopping, payments, delivery, and more.
        </p>
        <div className="search__bar">
          <span className="search__icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button className="clear__btn" onClick={clearSearch} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="faq__body">
        {/* Category pills */}
        <div className="category__pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`pill${activeCategory === cat.id ? " active" : ""}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
              <span className="pill__count">{countForCategory(cat.id)}</span>
            </button>
          ))}
        </div>

        {/* Result note when searching */}
        {search && (
          <p className="result__note">
            {filtered.length === 0
              ? "No results found"
              : <>Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for &ldquo;<strong>{search}</strong>&rdquo;</>}
          </p>
        )}

        {/* Accordion */}
        {filtered.length > 0 ? (
          <div className="accordion">
            {filtered.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`faq__item${isOpen ? " open" : ""}`}>
                  <button
                    className="faq__trigger"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="trigger__left">
                      <span className="category__dot" />
                      <span className="question__text">{item.question}</span>
                    </span>
                    <span className="chevron"><ChevronIcon /></span>
                  </button>
                  <div className={`faq__answer${isOpen ? " open" : ""}`}>
                    <div className="answer__inner">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty__state">
            <div className="empty__icon">🔍</div>
            <p>No questions match your search.</p>
            <button className="clear__search" onClick={clearSearch}>
              Clear search
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="contact__cta">
          <div className="cta__text">
            <p className="cta__title">Still have questions?</p>
            <p className="cta__sub">Our support team is here to help you out.</p>
          </div>
          <Link href="/contact-us" className="cta__btn">
            Contact Support →
          </Link>
        </div>
      </div>
    </FaqWrapper>
  );
}
