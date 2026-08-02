import { useState } from 'react';
import { CheckCircle2, Clock3, Mail, MapPin, Send } from 'lucide-react';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import './ContactPage.css';

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: 'Custom software development',
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
          <h1>Let&apos;s plan software that solves the right problem.</h1>
          <p>Tell us about the users, workflow, business goal, and delivery constraints. We can help with websites, custom software, SaaS products, React Native apps, .NET and Node.js systems, cloud platforms, and practical AI automation.</p>
        </div>
        <div className="contact-hero__details" aria-label="Contact details">
          <a href="mailto:info@zexton.com"><Mail size={18} /><span><small>EMAIL</small>info@zexton.com</span></a>
          <div><MapPin size={18} /><span><small>LOCATION</small>Hyderabad, India · Remote worldwide</span></div>
          <div><Clock3 size={18} /><span><small>RESPONSE</small>Usually within one business day</span></div>
        </div>
      </header>

      <section className="contact-workspace" aria-labelledby="contact-form-title">
        <div className="contact-workspace__copy">
          <span className="eyebrow">PROJECT ENQUIRY</span>
          <h2 id="contact-form-title">Share the useful details.</h2>
          <p>A clear brief helps us recommend the smallest sensible first step. You do not need a finished specification.</p>
          <ul>
            <li><CheckCircle2 size={17} /> Requirements reviewed by the delivery team</li>
            <li><CheckCircle2 size={17} /> No obligation and no automated sales sequence</li>
            <li><CheckCircle2 size={17} /> Your details are used only to answer this enquiry</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate={false}>
          <div className="contact-form__grid">
            <label>Full name *<input name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength={80} required placeholder="Your name" /></label>
            <label>Work email *<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={160} required placeholder="you@company.com" /></label>
            <label>Company<input name="company" value={form.company} onChange={updateField} autoComplete="organization" maxLength={120} placeholder="Company or organisation" /></label>
            <label>Phone (optional)<input name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" maxLength={30} placeholder="Country code + number" /></label>
            <label>What do you need? *
              <select name="service" value={form.service} onChange={updateField} required>
                <option>Custom software development</option>
                <option>Business website or e-commerce</option>
                <option>SaaS product development</option>
                <option>React Native mobile app</option>
                <option>.NET or backend modernization</option>
                <option>Cloud and DevOps engineering</option>
                <option>AI automation or agentic AI</option>
                <option>Product discovery and technical audit</option>
              </select>
            </label>
            <label>Indicative budget
              <select name="budget" value={form.budget} onChange={updateField}>
                <option>Not decided yet</option>
                <option>₹25,000 – ₹75,000</option>
                <option>₹75,000 – ₹2,50,000</option>
                <option>₹2,50,000 – ₹10,00,000</option>
                <option>₹10,00,000+</option>
              </select>
            </label>
            <label>Preferred timeline
              <select name="timeline" value={form.timeline} onChange={updateField}>
                <option>Flexible</option>
                <option>Within 1 month</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6+ months</option>
              </select>
            </label>
            <label className="contact-form__message">Project details *<textarea name="message" value={form.message} onChange={updateField} minLength={20} maxLength={4000} rows={7} required placeholder="What should the product do, who will use it, and what outcome matters?" /></label>
          </div>

          <label className="contact-form__honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></label>
          <label className="contact-form__consent"><input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required /><span>I agree that Zexton may use these details to respond to my enquiry.</span></label>

          <div className="contact-form__actions">
            <button className="btn-primary" type="submit" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Sending…' : 'Send project enquiry'} <Send size={17} />
            </button>
            <p className={`contact-form__status is-${status.type}`} aria-live="polite">{status.message}</p>
          </div>
        </form>
      </section>

      <section className="contact-location" aria-labelledby="location-title">
        <div><span className="eyebrow">WHERE WE WORK</span><h2 id="location-title">Based in Hyderabad.<br />Built for anywhere.</h2><p>We collaborate remotely with businesses across India and international markets. Meetings are scheduled around the project team and time zone.</p></div>
        <div className="contact-location__map">
          <iframe src={mapUrl} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Zexton location in Hyderabad, India" />
        </div>
      </section>
    </main>
  );
}
