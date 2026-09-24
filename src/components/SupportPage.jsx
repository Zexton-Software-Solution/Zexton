import { useState } from 'react';
import { Cpu, Globe, Lock, Mail, MessageSquare, Receipt, Search, Server } from 'lucide-react';
import { routeMetadata } from '../siteMetadata';
import Seo from './Seo';
import './SupportPage.css';

const knowledgeBase = [
  { id: 'domains', label: 'Domains', icon: Globe, articles: [
    ['How do I point my domain to my hosting?', 'Set your domain nameservers to the ones in your hosting welcome email (e.g. ns1/ns2), or add an A record pointing @ and www to your hosting IP. Changes usually apply within a few hours.'],
    ['How do I transfer a domain to Zexton?', 'Unlock the domain at your current registrar, request the EPP/auth code, then start the transfer with Zexton. Approve the confirmation email; most transfers finish in 5–7 days.'],
    ['What is DNS propagation?', 'When you change DNS, resolvers around the world keep the old answer until its TTL expires. Updates normally appear within 1–4 hours and at most 48 hours.'],
    ['How do I set up domain forwarding?', 'In DNS Management choose Forwarding, enter the destination URL and pick a 301 (permanent) or 302 (temporary) redirect.'],
  ] },
  { id: 'hosting', label: 'Hosting', icon: Server, articles: [
    ['How do I install WordPress?', 'Log in to cPanel, open the WordPress / Softaculous installer, choose your domain, set an admin username and strong password, and click Install. It takes about a minute.'],
    ['Linux or Windows hosting — which do I need?', 'Use Linux for PHP, WordPress, Laravel and most CMS platforms. Use Windows only for ASP.NET, .NET or MSSQL applications.'],
    ['How do I upload my website files?', 'Use cPanel File Manager for small uploads or an FTP/SFTP client such as FileZilla with the credentials in your welcome email. Place files in the public_html folder.'],
    ['How do I restore a backup?', 'Open cPanel → Backups (or JetBackup), choose a restore point and select files, databases or the full account.'],
  ] },
  { id: 'email', label: 'Email', icon: Mail, articles: [
    ['What are the IMAP/SMTP settings?', 'Incoming: mail.yourdomain.com, IMAP port 993 (SSL). Outgoing: mail.yourdomain.com, SMTP port 465 (SSL) or 587 (STARTTLS). Username is your full email address.'],
    ['How do I add my email to Outlook or Gmail app?', 'Add an account, choose IMAP, and enter the incoming and outgoing server settings above with your full email address and password.'],
    ['Why are my emails going to spam?', 'Usually missing SPF, DKIM or DMARC records. Ask support to verify them — we configure these free on Zexton email.'],
  ] },
  { id: 'servers', label: 'VPS & Servers', icon: Cpu, articles: [
    ['How do I connect to my VPS?', 'On Linux/macOS run ssh root@your-server-ip. On Windows use PowerShell ssh or PuTTY. For Windows VPS use Remote Desktop (RDP) with the Administrator password.'],
    ['How do I secure a new Linux server?', 'Update packages, create a sudo user, use SSH keys and disable password login, enable a firewall (ufw/firewalld) allowing only needed ports, and install fail2ban.'],
    ['Can I reinstall the operating system?', 'Yes, from the VPS panel choose Reinstall OS. This erases all data, so take a snapshot or backup first.'],
  ] },
  { id: 'security', label: 'SSL & Security', icon: Lock, articles: [
    ['Why does my site say “Not Secure”?', 'The site is loading over HTTP or has mixed content. Make sure SSL is active, force HTTPS redirect, and update any http:// image or script links.'],
    ['My website was hacked — what should I do?', 'Change all passwords, contact support immediately, and do not delete files yet. Our team can scan, clean, patch and request blacklist removal.'],
  ] },
  { id: 'billing', label: 'Billing', icon: Receipt, articles: [
    ['Which payment methods do you accept?', 'UPI, credit and debit cards, net banking and bank transfer. International customers can pay by card.'],
    ['Do you provide GST invoices?', 'Yes. Add your GSTIN to your account details and it will appear on every invoice.'],
    ['How does renewal work?', 'You receive reminders before expiry. Services with auto-renew enabled renew automatically; otherwise renew from the invoice link before the due date.'],
  ] },
];

export default function SupportPage() {
  const metadata = routeMetadata.support;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('all');
  const term = query.trim().toLowerCase();

  const sections = knowledgeBase
    .filter((section) => active === 'all' || section.id === active)
    .map((section) => ({ ...section, articles: section.articles.filter(([q, a]) => !term || `${q} ${a}`.toLowerCase().includes(term)) }))
    .filter((section) => section.articles.length);

  return (
    <main className="support-page">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Support', path: '/support' }]} />
      <header className="sp-hero">
        <div className="wrap">
          <span className="kicker">Help Center</span>
          <h1>{metadata.heading}</h1>
          <p>{metadata.summary}</p>
          <label className="sp-search">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search help articles, e.g. SMTP, WordPress, transfer" aria-label="Search help articles" />
          </label>
        </div>
      </header>

      <div className="wrap sp-body">
        <nav className="sp-cats" aria-label="Help topics">
          <button type="button" className={active === 'all' ? 'is-active' : ''} onClick={() => setActive('all')}>All topics</button>
          {knowledgeBase.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={active === id ? 'is-active' : ''} onClick={() => setActive(id)}><Icon size={16} aria-hidden="true" /> {label}</button>
          ))}
        </nav>

        <div>
          {sections.length ? sections.map(({ id, label, articles }) => (
            <section key={id} className="sp-section">
              <h2>{label}</h2>
              <div className="faq-list">{articles.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
            </section>
          )) : <p className="sp-empty">No articles match “{query}”. Our team can help — raise a ticket below.</p>}

          <section className="sp-contact">
            <div>
              <h2>Still need help?</h2>
              <p>Raise a ticket and a Zexton engineer will respond. Include your domain name and a screenshot of any error.</p>
            </div>
            <div className="sp-contact__actions">
              <a className="btn btn--primary" href="/contact"><MessageSquare size={16} aria-hidden="true" /> Raise a ticket</a>
              <a className="btn btn--secondary" href="mailto:info@zexton.com"><Mail size={16} aria-hidden="true" /> Email support</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
