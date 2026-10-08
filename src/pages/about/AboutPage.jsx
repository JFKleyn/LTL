import ownerPhoto from '../../assets/aboutimg.webp';
import Reveal from '../../components/Reveal';
import '../Home/HomePage.css';
import './AboutPage.css';

export function AboutPage() {
  return <main className="ltl-about" id="main-content">
    <section className="ltl-wrap ltl-about-hero">
      <div className="ltl-about-hero-copy">
        <span className="ltl-eyebrow">Meet your tutor · Get to know Love to Learn</span>
        <h1>A little about me.<br /><span>A whole lot of heart.</span></h1>
        <p>Hello everyone! My name is Cerryn and I am the founder and teacher-tutor at LTL.</p>
        <span className="ltl-hand ltl-about-hello">Teacher by dream. Tutor by heart.</span>
        <a className="ltl-text-link ltl-about-link" href="#cerryn-story">Come, get to know me <span aria-hidden="true">↓</span></a>
      </div>
      <div className="ltl-about-portrait-wrap">
        <figure className="ltl-about-portrait"><span className="ltl-about-tape" aria-hidden="true"/><img src={ownerPhoto} alt="Cerryn, founder and teacher-tutor at Love to Learn" fetchPriority="high"/><figcaption className="ltl-hand">Hello, I’m Cerryn!</figcaption></figure>
        <span className="ltl-about-portrait-star" aria-hidden="true">✳</span>
        <span className="ltl-about-heart" aria-hidden="true">♡</span>
      </div>
    </section>
    <div className="ltl-about-ribbon"><span>Comfort</span><span aria-hidden="true">✦</span><span>Creativity</span><span aria-hidden="true">✦</span><span>Growth</span><span aria-hidden="true">✦</span><span>Confidence</span></div>
    <section id="cerryn-story" className="ltl-section ltl-wrap ltl-about-story">
      <Reveal className="ltl-about-story-title"><span className="ltl-eyebrow">Where it all began</span><h2>A dream that<br /><span>started in Grade 2.</span></h2><span className="ltl-hand">Some things just feel like you.</span><svg className="ltl-about-story-doodle" viewBox="0 0 130 95" fill="none" aria-hidden="true"><path d="M65 26C46 14 27 17 15 22v50c20-6 37-1 50 7 13-8 30-13 50-7V22c-12-5-31-8-50 4Z" fill="#f5e9d1" stroke="#204f5e" strokeWidth="2"/><path d="M65 26v53M25 37l26 5M25 48l26 5M78 42l26-5M78 53l26-5" stroke="#204f5e" strokeWidth="2" strokeLinecap="round"/></svg></Reveal>
      <div className="ltl-about-story-copy">
        <Reveal><p>From when I was very little, I always knew I wanted to become a teacher. I was certain by Grade 2 that teaching was my dream job. I went on to study and qualify with my Bachelor of Education in Foundation Phase Teaching. I also went on to qualify as a NILD Level 1 Educational Therapist.</p></Reveal>
        <Reveal delay={60}><p>While studying, I did my teaching internships at a variety of different schools, worked at an ice-cream shop, waitressed at a café, au paired three amazing children from a wonderful family and began tutoring learners in the afternoons. This started small and slowly grew. I then opened my part-time tutoring space from my home, which I absolutely loved.</p></Reveal>
        <Reveal className="ltl-about-story-note"><span className="ltl-hand">The best of both worlds.</span><p>I spent two years as a full-time Grade 3 class teacher, teaching in the mornings and tutoring in the afternoons. This is where I became what I like to call a <strong>teacher-tutor</strong> — truly the best of both worlds.</p></Reveal>
        <Reveal><p>I decided to make a choice about where my heart truly wanted to focus, which led me to opening Love to Learn Private Tutoring.</p></Reveal>
      </div>
    </section>
    <section className="ltl-about-credentials"><div className="ltl-wrap">
      <Reveal className="ltl-section-heading"><span className="ltl-eyebrow">Experience with a personal touch</span><h2>A caring heart.<br /><span>A qualified pair of hands.</span></h2></Reveal>
      <div className="ltl-about-credential-grid">
        <Reveal><article><span className="ltl-about-credential-icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="m6 22 26-12 26 12-26 12Z" fill="#fffaf0"/><path d="M16 28v17c8 7 24 7 32 0V28M57 23v22M54 46h6"/></svg></span><h3>Bachelor of Education</h3><p>Qualified in Foundation Phase Teaching.</p><span className="ltl-hand">A foundation for little minds.</span></article></Reveal>
        <Reveal delay={65}><article><span className="ltl-about-credential-icon" aria-hidden="true">♡</span><h3>NILD Level 1</h3><p>Qualified Educational Therapist.</p><span className="ltl-hand">Support with understanding.</span></article></Reveal>
        <Reveal delay={130}><article><span className="ltl-about-credential-icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="11" y="13" width="42" height="40" rx="5" fill="#fffaf0"/><path d="M11 25h42M22 8v10M42 8v10M23 34h18M23 42h11"/></svg></span><h3>Classroom experience</h3><p>Two years as a full-time Grade 3 class teacher, alongside afternoon tutoring.</p><span className="ltl-hand">Teaching meets tutoring.</span></article></Reveal>
      </div>
    </div></section>
    <section className="ltl-section ltl-wrap ltl-about-today">
      <Reveal><span className="ltl-eyebrow">The dream, brought to life</span><h2>Welcome to<br /><span>my happy place.</span></h2><p>I now run my business full-time and opened my Love to Learn office in January 2025. What a dream — my passion and purpose, all in one place. I feel incredibly grateful and blessed to do this work.</p><p>I work with learners from Grades 1 to 7, across all subjects, and offer a variety of learning options such as a homework hub and workspace, tutoring, homeschool assistance, educational therapy and various workshops.</p><a className="ltl-text-link ltl-about-link" href="/#learning-options">Explore our learning options <span aria-hidden="true">→</span></a></Reveal>
      <Reveal className="ltl-about-promise"><span className="ltl-about-tape" aria-hidden="true"/><span className="ltl-hand">At the heart of it all</span><blockquote>“Shaping little minds,<br /><span>growing big hearts.”</span></blockquote><p>I believe in this — my all-time favourite quote. This is what I encourage and inspire in the LTL learning space: a homely space, encouraging comfort, focus, creativity, growth and confidence.</p><span className="ltl-about-promise-heart" aria-hidden="true">♡</span></Reveal>
    </section>
    <section className="ltl-wrap ltl-about-last"><Reveal className="ltl-about-cta"><span className="ltl-hand">Every little step matters.</span><h2>Let’s help your child<br /><span>grow, learn and succeed.</span></h2><p>Let’s work together to support your child’s learning journey.</p><div className="ltl-actions"><a className="ltl-button" href="/contact/">Get in touch <span aria-hidden="true">→</span></a><a className="ltl-text-link ltl-about-link" href="/enrol/">Start enrolment <span aria-hidden="true">→</span></a></div></Reveal></section>
  </main>;
}
export default AboutPage;
