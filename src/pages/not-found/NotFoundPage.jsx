import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <main className="ltl-not-found">
      <div className="ltl-not-found__glow" aria-hidden="true" />
      <div className="ltl-not-found__content">
        <span className="ltl-not-found__eyebrow">A LITTLE DETOUR</span>
        <p className="ltl-not-found__number" aria-label="Error 404">404<span>.</span></p>
        <h1>Oops! This page is missing.</h1>
        <p className="ltl-not-found__description">Looks like this page wandered off. Don't worry, there's plenty more to discover at Love to Learn.</p>
        <Link className="ltl-not-found__button" to="/">
          Back to home
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
      <span className="ltl-not-found__decoration ltl-not-found__decoration--one" aria-hidden="true">✳</span>
      <span className="ltl-not-found__decoration ltl-not-found__decoration--two" aria-hidden="true">✳</span>
    </main>
  );
}
