import './Reveal.css';
import { useEffect, useRef } from 'react';
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!('IntersectionObserver' in window)) return;
    element.classList.add('ltl-reveal-pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('ltl-reveal-pending');
        element.classList.add('ltl-revealed');
        observer.unobserve(element);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`ltl-reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>;
}
