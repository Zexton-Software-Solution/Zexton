import { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, Mail, MapPin, Send } from 'lucide-react';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import './ContactPage.css';

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: 'Web Hosting & Cloud Servers',
  budget: 'Not decided yet',
  timeline: 'Flexible',
  message: '',
  website: '',
  consent: false,
};

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3807.2884602058784!2d78.484668!3d17.397939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDIzJzUyLjYiTiA3OMKwMjknMDQuOCJF!5e0!3m2!1sen!2sin!4v1785604456946!5m2!1sen!2sin';

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const planParam = params.get('plan');
    const domainParam = params.get('domain');

    if (serviceParam || planParam || domainParam) {
      setForm((prev) => {
        let selectedService = prev.service;
        let initialMsg = prev.message;

        if (serviceParam === 'business-email' || serviceParam === 'email-security') {
          selectedService = 'Business Email, SSL & Security';
        } else if (serviceParam === 'websites') {
          selectedService = 'Business Website or E-Commerce Store';
        } else if (serviceParam === 'ai') {
          selectedService = 'AI Automation & Intelligent Agents';
        } else if (serviceParam === 'marketing') {
          selectedService = 'SEO & Digital Marketing';
        } else if (serviceParam === 'domains' || serviceParam === 'domain-hosting') {
          selectedService = 'Domain Registration & Transfer';
        } else if (serviceParam) {
          selectedService = 'Web Hosting & Cloud Servers';
        }

        if (domainParam) initialMsg = `I would like to check and register the domain: ${domainParam}.`;
        else if (planParam) initialMsg = `I want to get started with: ${planParam}.`;
        else if (serviceParam === 'business-email') initialMsg = 'I am interested in setting up professional business email accounts for my company.';

        return {
          ...prev,
          service: selectedService,
          message: initialMsg || prev.message,
        };
      });
    }
  }, []);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your enquiry…' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'We could not send your enquiry. Please try again.');
      setForm(initialForm);
      setStatus({ type: 'success', message: result.message || 'Your enquiry has been sent successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please email info@zexton.com.' });
    }
  };

  return (
    <main className="contact-page">
      <Seo {...routeMetadata.contact} type={routeMetadata.contact.schemaType} items={routeMetadata.contact.schemaItems} />

      <header className="contact-hero">
        <div className="contact-hero__intro">
          <span className="eyebrow">CONTACT ZEXTON</span>
          <h1>Let&apos;s build, host, and scale your digital presence.</h1>
          <p>
            Tell us about your requirements—whether you need high-speed web hosting, domain registration, professional business emails, website design, or custom software engineering.
          </p>
        </div>
        <div className="contact-hero__details" aria-label="Contact details">
          <a href="mailto:info@zexton.com"><Mail size={18} /><span><small>EMAIL</small>info@zexton.com</span></a>
          <div><MapPin size={18} /><span><small>LOCATION</small>Hyderabad, India · Serving Worldwide</span></div>
          <div><Clock3 size={18} /><span><small>RESPONSE TIME</small>Usually within 1–2 hours</span></div>
        </div>
      </header>

      <section className="contact-workspace" aria-labelledby="contact-form-title">
        <div className="contact-workspace__copy">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2 id="contact-form-title">Start Your Project or Hosting Plan.</h2>
          <p>Share your goals with our team. We provide transparent upfront quotes with zero hidden fees and no long sales cycles.</p>
          <ul>
            <li><CheckCircle2 size={17} /> Direct response from real technical engineers</li>
            <li><CheckCircle2 size={17} /> Free website migration and 1-click hosting setup</li>
            <li><CheckCircle2 size={17} /> Transparent milestone pricing and 100% ownership</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate={false}>
          <div className="contact-form__grid">
            <label>Full name *<input name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength={80} required placeholder="Your name" /></label>
            <label>Work email *<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={160} required placeholder="you@company.com" /></label>
            <label>Company<input name="company" value={form.company} onChange={updateField} autoComplete="organization" maxLength={120} placeholder="Company or business name" /></label>
            <label>Phone / WhatsApp<input name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" maxLength={30} placeholder="+91 9876543210" /></label>
            <label>Service required *
              <select name="service" value={form.service} onChange={updateField} required>
                <option>Web Hosting &amp; Cloud Servers</option>
                <option>Business Website or E-Commerce Store</option>
                <option>Domain Registration &amp; Transfer</option>
                <option>Business Email, SSL &amp; Security</option>
                <option>SEO &amp; Digital Marketing</option>
                <option>Custom Software Development</option>
                <option>SaaS Product Engineering</option>
                <option>React Native Mobile App</option>
                <option>AI Automation &amp; Intelligent Agents</option>
                <option>Cloud &amp; DevOps Migration</option>
              </select>
            </label>
            <label>Indicative budget
              <select name="budget" value={form.budget} onChange={updateField}>
                <option>Not decided yet</option>
                <option>Under ₹10,000 (Hosting / Email)</option>
                <option>₹10,000 – ₹49,000 (Starter Website)</option>
                <option>₹49,000 – ₹1,50,000 (Growth Web / Store)</option>
                <option>₹1,50,000 – ₹5,00,000 (Custom MVP / Software)</option>
                <option>₹5,00,000+ (Enterprise / SaaS)</option>
              </select>
            </label>
            <label>Preferred timeline
              <select name="timeline" value={form.timeline} onChange={updateField}>
                <option>Flexible</option>
                <option>Immediate / Urgent (1–3 days)</option>
                <option>Within 2 weeks</option>
                <option>1–2 months</option>
                <option>3+ months</option>
              </select>
            </label>
            <label className="contact-form__message">Details &amp; Requirements *<textarea name="message" value={form.message} onChange={updateField} minLength={10} maxLength={4000} rows={6} required placeholder="Describe your website, hosting needs, or software goals..." /></label>
          </div>

          <label className="contact-form__honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></label>
          <label className="contact-form__consent"><input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required /><span>I agree that Zexton may use these details to respond to my enquiry.</span></label>

          <div className="contact-form__actions">
            <button className="btn-primary" type="submit" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Sending…' : 'Send Project Enquiry'} <Send size={17} />
            </button>
            <p className={`contact-form__status is-${status.type}`} aria-live="polite">{status.message}</p>
          </div>
        </form>
      </section>

      <section className="contact-location" aria-labelledby="location-title">
        <div><span className="eyebrow">OUR LOCATION</span><h2 id="location-title">Based in Hyderabad.<br />Serving Clients Worldwide.</h2><p>We work seamlessly with clients across India, North America, Europe, and the Middle East.</p></div>
        <div className="contact-location__map">
          <iframe src={mapUrl} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Zexton location in Hyderabad, India" />
        </div>
      </section>
    </main>
  );
}
