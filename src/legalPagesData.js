// Template policies — have them reviewed by a qualified lawyer before relying on them.
export const LEGAL_UPDATED = '2026-09-24';
const COMPANY = 'Zexton IT Solutions ("Zexton", "we", "us")';

export const legalPages = {
  'legal:terms': {
    path: '/legal/terms-and-conditions',
    breadcrumbLabel: 'Terms & Conditions',
    title: 'Terms & Conditions | Zexton',
    description: 'Terms and conditions governing the purchase and use of Zexton domains, hosting, servers, email, security, website and IT services.',
    intro: `These Terms & Conditions govern your use of zexton.com and every product or service ordered from ${COMPANY}. By placing an order or using our services you agree to these terms and to the policies linked from them.`,
    sections: [
      ['Accounts', ['You must provide accurate, current contact and billing information and keep it updated.', 'You are responsible for all activity under your account and for keeping passwords and credentials confidential.', 'You must be at least 18 years old or have the consent of a legal guardian to purchase services.']],
      ['Orders and activation', ['Orders are activated after successful payment and any required verification (identity, fraud or registry checks).', 'We may refuse or cancel an order that fails verification, appears fraudulent, or would breach law or these terms. Any payment for a refused order is refunded.']],
      ['Pricing, taxes and billing', ['Prices are shown in US Dollars ($ USD) and exclude applicable sales taxes unless stated. Applicable taxes are added at checkout.', 'Introductory prices apply to the first billing term only. Renewals are charged at the renewal price shown at the time of renewal.', 'Services are billed in advance for the selected term (monthly, yearly or multi-year).']],
      ['Renewals and expiry', ['We send renewal reminders to your registered email before expiry. It is your responsibility to renew on time.', 'Services with auto-renew enabled are renewed automatically using your saved payment method.', 'Unpaid services may be suspended after the due date and terminated, with data deleted, after the grace period described in the product documentation.']],
      ['Acceptable use', ['Use of our services is subject to the Acceptable Use Policy. Violations may result in suspension or termination without refund.']],
      ['Customer content and backups', ['You retain ownership of all content you host with us and grant us only the rights needed to operate the service.', 'Although we perform backups on eligible plans, you are responsible for maintaining your own independent backups of important data.']],
      ['Third-party services', ['Domains are subject to the rules of the relevant registry and ICANN policies. Software licences (such as cPanel, Plesk, Windows Server or Microsoft 365) are subject to their vendors’ terms.']],
      ['Limitation of liability', ['To the maximum extent permitted by law, Zexton is not liable for indirect, incidental or consequential losses, including lost profits or data.', 'Our total liability for any claim is limited to the amount you paid for the affected service in the three months before the claim arose.']],
      ['Termination', ['You may cancel a service at any time from your account or by contacting support. Refunds are governed by the Refund Policy.', 'We may suspend or terminate services for non-payment, abuse, legal requirements, or material breach of these terms.']],
      ['Governing law', ['These terms are governed by the laws of the United States.']],
      ['Changes', ['We may update these terms. Material changes are notified by email or on this page at least 15 days before they take effect.']],
    ],
  },
  'legal:privacy': {
    path: '/legal/privacy-policy',
    breadcrumbLabel: 'Privacy Policy',
    title: 'Privacy Policy | Zexton',
    description: 'How Zexton collects, uses, stores, shares and protects personal information, and your privacy rights.',
    intro: `This Privacy Policy explains how ${COMPANY} handles personal data when you visit zexton.com, contact us, or use our services. We process personal data in line with applicable privacy and data protection laws.`,
    sections: [
      ['Information we collect', ['Contact and account details: name, email, phone, company, billing address.', 'Order and payment information. Card details are processed securely by our payment gateway; we do not store full card numbers.', 'Technical data: IP address, browser, device and usage logs needed to secure and operate our services.', 'Messages and files you send to our support or sales teams.']],
      ['How we use information', ['To provide, bill for and support the services you order.', 'To register domains, which requires sharing registrant data with registries as described below.', 'To prevent fraud and abuse, secure our systems and meet legal obligations.', 'To send service notices and, where you have agreed, product updates. You can unsubscribe from marketing at any time.']],
      ['Sharing', ['Domain registries and registrars, as required to register and maintain domains.', 'Payment processors, software vendors and infrastructure providers who act on our instructions.', 'Government or law-enforcement authorities where required by law.', 'We do not sell personal data.']],
      ['Retention', ['We keep personal data for as long as your account is active and afterwards only as long as needed for legal, tax, and dispute-resolution purposes.']],
      ['Security', ['We use encryption in transit, access controls, monitoring and regular backups. No system is completely secure, and we will notify you of any personal data breach as required by law.']],
      ['Your rights', ['You may request access to, correction of, or erasure of your personal data, and withdraw consent where processing relies on consent.', 'Contact our privacy team at info@zexton.com. We respond within 30 days.']],
      ['Cookies', ['We use essential cookies to operate the website and may use analytics cookies to understand usage. You can control cookies through your browser settings.']],
    ],
  },
  'legal:refund': {
    path: '/legal/refund-policy',
    breadcrumbLabel: 'Refund Policy',
    title: 'Refund & Cancellation Policy | Zexton',
    description: 'Zexton refund and cancellation policy for hosting, domains, servers, SSL, email, website development and marketing services.',
    intro: 'We want you to be satisfied with Zexton. This policy explains which services can be refunded and how to request a cancellation.',
    sections: [
      ['30-day money-back guarantee', ['Shared, WordPress, Windows, cloud and reseller hosting plans can be cancelled within 30 days of first purchase for a full refund of the hosting fee.', 'The guarantee applies to first-time purchases only, not to renewals, upgrades or add-ons.']],
      ['Non-refundable items', ['Domain registrations, renewals and transfers, once processed with the registry.', 'SSL certificates once issued, and third-party software licences (cPanel, Plesk, Windows Server, Microsoft 365, Google Workspace).', 'VPS and dedicated servers after 7 days of activation, and setup or migration fees once work has started.', 'Free domains included with hosting: if a hosting plan with a free domain is refunded, the standard domain price is deducted from the refund.']],
      ['Website development and marketing', ['Advance payments for website, software or marketing work are refundable only for milestones that have not started.', 'Monthly SEO and marketing services can be cancelled with 30 days’ notice; fees already paid for the current month are not refunded. Advertising spend paid to platforms is non-refundable.']],
      ['How to request a refund', ['Email info@zexton.com from your registered email with your order number and reason for cancellation.', 'Approved refunds are issued to the original payment method within 7–10 business days.']],
    ],
  },
  'legal:aup': {
    path: '/legal/acceptable-use-policy',
    breadcrumbLabel: 'Acceptable Use Policy',
    title: 'Acceptable Use Policy | Zexton',
    description: 'Rules for acceptable use of Zexton hosting, servers, email and network resources, including prohibited content and activities.',
    intro: 'This Acceptable Use Policy protects our customers, our network and the wider internet. It applies to every service provided by Zexton.',
    sections: [
      ['Prohibited content', ['Content that is illegal under applicable law or the law where it is accessed.', 'Child sexual abuse material — reported immediately to authorities.', 'Material that infringes copyright, trademarks or other intellectual property.', 'Phishing pages, malware, or content designed to deceive or defraud.']],
      ['Prohibited activities', ['Sending unsolicited bulk email (spam) or using purchased mailing lists.', 'Network attacks, port scanning, brute-force attempts, or hosting botnet controllers.', 'Cryptocurrency mining on shared hosting.', 'Running open proxies or open mail relays.']],
      ['Resource usage on shared plans', ['“Unlimited” and “unmetered” features are subject to fair use. Accounts that degrade server performance for other customers may be asked to optimise or upgrade.', 'Shared hosting is for websites and email, not for file storage, backups of other systems, or media streaming.']],
      ['Enforcement', ['We may remove content, suspend or terminate services that violate this policy, with or without notice depending on severity.', 'Report abuse to info@zexton.com with the URL, headers or evidence of the issue.']],
    ],
  },
  'legal:sla': {
    path: '/legal/service-level-agreement',
    breadcrumbLabel: 'Service Level Agreement',
    title: 'Service Level Agreement (SLA) – 99.9% Uptime | Zexton',
    description: 'Zexton service level agreement: 99.9% network and server uptime commitment, support response targets and service credits.',
    intro: 'This Service Level Agreement describes Zexton’s uptime commitment for hosting and server products and the credits available if we miss it.',
    sections: [
      ['Uptime commitment', ['We target 99.9% monthly availability of the network and hosting servers, excluding scheduled maintenance.', 'Scheduled maintenance is announced at least 48 hours in advance where possible and performed during low-traffic hours (EST/PST).']],
      ['Exclusions', ['Issues caused by customer code, configuration, content or exceeded resource limits.', 'DDoS attacks, third-party network failures, force majeure, or suspension under our policies.', 'Self-managed VPS and dedicated servers where the operating system or software is managed by the customer.']],
      ['Service credits', ['99.0% – 99.9% uptime: 5% of the monthly fee for the affected service.', '95.0% – 99.0% uptime: 10% of the monthly fee.', 'Below 95.0% uptime: 25% of the monthly fee.', 'Credits are applied to future invoices, must be requested within 7 days of the month end, and cannot exceed the monthly fee.']],
      ['Support response targets', ['Critical (service down): initial response within 1 hour.', 'High (major feature impaired): within 4 hours.', 'Normal (questions, minor issues): within 24 hours.']],
    ],
  },
  'legal:domain-agreement': {
    path: '/legal/domain-registration-agreement',
    breadcrumbLabel: 'Domain Registration Agreement',
    title: 'Domain Registration Agreement | Zexton',
    description: 'Terms for registering, renewing and transferring domain names through Zexton, including registrant obligations and dispute policies.',
    intro: 'This agreement applies to every domain name registered, renewed or transferred through Zexton, in addition to our Terms & Conditions.',
    sections: [
      ['Registrant obligations', ['Provide accurate and complete registrant contact information and update it within 7 days of any change.', 'Respond to verification emails. Domains with unverified contact details may be suspended by the registry.', 'Ensure your domain name does not infringe the rights of any third party.']],
      ['Registry and ICANN policies', ['Generic domains (.com, .net, .org and new gTLDs) are subject to ICANN policies, including the Registrants’ Benefits and Responsibilities and the Uniform Domain-Name Dispute-Resolution Policy (UDRP).', '.in and .co.in domains are subject to NIXI policies and the .IN Domain Name Dispute Resolution Policy (INDRP).']],
      ['Renewal, expiry and restoration', ['Domains expire at the end of the registration term unless renewed.', 'After expiry, most domains enter a renewal grace period followed by a redemption period in which a restoration fee applies. After redemption the domain may be released to the public.']],
      ['Transfers', ['Domains cannot be transferred to another registrar within 60 days of registration or a previous transfer.', 'On request we will provide the authorisation (EPP) code to the verified registrant.']],
    ],
  },
};

export const legalRouteMetadata = Object.fromEntries(
  Object.entries(legalPages).map(([route, page]) => [route, {
    ...page,
    eyebrow: 'LEGAL',
    heading: page.breadcrumbLabel,
    summary: page.intro,
    schemaType: 'WebPage',
    searchIntent: `Zexton ${page.breadcrumbLabel.toLowerCase()}`,
    topics: [page.breadcrumbLabel],
    relatedRoutes: Object.keys(legalPages).filter((key) => key !== route).slice(0, 4),
    crawlSections: page.sections.map(([title, items]) => ({ title, text: items.join(' ') })),
  }]),
);
