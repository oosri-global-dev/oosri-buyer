import {
  TermsOfUseWrapper,
  DownloadButton,
  Header,
  Section,
  SubSection,
  SubSubSection,
  Paragraph,
  List,
  ListItem,
} from "./TermOfUse.styles";
import { FaDownload as Download } from "react-icons/fa";

export const TermsOfUsePage = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/documents/terms-of-use.pdf";
    link.download = "Oosri-Buyer-Terms-of-Use.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TermsOfUseWrapper>
      <Header>OOSRI BUYER TERMS OF USE (BUYER AGREEMENT)</Header>

      <DownloadButton onClick={handleDownload}>
        <Download size={20} />
        Download PDF
      </DownloadButton>

      <Paragraph>
        These Oosri Buyer Terms of Use (&quot;Buyer Terms&quot;) govern your use
        of the Oosri online marketplace as a Buyer. They supplement the general
        Oosri Platform Terms & Conditions and our Privacy Policy (together, the
        &quot;Oosri Terms&quot;). If there is any conflict, the terms that most
        protect Oosri will prevail, to the extent permitted by law. By creating
        an account, browsing, or purchasing products on Oosri, you agree to be
        bound by these Buyer Terms and the Oosri Terms. If you do not agree, do
        not use Oosri.
      </Paragraph>

      <Section>1. ABOUT OOSRI</Section>

      <SubSection>1.1 Marketplace Only</SubSection>
      <Paragraph>
        Oosri is an online marketplace that connects independent sellers
        <b>(&quot;Sellers&quot;)</b> with buyers <b>(&quot;Buyers&quot;)</b>.
        Except where explicitly stated, Oosri is not the manufacturer, owner, or
        seller of products listed by third-party Sellers.
      </Paragraph>

      <SubSection>1.2 Your Contract Is With the Seller</SubSection>
      <Paragraph>
        When you purchase a product on Oosri, you enter into a direct sales
        contract with the Seller. Oosri is not a party to that contract, but may
        facilitate payment, logistics, and dispute handling.
      </Paragraph>

      <SubSection>1.3 No Guarantee of Seller Identity or Conduct</SubSection>
      <Paragraph>
        Oosri performs reasonable checks but does not guarantee any Seller's
        identity, legal compliance, capability, or product quality.
      </Paragraph>

      <SubSection>1.4 Oosri's Facilitation Role</SubSection>
      <Paragraph>Oosri provides:</Paragraph>
      <List>
        <ListItem>Product discovery and listing tools</ListItem>
        <ListItem>Checkout and payment infrastructure</ListItem>
        <ListItem>Logistics integrations where applicable</ListItem>
        <ListItem>
          Dispute handling processes and Buyer Protection (where applicable)
        </ListItem>
      </List>
      <Paragraph>
        Oosri may intervene in disputes but does not guarantee outcomes.
      </Paragraph>

      <Section>2. ELIGIBILITY & ACCOUNT CREATION</Section>

      <SubSection>2.1 Age & Capacity</SubSection>
      <Paragraph>
        You must be at least 18 years old and legally capable of entering into
        binding contracts.
      </Paragraph>

      <SubSection>2.2 Account Information</SubSection>
      <Paragraph>
        To use key features (including purchasing), you must create an Oosri
        account (&quot;Account&quot;) and provide accurate, current, and
        complete information. You must promptly update your details if they
        change.
      </Paragraph>

      <SubSection>2.3 Account Security</SubSection>
      <Paragraph>You are responsible for:</Paragraph>
      <List>
        <ListItem>
          Maintaining the confidentiality of your login credentials;
        </ListItem>
        <ListItem>Restricting access to your devices; and</ListItem>
        <ListItem>All activity occurring under your Account.</ListItem>
      </List>
      <Paragraph>
        Notify Oosri immediately if you suspect unauthorised access.
      </Paragraph>

      <SubSection>2.4 Verification (KYC)</SubSection>
      <Paragraph>
        Oosri may at any time request additional verification (e.g. ID, address
        proof, payment verification). If you fail to provide this or Oosri
        reasonably doubts your information, Oosri may:
      </Paragraph>
      <List>
        <ListItem>Suspend or restrict your Account;</ListItem>
        <ListItem>Cancel Orders;</ListItem>
        <ListItem>Withhold funds; or</ListItem>
        <ListItem>Terminate your Account.</ListItem>
      </List>
      <Paragraph>
        Oosri is not liable for losses caused by such actions taken in good
        faith.
      </Paragraph>

      <Section>3. LICENCE & PERMITTED USE</Section>

      <SubSection>3.1 Limited Licence</SubSection>
      <Paragraph>
        Subject to these Buyer Terms and the Oosri Terms, Oosri grants you a
        limited, revocable, non-exclusive, non-transferable licence to access
        and use the Platform for lawful personal or business purchasing.
      </Paragraph>

      <SubSection>3.2 Prohibited Use of the Platform</SubSection>
      <Paragraph>You must not:</Paragraph>
      <List>
        <ListItem>
          Use any scraper, robot, spider, or other automated tools to access or
          extract data;
        </ListItem>
        <ListItem>
          Copy, reproduce, sell, resell, or exploit any part of the Platform for
          commercial purposes without Oosri's written consent;
        </ListItem>
        <ListItem>
          Reverse-engineer, decompile, or tamper with the Platform's software or
          security features;
        </ListItem>
        <ListItem>
          Frame or mirror any part of the Platform without Oosri's consent;
        </ListItem>
        <ListItem>
          Attempt to bypass or avoid Oosri's fees or payment flows.
        </ListItem>
      </List>

      <SubSection>3.3 Withdrawal of Licence</SubSection>
      <Paragraph>
        Oosri may suspend or revoke your licence and access at any time if you
        breach these Buyer Terms, the Oosri Terms, or applicable law.
      </Paragraph>

      <Section>4. ELECTRONIC COMMUNICATIONS</Section>
      <Paragraph>
        By using Oosri or sending communications to us electronically, you
        consent to receive communications from Oosri electronically via:
      </Paragraph>
      <List>
        <ListItem>Email</ListItem>
        <ListItem>SMS</ListItem>
        <ListItem>Push notifications</ListItem>
        <ListItem>In-app messages</ListItem>
        <ListItem>Notices on the Platform</ListItem>
      </List>
      <Paragraph>
        You agree that all electronic communications satisfy any legal
        requirement that such communications be in writing, to the extent
        permitted by law.
      </Paragraph>

      <Section>5. ORDERS & PAYMENTS</Section>

      <SubSection>5.1 Placing Orders</SubSection>
      <Paragraph>When you place an order (&quot;Order&quot;):</Paragraph>
      <List>
        <ListItem>
          You make a binding offer to purchase specified products from the
          relevant Seller;
        </ListItem>
        <ListItem>
          The Order becomes binding when the Seller and/or Oosri accepts it or
          starts processing or dispatching the products.
        </ListItem>
      </List>

      <SubSection>5.2 Pricing & Charges</SubSection>
      <Paragraph>Prices displayed may include or exclude:</Paragraph>
      <List>
        <ListItem>VAT or sales tax;</ListItem>
        <ListItem>Import duties or customs;</ListItem>
        <ListItem>Shipping and handling fees;</ListItem>
        <ListItem>Oosri service or transaction fees;</ListItem>
        <ListItem>Currency conversion or cross-border fees.</ListItem>
      </List>
      <Paragraph>
        The total payable amount (including applicable charges) will be shown at
        checkout. You are responsible for all taxes, duties, and fees related to
        your purchase.
      </Paragraph>

      <SubSection>5.3 Payment Processing</SubSection>
      <Paragraph>You authorise Oosri and its payment partners to:</Paragraph>
      <List>
        <ListItem>
          Charge your chosen payment method for the Order amount and associated
          fees;
        </ListItem>
        <ListItem>
          Temporarily hold funds (escrow-style) where necessary;
        </ListItem>
        <ListItem>
          Release funds to Sellers, refund you, or split funds in accordance
          with our Buyer Protection and dispute resolution decisions.
        </ListItem>
      </List>
      <Paragraph>
        Any bank charges, FX charges or fees related to your payment method are
        your responsibility.
      </Paragraph>

      <SubSection>5.4 Order Cancellation by Oosri or Seller</SubSection>
      <Paragraph>
        Oosri or a Seller may cancel all or part of an Order due to:
      </Paragraph>
      <List>
        <ListItem>Suspected fraud or misuse;</ListItem>
        <ListItem>Inaccurate or incomplete information;</ListItem>
        <ListItem>Listing or pricing errors;</ListItem>
        <ListItem>Product unavailability;</ListItem>
        <ListItem>Legal, regulatory, or risk concerns.</ListItem>
      </List>
      <Paragraph>
        If payment has already been taken for a cancelled Order, a refund will
        be processed in line with these Buyer Terms and our policies.
      </Paragraph>

      <Section>6. SHIPPING, DELIVERY & RISK</Section>

      <SubSection>6.1 Delivery Estimates</SubSection>
      <Paragraph>
        Delivery times shown on the Platform are estimates only and are not
        guaranteed. Delays may result from:
      </Paragraph>
      <List>
        <ListItem>Customs or regulatory checks;</ListItem>
        <ListItem>Carrier or logistics issues;</ListItem>
        <ListItem>Seller processing delays;</ListItem>
        <ListItem>Incorrect or incomplete address details;</ListItem>
        <ListItem>
          Force majeure events (e.g. strikes, natural disasters).
        </ListItem>
      </List>

      <SubSection>6.2 Risk of Loss</SubSection>
      <Paragraph>
        Unless otherwise required by law, risk of loss or damage to products
        passes to you when:
      </Paragraph>
      <List>
        <ListItem>
          Products are delivered to the address you provided and recorded as
          delivered; or
        </ListItem>
        <ListItem>
          You collect the products from a designated pick-up point; or
        </ListItem>
        <ListItem>
          The carrier marks the products as delivered in their system.
        </ListItem>
      </List>

      <SubSection>6.3 Undelivered or Missing Orders</SubSection>
      <Paragraph>
        If an Order is marked as delivered but you have not received it, you
        must contact Oosri Support through the Platform within the timeframe
        stated in the Buyer Protection Policy. Oosri may request evidence (e.g.
        photos, confirmation from neighbours or building management) before
        reaching a decision.
      </Paragraph>

      <Section>7. INSPECTION, RETURNS & REFUNDS</Section>

      <SubSection>7.1 Inspection on Receipt</SubSection>
      <Paragraph>
        You should inspect products promptly upon delivery. If you notice
        obvious damage, defects, or errors (e.g. wrong product, size or
        quantity), you must notify Oosri through the Platform within the time
        window specified in the Oosri Buyer Protection / Return Policy.
      </Paragraph>

      <SubSection>7.2 Return Eligibility</SubSection>
      <Paragraph>Return and refund rights depend on:</Paragraph>
      <List>
        <ListItem>
          The nature of the product (e.g. custom-made or personalised items may
          be non-returnable);
        </ListItem>
        <ListItem>The Seller's return policy (where applicable);</ListItem>
        <ListItem>Oosri's Buyer Protection / Return Policy;</ListItem>
        <ListItem>Applicable consumer protection laws.</ListItem>
      </List>
      <Paragraph>
        We will endeavour to clearly indicate non-returnable products or special
        conditions on the listing page or at checkout.
      </Paragraph>

      <SubSection>7.3 Return Process</SubSection>
      <Paragraph>If a return is approved:</Paragraph>
      <List>
        <ListItem>
          Oosri will provide instructions (such as the return address, carrier,
          and timeline);
        </ListItem>
        <ListItem>
          You must follow those instructions, including packaging and shipping
          requirements;
        </ListItem>
        <ListItem>
          You may be responsible for return shipping costs, unless the policies
          or law dictate otherwise.
        </ListItem>
      </List>

      <SubSection>7.4 Refunds</SubSection>
      <Paragraph>Refunds may be:</Paragraph>
      <List>
        <ListItem>Full or partial;</ListItem>
        <ListItem>
          Issued to your original payment method, where feasible; or
        </ListItem>
        <ListItem>
          Issued as store credit or wallet balance, where this option exists and
          you agree.
        </ListItem>
      </List>
      <Paragraph>Oosri may reduce or reject a refund if:</Paragraph>
      <List>
        <ListItem>
          The returned item is missing, different from the original, or severely
          damaged (beyond reasonable inspection);
        </ListItem>
        <ListItem>You fail to return the product where required;</ListItem>
        <ListItem>
          There is evidence of fraud, misuse, or abuse of the return system.
        </ListItem>
      </List>
      <Paragraph>
        We will act in good faith and in line with our stated policies when
        assessing refund eligibility.
      </Paragraph>

      <SubSection>7.5 Oosri's Role in Disputes About Orders</SubSection>
      <Paragraph>
        Where a dispute between you and a Seller is escalated to Oosri:
      </Paragraph>
      <List>
        <ListItem>
          We will review evidence from both sides, including logistics and
          payment data;
        </ListItem>
        <ListItem>
          We may determine whether a full refund, partial refund, or no refund
          is appropriate; or
        </ListItem>
        <ListItem>We may decide to release payment to the Seller.</ListItem>
      </List>
      <Paragraph>
        For purposes of how funds are allocated within the Oosri ecosystem,
        Oosri's decision is final and binding, without prejudice to any
        non-waivable statutory rights you may have under applicable consumer
        protection law.
      </Paragraph>

      <Section>8. BUYER CONDUCT & PROHIBITED ACTIVITIES</Section>
      <Paragraph>You agree that you will not:</Paragraph>
      <List>
        <ListItem>
          Place fake orders or orders with no genuine intent to purchase;
        </ListItem>
        <ListItem>Abuse coupons, referral programs, or promotions;</ListItem>
        <ListItem>
          File fraudulent or dishonest chargebacks or complaints;
        </ListItem>
        <ListItem>Make false claims about non-delivery or defects;</ListItem>
        <ListItem>
          Use offensive, threatening, or harassing language towards Oosri staff;
        </ListItem>
        <ListItem>
          Attempt to move transactions or relationships off the Platform to
          avoid Oosri fees;
        </ListItem>
        <ListItem>
          Purchase or attempt to purchase illegal or prohibited items;
        </ListItem>
        <ListItem>
          Use the Platform to engage in money laundering, terrorist financing,
          or other financial crimes;
        </ListItem>
        <ListItem>
          Interfere with the operation or security of the Platform (e.g.
          hacking, spreading malware).
        </ListItem>
      </List>
      <Paragraph>Oosri may in response:</Paragraph>
      <List>
        <ListItem>Issue warnings;</ListItem>
        <ListItem>Cancel or restrict Orders;</ListItem>
        <ListItem>Withhold or claw back refunds or credits;</ListItem>
        <ListItem>Suspend or terminate your Account;</ListItem>
        <ListItem>
          Report you to financial institutions, law enforcement, or regulators.
        </ListItem>
      </List>

      <Section>9. REVIEWS, RATINGS & OTHER CONTENT FROM BUYERS</Section>

      <SubSection>9.1 Your Content</SubSection>
      <Paragraph>You may submit content to the Platform, such as:</Paragraph>
      <List>
        <ListItem>Product reviews and star ratings;</ListItem>
        <ListItem>Photos or videos of products;</ListItem>
        <ListItem>Questions, comments, suggestions, and feedback.</ListItem>
      </List>

      <SubSection>9.2 Content Rules</SubSection>
      <Paragraph>You must ensure that your content:</Paragraph>
      <List>
        <ListItem>Is honest and based on your own experience;</ListItem>
        <ListItem>
          Is not defamatory, abusive, hateful, obscene, or discriminatory;
        </ListItem>
        <ListItem>
          Does not infringe intellectual property, privacy, or other rights of
          any person;
        </ListItem>
        <ListItem>Does not contain viruses, malicious code, or spam;</ListItem>
        <ListItem>
          Is not used to threaten, extort, or blackmail Sellers or Oosri.
        </ListItem>
      </List>

      <SubSection>9.3 Licence to Oosri</SubSection>
      <Paragraph>
        By submitting content, you grant Oosri a worldwide, royalty-free,
        perpetual, irrevocable, transferable, and sub-licensable licence to:
      </Paragraph>
      <List>
        <ListItem>
          Use, reproduce, adapt, publish, translate, distribute, display, and
          perform such content in any media;
        </ListItem>
        <ListItem>
          Use it for marketing, analytics, product improvement, and any other
          lawful purpose.
        </ListItem>
      </List>
      <Paragraph>
        You represent that you have the right to grant this licence.
      </Paragraph>

      <SubSection>9.4 Content Moderation</SubSection>
      <Paragraph>Oosri may, at its discretion:</Paragraph>
      <List>
        <ListItem>
          Remove or edit content that appears to breach these Terms or the law;
        </ListItem>
        <ListItem>Filter or rearrange reviews;</ListItem>
        <ListItem>
          Restrict your ability to post further content if you repeatedly submit
          inappropriate or misleading content.
        </ListItem>
      </List>

      <Section>10. SANCTIONS & EXPORT CONTROL</Section>

      <SubSection>10.1 Sanctioned Persons and Locations</SubSection>
      <Paragraph>You represent and warrant that:</Paragraph>
      <List>
        <ListItem>
          You are not listed on any sanctions or restricted-party list issued by
          applicable authorities;
        </ListItem>
        <ListItem>
          You are not located in a jurisdiction subject to comprehensive
          sanctions relevant to Oosri's operations;
        </ListItem>
        <ListItem>
          You will not use Oosri to transact with sanctioned persons or for
          purposes that would violate sanctions or export controls.
        </ListItem>
      </List>

      <SubSection>10.2 Export & Import Compliance</SubSection>
      <Paragraph>
        You are responsible for complying with all export, import, customs, and
        trade laws applicable to your purchases. You must obtain any necessary
        licences or approvals for the import or use of products. Oosri may block
        or cancel Orders, Accounts, or payments that appear to breach sanctions
        or export control laws and may share information with authorities where
        required.
      </Paragraph>

      <Section>11. THIRD-PARTY SERVICES</Section>
      <Paragraph>
        The Platform may integrate with or rely on third-party services (such as
        payment providers, logistics companies, verification services, and
        analytics tools). These third parties are independent of Oosri and have
        their own terms and policies. Oosri is not responsible for:
      </Paragraph>
      <List>
        <ListItem>
          The content, availability, or performance of third-party services;
        </ListItem>
        <ListItem>
          Any loss or damage caused by third-party acts or omissions.
        </ListItem>
      </List>

      <Section>12. PRIVACY & DATA PROTECTION</Section>
      <Paragraph>
        Your use of Oosri is subject to our Privacy Policy, which explains how
        we collect, use, store, and share your personal data. You acknowledge
        that:
      </Paragraph>
      <List>
        <ListItem>
          Certain personal data (e.g. your name, phone, address) must be shared
          with logistics partners and, where relevant, Sellers, to fulfil your
          Orders;
        </ListItem>
        <ListItem>
          Oosri may process your data for fraud prevention, security, analytics,
          and compliance with legal obligations.
        </ListItem>
      </List>

      <Section>13. DISCLAIMER OF WARRANTIES</Section>
      <Paragraph>To the fullest extent permitted by law:</Paragraph>
      <List>
        <ListItem>
          The Platform and all content, products and services accessible through
          it are provided on an &quot;as is&quot; and &quot;as available&quot;
          basis;
        </ListItem>
        <ListItem>
          Oosri makes no express or implied warranties, including but not
          limited to warranties of merchantability, fitness for a particular
          purpose, non-infringement, accuracy, or availability;
        </ListItem>
        <ListItem>
          Oosri does not warrant that product descriptions or other content are
          free from errors, or that the Platform will be uninterrupted or
          secure.
        </ListItem>
      </List>

      <Section>14. LIMITATION OF LIABILITY</Section>
      <Paragraph>To the extent permitted by applicable law:</Paragraph>

      <SubSection>14.1 Excluded Damages</SubSection>
      <Paragraph>Oosri shall not be liable for any:</Paragraph>
      <List>
        <ListItem>
          Indirect, incidental, special, punitive, or consequential damages;
        </ListItem>
        <ListItem>
          Loss of profits, revenue, business, goodwill, or data;
        </ListItem>
        <ListItem>Business interruption or opportunity loss;</ListItem>
        <ListItem>
          Any loss arising from Seller acts, omissions, or product defects.
        </ListItem>
      </List>

      <SubSection>14.2 Liability Cap</SubSection>
      <Paragraph>
        In any event, Oosri's total aggregate liability to you arising from or
        relating to your use of the Platform or any purchase shall not exceed
        the greater of:
      </Paragraph>
      <List>
        <ListItem>
          The total service or transactional fees you paid to Oosri in the six
          (6) months preceding the event giving rise to the claim; or
        </ListItem>
        <ListItem>A fixed amount to be determined by Oosri.</ListItem>
      </List>

      <SubSection>14.3 Non-Excludable Liability</SubSection>
      <Paragraph>
        Nothing in these Buyer Terms excludes or limits any liability that
        cannot be excluded or limited under applicable law (such as liability
        for fraud or gross negligence where such exclusion is not permitted).
      </Paragraph>

      <Section>15. INDEMNITY</Section>
      <Paragraph>
        You agree to indemnify, defend, and hold harmless Oosri and its
        affiliates, officers, employees, and agents from and against any claim,
        loss, liability, damage, cost, or expense (including reasonable legal
        fees) arising out of or related to:
      </Paragraph>
      <List>
        <ListItem>
          Your breach of these Buyer Terms or the Oosri Terms;
        </ListItem>
        <ListItem>Your violation of any law or third-party rights;</ListItem>
        <ListItem>Your misuse of the Platform;</ListItem>
        <ListItem>
          Fraudulent or abusive use of chargebacks, returns, or promotions.
        </ListItem>
      </List>

      <Section>16. DISPUTE RESOLUTION</Section>

      <SubSection>16.1 Disputes Regarding Orders or Products</SubSection>
      <Paragraph>
        Because Buyers cannot message Sellers directly on the Platform at this
        time:
      </Paragraph>
      <List>
        <ListItem>
          You must raise all issues concerning Orders (including non-delivery,
          defects, or misdescription) with Oosri Support via the Platform or by
          using the designated support channels;
        </ListItem>
        <ListItem>
          Oosri will liaise with the Seller, review relevant data, and apply the
          Buyer Protection / dispute policies.
        </ListItem>
      </List>

      <SubSection>16.2 Disputes with Oosri</SubSection>
      <Paragraph>If you have a dispute with Oosri:</Paragraph>
      <List>
        <ListItem>
          You agree to first contact our Support team and allow a reasonable
          opportunity to resolve the issue informally;
        </ListItem>
        <ListItem>
          If it remains unresolved, you agree to participate in good-faith
          negotiation or mediation in Lagos, Nigeria, where Oosri proposes it;
        </ListItem>
        <ListItem>
          If still unresolved, you may bring a claim before the competent courts
          or, where mutually agreed, arbitration, in accordance with Section 19
          of the general Oosri Platform Terms.
        </ListItem>
      </List>

      <Section>17. TERMINATION & ACCOUNT CLOSURE</Section>

      <SubSection>17.1 Your Right to Close Your Account</SubSection>
      <Paragraph>
        You may close your Account at any time via the Platform or by contacting
        Oosri Support, provided:
      </Paragraph>
      <List>
        <ListItem>You have no pending Orders or disputes; and</ListItem>
        <ListItem>
          All outstanding amounts owed to Oosri or Sellers are fully paid.
        </ListItem>
      </List>

      <SubSection>17.2 Oosri's Right to Suspend or Terminate</SubSection>
      <Paragraph>
        Oosri may suspend, restrict, or terminate your Account or access to the
        Platform at any time, with or without notice, if:
      </Paragraph>
      <List>
        <ListItem>
          You breach these Buyer Terms, the Oosri Terms, or any other policy;
        </ListItem>
        <ListItem>Oosri suspects fraud, abuse, or illegal activity;</ListItem>
        <ListItem>
          Oosri is required to do so by law, regulator, or court order;
        </ListItem>
        <ListItem>
          Your behaviour poses a risk to Oosri, other users, or third parties.
        </ListItem>
      </List>
      <Paragraph>
        Termination does not affect obligations incurred prior to termination
        (e.g. payment, indemnity, or limitation of liability).
      </Paragraph>

      <Section>18. CHANGES TO THESE BUYER TERMS</Section>
      <Paragraph>
        Oosri may update these Buyer Terms from time to time. When we do:
      </Paragraph>
      <List>
        <ListItem>
          We will post the updated Buyer Terms on the Platform with a new
          &quot;Last Updated&quot; date; and
        </ListItem>
        <ListItem>
          Where appropriate or required, we may notify you by email or in-app
          message.
        </ListItem>
      </List>
      <Paragraph>
        Your continued use of the Platform after changes take effect constitutes
        your acceptance of the updated Buyer Terms. If you do not agree, you
        must stop using the Platform and may close your Account.
      </Paragraph>

      <Section>19. GOVERNING LAW & JURISDICTION</Section>
      <Paragraph>
        These Buyer Terms are governed by the laws of the Federal Republic of
        Nigeria, without regard to conflict of laws principles. Subject to any
        mandatory mediation or arbitration rules, you and Oosri agree that the
        courts of Lagos State, Nigeria shall have jurisdiction over any dispute
        arising from or relating to these Buyer Terms or your use of the
        Platform.
      </Paragraph>
    </TermsOfUseWrapper>
  );
};
