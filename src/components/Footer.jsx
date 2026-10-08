import './Footer.css';
import logo from '../assets/IMG_0222.webp';

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/27721839847', style: 'whatsapp', path: 'M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.7-4.8a8.5 8.5 0 1 1 15.8-4.4Z', extra: 'M8.2 7.8c-.8 1.5 1.8 5.8 5 7.2 1.3.6 2.2-.1 2.6-1.2l-2.4-1.2-.9 1c-1.6-.8-2.5-1.8-3.2-3.2l.8-.9-1.1-2.2Z' },
  { name: 'Instagram', href: 'https://www.instagram.com/lovetolearntutoring_/', style: 'instagram' },
  { name: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61568466908104', style: 'facebook' }
];

export function Footer() {
  return <footer className="ltl-footer">
    <div className="ltl-wrap ltl-footer-welcome"><span className="ltl-hand">A little curiosity goes a long way.</span><svg viewBox="0 0 125 40" fill="none" aria-hidden="true"><path d="M4 25c20-18 33 17 48-3S77 8 87 23c8 13 18 5 32-7m-9-3 10 3-5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
    <div className="ltl-wrap ltl-footer-grid">
      <div className="ltl-footer-brand"><a href="/" className="ltl-brand" aria-label="Love to Learn home"><img src={logo} alt="Love to Learn" /></a><p>Shaping little minds,<br />growing big hearts.</p><nav className="ltl-socials" aria-label="Social media">{socialLinks.map(social => <a key={social.name} className={`ltl-social-icon ltl-social-${social.style}`} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} (opens in a new tab)`} title={social.name}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{social.style === 'whatsapp' ? <><path d={social.path}/><path d={social.extra}/></> : social.style === 'instagram' ? <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></> : <path d="M14.5 21v-8h3l.5-4h-3.5V7c0-1 .5-1.5 1.5-1.5H18V2.2L15.3 2C11.6 2 10 4 10 7v2H7v4h3v8" fill="currentColor" stroke="none"/>}</svg></a>)}</nav></div>
      <nav className="ltl-footer-links" aria-label="Footer navigation"><h3>Come on in</h3><a href="/#learning-options">Learning options <span aria-hidden="true">→</span></a><a href="/about/">About LTL <span aria-hidden="true">→</span></a><a href="/contact/">Get in touch <span aria-hidden="true">→</span></a><a href="/enrol/">Enrol your child <span aria-hidden="true">→</span></a></nav>
      <div className="ltl-footer-contact"><h3>Let’s talk learning</h3><a href="tel:+27721839847"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m7 3 3 5-2 2c2 3 3 4 6 6l2-2 5 3c0 5-4 5-7 3C8 17 4 13 3 7c-.6-3 1-4 4-4Z"/></svg><span>072 183 9847</span></a><a href="mailto:ltlprivatetutoring@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 7 9-7"/></svg><span>ltlprivatetutoring@gmail.com</span></a><div className="ltl-footer-address"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><p>22 Nqutu Rd, Hillcrest,<br />KwaZulu-Natal</p></div></div>
    </div>
    <div className="ltl-wrap ltl-copyright"><span>© {new Date().getFullYear()} LTL Private Tutoring. All rights reserved.</span><span className="ltl-footer-signoff">Made for little minds and big possibilities. <span aria-hidden="true">♡</span></span><a className="ltl-venture-credit" href="https://venturetechnologies.co" target="_blank" rel="noopener noreferrer">Powered by <strong>Venture</strong><span aria-hidden="true">↗</span></a></div>
  </footer>;
}
export default Footer;
