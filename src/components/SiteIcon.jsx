import './SiteIcon.css';

// SVG geometry avoids platform-specific emoji and font substitutions.
const paths = {
  'arrow-right': 'M4 12h16M14 6l6 6-6 6',
  'arrow-left': 'M20 12H4M10 6l-6 6 6 6',
  'arrow-up-right': 'M5 19 19 5M6 5h13v13',
  'arrow-down': 'M12 4v16M6 14l6 6 6-6',
  flower: 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93',
  heart: 'M12 20 3.8 12.2C-1 7.4 5.8 1.8 12 7.4c6.2-5.6 13 .0 8.2 4.8Z',
  phone: 'M7 3l3 5-2 2c2 3 3 4 6 6l2-2 5 3c0 5-4 5-7 3C8 17 4 13 3 7c-.6-3 1-4 4-4Z',
  mail: 'M3 5h18v14H3ZM3 6l9 7 9-7',
  pencil: 'm4 16 12-12 4 4L8 20l-5 1ZM13 7l4 4M4 16l4 4',
  home: 'm3 11 9-8 9 8M5 9v12h14V9M10 21v-7h4v7',
};

export default function SiteIcon({ name, className = '' }) {
  return (
    <svg className={`ltl-site-icon ${className}`} viewBox="0 0 24 24"
      width="24" height="24" fill={name === 'spark' ? 'currentColor' : 'none'}
      stroke={name === 'spark' ? 'none' : 'currentColor'} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={name === 'spark' ? 'M12 1c1.6 6.6 4.4 9.4 11 11-6.6 1.6-9.4 4.4-11 11C10.4 16.4 7.6 13.6 1 12 7.6 10.4 10.4 7.6 12 1Z' : paths[name]} />
    </svg>
  );
}
