import SiteIcon from '../../components/SiteIcon';
import { useRef, useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import Reveal from '../../components/Reveal';
import '../Home/HomePage.css';
import './ContactPage.css';

export function ContactPage() {
  const [number, setNumber] = useState();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const busy = useRef(false);
  const phoneRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    if (!number || !isPossiblePhoneNumber(number)) {
      setStatus({ type: 'error', message: 'Please enter a complete mobile number for your selected country.' });
      phoneRef.current?.focus();
      return;
    }
    const fields = new FormData(form);
    const payload = Object.fromEntries(['firstname', 'lastname', 'email', 'message', 'website'].map(key => [key, String(fields.get(key) || '').trim()]));
    if (['firstname', 'lastname', 'email', 'message'].some(key => !payload[key])) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending.' });
      return;
    }
    busy.current = true;
    setSending(true);
    setStatus({ type: '', message: 'Sending your little hello…' });
    try {
      // Pages Functions use /api/contact, independently of React Router's /LTL basename.
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, number }),
        signal: AbortSignal.timeout(25000),
      });
      let result;
      try { result = await response.json(); } catch {
        throw new Error('The contact service is unavailable. Please try WhatsApp or email instead.');
      }
      if (!response.ok || result.success !== true) throw new Error(result.error || 'Your message could not be sent. Please try again.');
      form.reset();
      setNumber(undefined);
      setStatus({ type: 'success', message: 'Your message is on its way! Thank you for saying hello.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.name === 'TimeoutError' ? 'We could not confirm that your message sent. Please contact us by WhatsApp or email.' : error.message || 'Something went wrong. Please try again.' });
    } finally {
      busy.current = false;
      setSending(false);
    }
  }

  return <main className="ltl-contact" id="main-content">
    <section className="ltl-wrap ltl-contact-layout">
      <Reveal className="ltl-contact-intro">
        <span className="ltl-eyebrow">A little hello. A lovely beginning.</span>
        <h1>Let’s talk<br /><span>learning.</span></h1>
        <p>Have a question, need a little guidance, or want to find the right support for your child? We’d love to hear from you.</p>
        <div className="ltl-contact-note"><span className="ltl-hand">Big questions. Little questions.<br />They’re all welcome here.</span><span aria-hidden="true"><SiteIcon name="heart" /></span></div>
        <div className="ltl-contact-details">
          <a href="tel:+27721839847"><span className="ltl-contact-icon" aria-hidden="true"><SiteIcon name="phone" /></span><span><small>Give us a ring</small>072 183 9847</span></a>
          <a href="mailto:ltlprivatetutoring@gmail.com"><span className="ltl-contact-icon" aria-hidden="true"><SiteIcon name="mail" /></span><span><small>Send a little hello</small>ltlprivatetutoring@gmail.com</span></a>
          <div><span className="ltl-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span><small>Our happy place</small>22 Nqutu Rd, Hillcrest,<br />KwaZulu-Natal</span></div>
        </div>
        <a className="ltl-contact-whatsapp" href="https://wa.me/27721839847" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z"/><path d="M8 7.5c0 4 3 7 7 7l1-2-3-1-.8 1a6 6 0 0 1-2.7-2.7l1-.8-1-3Z"/></svg>Prefer WhatsApp? Let’s chat <span aria-hidden="true"><SiteIcon name="arrow-right" /></span></a>
      </Reveal>
      <Reveal className="ltl-contact-paper-wrap">
        <div className="ltl-contact-paper">
          <span className="ltl-contact-tape" aria-hidden="true"/>
          <span className="ltl-contact-flower" aria-hidden="true"><SiteIcon name="flower" /></span>
          <span className="ltl-hand ltl-contact-paper-hello">Hello, possibility!</span>
          <h2>Leave us a message.</h2>
          <p>A few details, and we can take it from there.</p>
          <form onSubmit={handleSubmit} aria-busy={sending}>
            <fieldset disabled={sending}>
              <div className="ltl-contact-name-row">
                <label htmlFor="contact-firstname">First name<input id="contact-firstname" name="firstname" autoComplete="given-name" maxLength={80} required placeholder="Your first name"/></label>
                <label htmlFor="contact-lastname">Surname<input id="contact-lastname" name="lastname" autoComplete="family-name" maxLength={80} required placeholder="Your surname"/></label>
              </div>
              <label htmlFor="contact-number">Mobile number</label>
              <PhoneInput ref={phoneRef} id="contact-number" name="number" defaultCountry="ZA" countryOptionsOrder={['ZA', 'NA', 'BW', '|', '...']} flags={flags} value={number} onChange={setNumber} international countryCallingCodeEditable={false} autoComplete="tel" required placeholder="Your mobile number" aria-describedby="contact-phone-help"/>
              <small id="contact-phone-help" className="ltl-contact-field-help">Choose your country using the flag dropdown.</small>
              <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@example.com"/></label>
              <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" rows={5} maxLength={5000} required placeholder="Tell us a little about how we can help…"/></label>
              <div className="ltl-contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty<input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></label></div>
              <button className="ltl-button ltl-contact-send" type="submit">{sending ? 'Sending…' : 'Send a little hello'}<span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span></button>
            </fieldset>
            <p className={`ltl-contact-status ${status.type ? `is-${status.type}` : ''}`} role="status" aria-live="polite" aria-atomic="true">{status.message}</p>
          </form>
          <span className="ltl-hand ltl-contact-paper-foot">Every learning journey starts with a hello.</span>
        </div>
      </Reveal>
    </section>
  </main>;
}

export default ContactPage;
