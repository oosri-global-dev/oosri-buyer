import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const PolicyWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  font-family: Arial, sans-serif;
  color: #222;
  line-height: 1.8;

  .back__button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 0.92rem;
    color: #444;
    cursor: pointer;
    margin-bottom: 32px;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .back__button:hover {
    background: #f5f5f5;
    border-color: #bbb;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111;
  }

  .last-updated {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 40px;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 48px;
    margin-bottom: 12px;
    color: #111;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 8px;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-top: 28px;
    margin-bottom: 8px;
    color: #333;
  }

  p {
    margin-bottom: 16px;
    font-size: 0.97rem;
  }

  ul {
    padding-left: 24px;
    margin-bottom: 16px;
  }

  ul li {
    margin-bottom: 8px;
    font-size: 0.97rem;
  }

  a {
    color: var(--orrsiPrimary, #e05555);
    text-decoration: underline;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0 28px;
    font-size: 0.9rem;
  }

  th {
    background: #f7f7f7;
    text-align: left;
    padding: 10px 12px;
    font-weight: 700;
    border: 1px solid #e0e0e0;
  }

  td {
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #fafafa;
  }

  .highlight-box {
    background: #fff8f8;
    border-left: 4px solid var(--orrsiPrimary, #e05555);
    padding: 16px 20px;
    margin: 24px 0;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .contact-box {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 24px;
    margin-top: 40px;
  }

  .toc {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 24px 28px;
    margin-bottom: 40px;
  }

  .toc h3 {
    margin-top: 0;
  }

  .toc ol {
    margin: 0;
    padding-left: 20px;
  }

  .toc li {
    margin-bottom: 6px;
    font-size: 0.95rem;
  }

  .toc a {
    text-decoration: none;
  }

  .toc a:hover {
    text-decoration: underline;
  }
`;

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy – Oosri</title>
        <meta
          name="description"
          content="Oosri's Privacy Policy. Learn how we collect, use, and protect your personal information."
        />
      </Head>
      <PolicyWrapper>

        <button className="back__button" onClick={() => router.back()}>
          ← Back
        </button>

        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: June 2025</p>

        <div className="highlight-box">
          Oosri Global operates as an online marketplace connecting independent
          sellers and buyers internationally. This Privacy Policy explains how
          we collect, use, share, and protect your personal information when you
          use the Oosri platform, and what rights you have over your data.
        </div>

        {/* Table of Contents */}
        <div className="toc">
          <h3>Contents</h3>
          <ol>
            <li><a href="#who-we-are">Who We Are</a></li>
            <li><a href="#information-we-collect">Information We Collect</a></li>
            <li><a href="#how-we-use">How We Use Your Information</a></li>
            <li><a href="#how-we-share">How We Share Your Information</a></li>
            <li><a href="#retention">Data Retention</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#your-rights">Your Rights</a></li>
            <li><a href="#cookies">Cookies and Tracking Technologies</a></li>
            <li><a href="#international">International Transfers</a></li>
            <li><a href="#california">California Residents (CCPA/CPRA)</a></li>
            <li><a href="#children">Children&apos;s Privacy</a></li>
            <li><a href="#changes">Changes to This Policy</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ol>
        </div>

        {/* 1. Who We Are */}
        <h2 id="who-we-are">1. Who We Are</h2>
        <p>
          Oosri Global (&quot;Oosri,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an online marketplace
          that connects independent sellers and buyers internationally. Oosri
          facilitates payments, logistics integrations, and dispute support,
          while buyers contract directly with sellers for purchases. For most
          personal data processed through the platform, Oosri acts as the data
          controller. Sellers are independent controllers for their own
          processing of buyer data outside of Oosri&apos;s platform purposes.
        </p>
        <p>
          This Privacy Policy applies to all users of the Oosri website,
          mobile applications, and related services (collectively, the
          &quot;Services&quot;).
        </p>

        {/* 2. Information We Collect */}
        <h2 id="information-we-collect">2. Information We Collect</h2>
        <p>We collect information in the following categories:</p>

        <h3>Information you provide to us</h3>
        <ul>
          <li><strong>Account information:</strong> name, email address, phone number, password, and gender when you register.</li>
          <li><strong>Order and transaction information:</strong> shipping address, payment details (processed via our payment processor — we do not store full card numbers), and order history.</li>
          <li><strong>Communications:</strong> messages sent through our platform, support requests, and feedback.</li>
          <li><strong>Seller information:</strong> business details, bank/payout information, and identity verification documents where required.</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li><strong>Device and usage data:</strong> IP address, browser type, operating system, pages visited, and clickstream data.</li>
          <li><strong>Cookies and similar technologies:</strong> session identifiers, analytics data, and preference settings. See our <a href="#cookies">Cookies section</a> for details.</li>
          <li><strong>Location data:</strong> approximate location inferred from IP address; precise location only if you grant permission.</li>
        </ul>

        <h3>Information from third parties</h3>
        <ul>
          <li>Payment processors and logistics/carrier partners (for transaction confirmation and delivery status).</li>
          <li>Fraud detection and identity verification services.</li>
          <li>Analytics providers (aggregated or pseudonymized usage data).</li>
          <li>Social login providers (such as Google), if you choose to sign in or register using a third-party account.</li>
        </ul>

        {/* 3. How We Use */}
        <h2 id="how-we-use">3. How We Use Your Information</h2>
        <p>We use personal information for the following purposes:</p>
        <ul>
          <li><strong>Operating the marketplace:</strong> processing registrations, orders, payments, and returns.</li>
          <li><strong>Customer support:</strong> responding to enquiries, disputes, and complaints.</li>
          <li><strong>Fraud prevention and security:</strong> detecting and preventing unauthorized access, fraud, and abuse.</li>
          <li><strong>Legal compliance:</strong> meeting obligations under applicable law including tax, accounting, and regulatory requirements.</li>
          <li><strong>Service improvement:</strong> analyzing usage to improve features, performance, and user experience.</li>
          <li><strong>Communications:</strong> sending transactional messages (order confirmations, shipping updates) and, where you have opted in, promotional messages.</li>
          <li><strong>Personalization:</strong> remembering your preferences and tailoring your experience.</li>
        </ul>
        <p>
          Where required by law (including under Nigeria&apos;s Data Protection Act
          2023, UK GDPR, and Canada&apos;s PIPEDA), we will identify and rely on a
          valid lawful basis for each processing activity, such as contract
          performance, legal obligation, legitimate interests, or consent.
        </p>

        {/* 4. How We Share */}
        <h2 id="how-we-share">4. How We Share Your Information</h2>

        <h3>With sellers</h3>
        <p>
          When you place an order, we share your name, delivery address, contact
          details, and order information with the relevant seller to enable
          fulfillment, shipping, customer support, and returns. Sellers are
          independent controllers for their own processing of this data and must
          comply with applicable privacy laws and Oosri&apos;s Seller Privacy
          Addendum.
        </p>

        <h3>With service providers and processors</h3>
        <p>
          We share data with trusted third-party service providers who process
          data on our behalf, including payment processors, logistics and carrier
          partners, cloud infrastructure providers, fraud detection services,
          customer support platforms, and analytics providers. These parties are
          bound by contractual obligations to process data only as instructed and
          to implement appropriate security measures.
        </p>

        <h3>For legal and safety reasons</h3>
        <p>
          We may disclose personal information to law enforcement, regulators, or
          other third parties where required or permitted by law, or where
          necessary to protect the rights, property, or safety of Oosri, our
          users, or the public.
        </p>

        <h3>Business transfers</h3>
        <p>
          If Oosri is involved in a merger, acquisition, or sale of all or part
          of its assets, personal information may be transferred as part of that
          transaction. We will notify you of any such change via a prominent
          notice on our website or by email.
        </p>

        <p>We do not sell your personal information to third parties for their own marketing purposes.</p>

        {/* 5. Retention */}
        <h2 id="retention">5. Data Retention</h2>
        <p>
          We retain personal information only as long as reasonably necessary for
          the purposes for which it was collected, or as required by law. The
          table below sets out our general retention periods:
        </p>

        <table>
          <thead>
            <tr>
              <th>Data Category</th>
              <th>Primary Purpose</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account profile data</td>
              <td>Account management, platform use</td>
              <td>Duration of account + 2 years after closure</td>
            </tr>
            <tr>
              <td>Order and transaction data</td>
              <td>Order fulfillment, dispute resolution</td>
              <td>7 years (legal/tax compliance)</td>
            </tr>
            <tr>
              <td>Fulfillment data (name, address, phone)</td>
              <td>Delivery, customer support</td>
              <td>24 months after order completion</td>
            </tr>
            <tr>
              <td>Invoices and tax records</td>
              <td>Compliance, accounting</td>
              <td>7 years</td>
            </tr>
            <tr>
              <td>Dispute / chargeback files</td>
              <td>Fraud prevention, dispute defense</td>
              <td>3 years after dispute closure</td>
            </tr>
            <tr>
              <td>Seller-to-buyer messages</td>
              <td>Support and dispute evidence</td>
              <td>24 months</td>
            </tr>
            <tr>
              <td>Device / analytics data</td>
              <td>Security, service improvement</td>
              <td>13 months (rolling)</td>
            </tr>
            <tr>
              <td>Marketing consent records</td>
              <td>Demonstrating lawful basis</td>
              <td>Until consent withdrawn + 3 years</td>
            </tr>
          </tbody>
        </table>

        <p>
          When data is no longer needed, we delete, anonymize, or securely
          destroy it in accordance with our data disposal procedures.
        </p>

        {/* 6. Security */}
        <h2 id="security">6. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access, loss,
          alteration, or disclosure. These include encryption in transit and at
          rest, access controls, and regular security reviews.
        </p>
        <p>
          In the event of a personal data breach that is likely to result in
          risk to your rights and freedoms, we will notify the relevant
          regulatory authority within 72 hours of becoming aware of the breach
          (as required under Nigeria&apos;s NDPA and UK GDPR) and will notify
          affected individuals without undue delay where the breach is high-risk.
          California residents will be notified as required by California breach
          notification law.
        </p>
        <p>
          While we take data security seriously, no system is completely secure.
          You are also responsible for keeping your account credentials
          confidential.
        </p>

        {/* 7. Your Rights */}
        <h2 id="your-rights">7. Your Rights</h2>
        <p>
          Depending on your location, you may have the following rights
          regarding your personal information:
        </p>
        <ul>
          <li><strong>Access:</strong> request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> request that we correct inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> request that we delete your personal data, subject to legal retention obligations.</li>
          <li><strong>Restriction:</strong> request that we restrict processing of your data in certain circumstances.</li>
          <li><strong>Objection:</strong> object to processing based on legitimate interests or for direct marketing purposes.</li>
          <li><strong>Portability:</strong> receive your data in a structured, commonly used format (where applicable).</li>
          <li><strong>Withdraw consent:</strong> where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
          <li><strong>Automated decision-making:</strong> you have the right not to be subject to solely automated decisions that have legal or similarly significant effects, and to request human review, express your view, and contest such decisions.</li>
        </ul>
        <p>
          To exercise your rights, please contact us at{" "}
          <a href="mailto:support@oosri.com">support@oosri.com</a>. We will
          respond within the timeframe required by applicable law. You also have
          the right to lodge a complaint with the relevant data protection
          authority in your jurisdiction.
        </p>

        {/* 8. Cookies */}
        <h2 id="cookies">8. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, pixels, and similar technologies to operate the
          marketplace, remember your preferences, detect fraud, measure
          performance, and (where permitted) show relevant advertising.
        </p>

        <h3>Cookie categories</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Purpose</th>
              <th>Consent Required?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strictly necessary</td>
              <td>Session management, authentication, security, fraud prevention</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Functional</td>
              <td>Language/region preferences, saved cart</td>
              <td>Yes (where required)</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>Usage measurement and service improvement (e.g. Google Analytics)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>Advertising attribution and targeting (e.g. Meta, TikTok)</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>

        <p>
          You can manage your cookie preferences at any time through our Cookie
          Settings. If you are in certain locations, you may also send an opt-out
          preference signal (such as Global Privacy Control) through your browser
          settings and we will honor it where required by law.
        </p>

        {/* 9. International */}
        <h2 id="international">9. International Transfers</h2>
        <p>
          Oosri operates globally and your personal information may be
          transferred to and processed in countries outside your own, including
          countries that may not provide the same level of data protection as
          your home jurisdiction.
        </p>
        <p>
          Where we transfer personal data from the UK or EEA, we rely on
          appropriate safeguards such as the UK International Data Transfer
          Agreement (IDTA) or Standard Contractual Clauses. For transfers from
          Nigeria, we comply with the cross-border transfer conditions under the
          Nigeria Data Protection Act 2023. For transfers involving Canadian
          personal information, we use contractual and other measures to maintain
          accountability for data transferred to third-party processors.
        </p>

        {/* 10. California */}
        <h2 id="california">10. California Residents (CCPA/CPRA)</h2>
        <p>
          If you are a California resident, you have additional rights under the
          California Consumer Privacy Act (CCPA) as amended by the CPRA:
        </p>
        <ul>
          <li><strong>Right to know:</strong> request disclosure of the categories and specific pieces of personal information we have collected about you, the sources, purposes, and third parties we share it with.</li>
          <li><strong>Right to delete:</strong> request deletion of your personal information, subject to certain exceptions.</li>
          <li><strong>Right to correct:</strong> request correction of inaccurate personal information.</li>
          <li><strong>Right to opt out of sale/sharing:</strong> you may direct us not to sell or share your personal information for cross-context behavioral advertising.</li>
          <li><strong>Right to limit sensitive personal information:</strong> where applicable, request that we limit the use of sensitive personal information beyond authorized purposes.</li>
          <li><strong>Non-discrimination:</strong> we will not discriminate against you for exercising your rights.</li>
        </ul>
        <p>
          We honor recognized opt-out preference signals (such as Global Privacy
          Control) where required. To submit a request, email us at{" "}
          <a href="mailto:support@oosri.com">support@oosri.com</a>. We will
          verify your identity and respond within the time required by California
          law.
        </p>

        {/* 11. Children */}
        <h2 id="children">11. Children&apos;s Privacy</h2>
        <p>
          Our Services are not directed to children under the age of 13 (or 16
          where required by applicable law). We do not knowingly collect personal
          information from children. If you believe a child has provided us with
          personal information, please contact us at{" "}
          <a href="mailto:support@oosri.com">support@oosri.com</a> and we will
          delete the information promptly.
        </p>

        {/* 12. Changes */}
        <h2 id="changes">12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, legal requirements, or other factors. We
          will post the updated policy on this page with a revised &quot;last updated&quot;
          date. For material changes, we will provide additional notice such as
          an email notification or a prominent banner on our website. Your
          continued use of the Services after any changes constitutes acceptance
          of the updated policy.
        </p>

        {/* 13. Contact */}
        <h2 id="contact">13. Contact Us</h2>
        <div className="contact-box">
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or how we handle your personal information, please
            contact us:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@oosri.com">support@oosri.com</a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://oosri.com" target="_blank" rel="noreferrer">
              oosri.com
            </a>
          </p>
          <p>
            You also have the right to lodge a complaint with the relevant data
            protection authority in your jurisdiction, including the Nigeria Data
            Protection Commission (NDPC), the UK Information Commissioner&apos;s
            Office (ICO), or the Office of the Privacy Commissioner of Canada
            (OPC).
          </p>
        </div>

      </PolicyWrapper>
    </>
  );
}