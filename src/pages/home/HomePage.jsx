import SiteIcon from '../../components/SiteIcon';
import learningSpace from "../../assets/image 28.webp";
import gallery0 from "../../assets/image 30.webp";
import gallery1 from "../../assets/image 31.webp";
import gallery2 from "../../assets/image 34.webp";
import gallery3 from "../../assets/image 35.webp";
import gallery4 from "../../assets/image 36.webp";
import gallery5 from "../../assets/image 37.webp";
import { useState } from "react";
import Reveal from "../../components/Reveal";
const learningOptions = [
  {
    title: "Homework Hub & Workspace",
    copy: "A supervised learning space designed to support learners with daily homework and independent study. For Grades 1–12, this option helps students build good study habits, stay organised, and complete tasks accurately and on time.",
    note: "Work smart, stress less!",
  },
  {
    title: "Tutoring",
    copy: "Tutor pods of two to four students, ensuring each student receives personalised attention. Sessions are structured, subject-specific and tailored to learners’ needs. The focus is on academic support, concept reinforcement, and exam or test preparation.",
    note: "Practice makes progress!",
  },
  {
    title: "Homeschool Assistance",
    copy: "Academic support for families who have chosen the homeschooling journey. LTL provides academic guidance and structure. This option assists learners in staying on track with their curriculum requirements.",
    note: "A homely workspace!",
  },
  {
    title: "Educational Therapy (NILD)",
    copy: "Based on the NILD approach. This option is designed for learners who experience difficulties with areas such as attention, memory, processing, reading, writing, or mathematics.",
    note: "Develop tools for independent learning in the classroom and in life!",
  },
];
import "./HomePage.css";
const subjects = [
  "English Home Language",
  "Mathematics",
  "Afrikaans First Additional Language",
  "Natural Science",
  "Geography",
  "History",
];
const subjectNotes = ["Find your words", "Make numbers click", "Elke klein tree tel", "Stay curious", "Explore the world", "Discover the stories"];
const subjectIllustrations = [<g key="subject-0"><path d="M32 18c-8-5-17-6-25-3v33c8-3 17-2 25 3 8-5 17-6 25-3V15c-8-3-17-2-25 3Z" fill="#fffaf0"/><path d="M32 18v33M13 25l12 3M13 33l12 3M39 28l12-3M39 36l12-3"/></g>,<g key="subject-1"><rect x="15" y="7" width="34" height="50" rx="6" fill="#fffaf0"/><rect x="21" y="14" width="22" height="10" rx="2" fill="#f9dfa8"/><path d="M23 33h5M25.5 30.5v5M36 33h5M23 44l5 5M28 44l-5 5M36 45h5M36 49h5"/></g>,<g key="subject-2"><path d="M8 12h32v23H21l-9 7v-7H8Z" fill="#fffaf0"/><path d="M28 29h28v22h-5v7l-9-7H28" fill="#f9dfa8"/><path d="M17 24h14M35 39h13M35 45h8"/></g>,<g key="subject-3"><path d="M25 9h14M28 9v19L14 49c-2 4 0 7 4 7h28c4 0 6-3 4-7L36 28V9" fill="#fffaf0"/><path d="M21 39h22"/><path d="M19 44h26l5 8c1 2-1 4-4 4H18c-3 0-5-2-4-4Z" fill="#f9dfa8" stroke="none"/><circle cx="29" cy="45" r="2"/><circle cx="37" cy="49" r="2"/><path d="m47 17 3-5 3 5M50 12v10"/></g>,<g key="subject-4"><circle cx="32" cy="28" r="20" fill="#fffaf0"/><ellipse cx="32" cy="28" rx="9" ry="20"/><path d="M12 28h40M16 17h32M16 39h32M21 54h22M32 48v6"/><path d="M56 20c5 16-5 31-22 32"/></g>,<g key="subject-5"><path d="M17 13h33c8 0 8 12 0 12H17c-8 0-8-12 0-12Z" fill="#f9dfa8"/><path d="M19 19v32h26V19" fill="#fffaf0"/><path d="M18 45h29c8 0 8 12 0 12H18c-8 0-8-12 0-12Z" fill="#f9dfa8"/><path d="M26 27h12M26 34h9"/></g>];
const benefits = [
  {
    title: "For students",
    note: "Watch your child flourish",
    items: [
      "Build genuine confidence in learning",
      "Learn at your own pace",
      "Develop strong study habits",
      "Improve grades and test scores",
      "Discover the joy in understanding",
      "Feel supported",
    ],
  },
  {
    title: "For parents",
    note: "Stay connected and informed",
    items: [
      "Regular progress reports",
      "Direct communication with your tutor",
      "Transparent pricing, no surprises",
      "Flexible scheduling",
      "Peace of mind",
      "Support for your child’s progress",
    ],
  },
];
const reviews = [
  {
    grade: "Grade 5",
    school: "Winston Park Primary School",
    subject: "English",
    quote:
      "Absolutely amazing! Liv went from failing an English paper to almost an A! Your patience and time and understanding of Liv has been amazing! And we are so happy with her results.",
  },
  {
    grade: "Grade 3",
    school: "Waterfall Primary",
    subject: "Mathematics and Afrikaans",
    quote: "I’ve seen great progress since Nandi started tutoring with Miss R.",
  },
  {
    grade: "Grade 4",
    school: "Waterfall Preparatory",
    subject: "Educational Therapy and Mathematics",
    quote:
      "Cerryn is a passionate teacher who gives her ALL in the classroom, she knows my child’s interests, strengths and areas where he needs support. She takes the time to make each lesson fun and I am always amazed to see my child walk out happy after a lesson in the afternoon. We absolutely love Miss Ryan :)",
  },
  {
    grade: "Grade 6",
    school: "Thomas More College",
    subject: "Mathematics",
    quote: "Reah’s marks have significantly improved.",
  },
  {
    grade: "Grade 4",
    school: "Crest College",
    subject: "Mathematics, English and Social Science",
    quote: "Keep up the good work",
  },
];
function Actions() {
  return (
    <div className="ltl-actions">
      <a className="ltl-button" href="/enrol/">
        Enrol now <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
      </a>
      <a className="ltl-text-link" href="/contact/">
        Let’s have a chat <span aria-hidden="true"><SiteIcon name="arrow-right" /></span>
      </a>
    </div>
  );
}
export function HomePage() {
  const [review, setReview] = useState(0);
  return (
    <main className="ltl-home" id="main-content">
      <section className="ltl-hero ltl-wrap">
        <div className="ltl-hero-copy">
          <span className="ltl-eyebrow">
            A little support. A world of possibility.
          </span>
          <h1>
            Shaping little minds,
            <br />
            growing <span className="ltl-hero-highlight">big hearts.<svg className="ltl-hero-underline" viewBox="0 0 320 22" fill="none" aria-hidden="true"><path d="M5 13C75 2 185 3 315 10M28 20C100 10 225 10 294 16" /></svg></span>
          </h1>
          <p>
            At LTL, we turn everyday moments into learning opportunities to grow
            your child’s love for learning, and celebrate every small step they
            take to reach their full potential.
          </p>
          <Actions />
          <div className="ltl-hero-note">
            <span aria-hidden="true"><SiteIcon name="spark" /></span> A welcoming place to learn, right
            here in Hillcrest.
          </div>
        </div>
        <div className="ltl-hero-art" aria-hidden="true">
          <span className="ltl-doodle doodle-one"><SiteIcon name="flower" /></span>
          <span className="ltl-doodle doodle-two"><SiteIcon name="spark" /></span>
          <div className="ltl-paper">
            <span className="ltl-hand">Hello, possibility!</span>
            <div className="ltl-book">
              <div>
                Aa<span>every little step</span>
              </div>
              <div>
                <SiteIcon name="heart" /><span>is a big deal.</span>
              </div>
            </div>
            <div className="ltl-pencil" />
            <span className="ltl-paper-caption">
              Let’s grow a love for learning.
            </span>
          </div>
          <span className="ltl-sticker">
            Practice makes
            <br />
            <strong>progress!</strong>
          </span>
          <span className="ltl-art-note">
            Room to learn.
            <br />
            Space to be you.
          </span>
        </div>
      </section>
      <div className="ltl-ribbon">
        <span>Little steps, big possibilities</span>
        <span aria-hidden="true"><SiteIcon name="spark" /></span>
        <span>Learning at your own pace</span>
        <span aria-hidden="true"><SiteIcon name="spark" /></span>
        <span>Practice makes progress</span>
      </div>
      <section id="learning-options" className="ltl-section ltl-wrap">
        <Reveal className="ltl-section-heading">
          <span className="ltl-eyebrow">
            Different learners. Different journeys.
          </span>
          <h2>
            A little help,
            <br />
            <span>in just the right way.</span>
          </h2>
          <p>
            Our learning options support your child’s needs, with room to grow
            at every step.
          </p>
        </Reveal>
        <div className="ltl-option-grid">
          {learningOptions.map((option, i) => (
            <Reveal key={option.title} delay={i * 65}>
              <article className={`ltl-option ltl-tone-${i}`}>
                <span className="ltl-option-symbol" aria-hidden="true">
                  <svg viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" focusable="false">{[<g key="service-0"><path d="M20 14h30a5 5 0 0 1 5 5v36H20a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="#fffaf0" /><path d="M23 14v41M31 25h15M31 33h12M31 41h9M14 24h7M14 34h7M14 44h7" /><path d="m46 47 12-12 5 5-12 12-7 2Z" fill="#e7ae7f" /></g>,<g key="service-1"><circle cx="23" cy="24" r="7" fill="#fffaf0"/><circle cx="47" cy="27" r="7" fill="#fffaf0"/><path d="M12 46c0-10 22-10 22 0v6H12ZM37 49c0-10 22-10 22 0v3H37Z" fill="#fffaf0"/><path d="M27 49h18v10H27Z" fill="#e7ae7f"/><path d="m51 10 2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill="#e7ae7f"/></g>,<g key="service-2"><path d="M12 32 35 12l23 20M19 28v30h32V28" fill="#fffaf0"/><path d="M29 58V42h12v16M29 30h12v7H29Z"/><path d="M7 54h10M12 49v10M56 17h7M59 13v8" stroke="#cf584b"/></g>,<g key="service-3"><path d="M35 54 15 36C-1 20 21 6 35 23 49 6 71 20 55 36Z" fill="#fffaf0"/><path d="m53 9 2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#e7ae7f"/><path d="M27 31c-3-5-8-4-9-1M13 51l-3 4M56 48l5 4" stroke="#cf584b"/></g>][i]}</svg>
                </span>
                <h3>{option.title}</h3>
                <p>{option.copy}</p>
                <span className="ltl-option-note">{option.note}</span>
                <a href="/contact/">
                  Let’s talk about it <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="ltl-options-help">
          <span className="ltl-options-help-spark" aria-hidden="true"><SiteIcon name="spark" /></span>
          <div><h3>Not sure which option fits your child?</h3><p>Let’s figure it out together.</p></div>
          <a className="ltl-text-link ltl-chat-button" href="/contact/">Let’s have a chat <span aria-hidden="true"><SiteIcon name="arrow-right" /></span></a>
        </Reveal>
      </section>
      <section className="ltl-subject-section" aria-labelledby="ltl-subject-heading">
        <div className="ltl-wrap">
          <Reveal className="ltl-section-heading">
            <span className="ltl-eyebrow">Making tricky things click</span>
            <h2 id="ltl-subject-heading">
              Small discoveries.
              <br />
              <span>Growing confidence.</span>
            </h2>
            <p>Subjects we offer for Grade 1 to Grade 7.</p>
            <span className="ltl-grade-sticker">Room to grow <strong>Grades 1–7</strong></span>
          </Reveal>
          <div className="ltl-subject-grid">
            {subjects.map((subject, i) => (
              <Reveal key={subject} delay={i * 45}>
                <div className={`ltl-subject ltl-subject-colour-${i}`}>
                  <span className="ltl-subject-icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">{subjectIllustrations[i]}</svg></span>
                  <div className="ltl-subject-copy"><h3>{subject}</h3><p>{subjectNotes[i]}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="ltl-small-note">
            Our Homework Hub & Workspace also supports learners in Grades 1–12.
          </p>
        </div>
      </section>
      <section className="ltl-section ltl-wrap">
        <Reveal className="ltl-section-heading">
          <span className="ltl-eyebrow">We care about the whole family</span>
          <h2>
            More than schoolwork.
            <br />
            <span>Support that feels personal.</span>
          </h2>
          <p>
            Here’s what students and parents can expect when working with LTL.
          </p>
        </Reveal>
        <div className="ltl-benefits">
          {benefits.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <article className={`ltl-benefit-page ltl-benefit-page-${i}`}>
                <span className="ltl-benefit-tape" aria-hidden="true" />
                <div className="ltl-benefit-heading">
                  <span className="ltl-benefit-illustration" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    {i === 0 ? <g><path d="M40 64V36M40 47c-18 2-25-9-24-17 16-1 24 6 24 17ZM40 39c18 2 25-9 24-17-16-1-24 6-24 17Z" fill="#dcebe4"/><path d="M27 65h26M13 15l3-6 3 6 6 3-6 3-3 6-3-6-6-3Z" fill="#f9dfa8"/></g> : <g><path d="M13 15h43v28H34L21 53V43h-8Z" fill="#fffaf0"/><path d="M43 38h24v21H56l-9 7v-7h-4" fill="#f9dfa8"/><path d="M25 26h19M25 33h13"/><path d="M50 47h8"/></g>}
                  </svg></span>
                  <div><span className="ltl-hand">{group.note}</span><h3>{group.title}</h3></div>
                </div>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li key={item} style={{ "--check-delay": `${180 + itemIndex * 80}ms` }}>
                      <span className="ltl-benefit-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 10-11" /></svg></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="ltl-space-section">
        <div className="ltl-wrap ltl-space-grid">
          <Reveal className="ltl-photo-stack">
            <img
              src={learningSpace}
              alt="A glimpse inside the Love to Learn learning space"
              loading="lazy"
            />
            <span className="ltl-photo-label">
              A little place for big discoveries.
            </span>
          </Reveal>
          <Reveal>
            <span className="ltl-eyebrow">Come on in</span>
            <h2>
              A homely space.
              <br />
              <span>A happy place to learn.</span>
            </h2>
            <p>
              Our learning space brings together individual attention, practical
              resources and a welcoming environment.
            </p>
            <ul className="ltl-space-list">
              {[
                "Curriculum: CAPS, IEB and more",
                "Educational games, activities and a mini library",
                "Personalised tuition and individual focus",
                "A safe office space with hands-on resources",
                "Adaptable learning options",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="ltl-text-link" href="/about/">
              Get to know LTL <span aria-hidden="true"><SiteIcon name="arrow-right" /></span>
            </a>
          </Reveal>
        </div>
      </section>
      <section className="ltl-section ltl-wrap ltl-reviews" aria-labelledby="ltl-family-words">
        <Reveal className="ltl-review-intro">
          <span className="ltl-eyebrow">From our LTL families</span>
          <h2 id="ltl-family-words">Little wins.<br /><span>Lovely words.</span></h2>
          <p>Growing confidence, happy discoveries and little moments that mean a lot. Here’s what our families have shared.</p>
          <div className="ltl-review-doodle" aria-hidden="true">
            <svg viewBox="0 0 190 105" fill="none"><path d="M18 62C8 43 24 26 39 40 51 21 75 34 63 53L38 79Z" fill="#f9e3dc" stroke="#cf584b" strokeWidth="2.5"/><path d="M80 64c24 18 60 7 77-17m-3-9 8 9-11 6" stroke="#204f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="m106 19 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="#e7ae7f"/></svg>
            <span className="ltl-hand">Notes that make us smile.</span>
          </div>
        </Reveal>
        <Reveal className="ltl-review-stage">
          <div className={`ltl-review-panel ltl-review-tone-${review % 3}`}>
            <span className="ltl-review-tape" aria-hidden="true" />
            <div className="ltl-review-topline"><span className="ltl-hand">A note from an LTL family</span><span className="ltl-review-flower" aria-hidden="true"><SiteIcon name="flower" /></span></div>
            <div className="ltl-review-content" key={review} aria-live="polite" aria-atomic="true">
              <span className="ltl-quote-mark" aria-hidden="true">“</span>
              <blockquote>{reviews[review].quote}</blockquote>
              <div className="ltl-review-family"><span className="ltl-review-avatar" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="16" cy="11" r="5"/><path d="M6 27v-3c0-10 20-10 20 0v3"/></svg></span><div><strong>{reviews[review].grade}</strong><p>{reviews[review].school}</p></div></div>
              <span className="ltl-review-subject">{reviews[review].subject}</span>
            </div>
            <div className="ltl-review-controls">
              <button type="button" onClick={() => setReview(current => (current + reviews.length - 1) % reviews.length)} aria-label="Previous testimonial"><span aria-hidden="true"><SiteIcon name="arrow-left" /></span></button>
              <div className="ltl-review-dots" role="group" aria-label="Choose a testimonial">{reviews.map((item, index) => <button key={item.school} type="button" className={index === review ? "is-active" : ""} aria-label={`Show testimonial ${index + 1}, ${item.school}`} aria-pressed={index === review} onClick={() => setReview(index)}><span aria-hidden="true" /></button>)}</div>
              <span className="ltl-review-counter">{review + 1} / {reviews.length}</span>
              <button type="button" onClick={() => setReview(current => (current + 1) % reviews.length)} aria-label="Next testimonial"><span aria-hidden="true"><SiteIcon name="arrow-right" /></span></button>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="ltl-gallery-section">
        <div className="ltl-wrap">
          <Reveal className="ltl-section-heading">
            <span className="ltl-eyebrow">Life at Love to Learn</span>
            <h2>
              Learning looks
              <br />
              <span>a little like this.</span>
            </h2>
          </Reveal>
          <div className="ltl-gallery">
            {[gallery0, gallery1, gallery2, gallery3, gallery4, gallery5].map(
              (image, i) => (
                <Reveal key={image} delay={i * 45}>
                  <img
                    src={image}
                    alt={`Learning moments at LTL, photograph ${i + 1}`}
                    loading="lazy"
                  />
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="ltl-section ltl-wrap">
        <Reveal className="ltl-cta">
          <span className="ltl-hand">Their next little step starts here.</span>
          <h2>
            Let’s grow something
            <br />
            <span>wonderful, together.</span>
          </h2>
          <p>
            Let’s chat about your child’s learning journey, or start enrolment
            when you’re ready.
          </p>
          <Actions />
          <span className="ltl-cta-star" aria-hidden="true">
            <SiteIcon name="flower" />
          </span>
        </Reveal>
      </section>
    </main>
  );
}
