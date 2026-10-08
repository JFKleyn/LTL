import SiteIcon from '../../components/SiteIcon';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import logo from '../../assets/IMG_0222.webp';
import Reveal from '../../components/Reveal';
import '../Home/HomePage.css';
import './EnrollPage.css';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const subjects = ['English Home Language', 'Mathematics', 'Afrikaans First Additional Language', 'Natural Science', 'History', 'Geography'];
const options = [
  { key: 'homework', title: 'Homework Hub & Workspace', note: 'A little structure. A lot of support.', description: 'A structured and supervised learning space designed to support learners with daily homework and independent study. This option helps students build good study habits, stay organised, and complete tasks accurately and on time. Academic guidance and encouragement are provided, but this is not a formal tutoring session.', details: 'Grades 1–12 · 30 minutes or 1 hour · Homework support, revision, organisation, and study skills' },
  { key: 'tutoring', title: 'Tutoring', note: 'Small groups. Growing confidence.', description: 'Small-group tutoring offered in tutor pods of two to four students. Sessions are subject-specific, allowing focused academic support, concept reinforcement, and exam or test preparation. Tutoring is structured, goal-oriented, and tailored to the learners’ needs.', details: 'Grades 1–7 · Per hour · One chosen subject per session, including test and exam revision' },
  { key: 'homeschool', title: 'Homeschool Assistance', note: 'Your journey, with a helping hand.', description: 'Academic support for families who have chosen the homeschooling journey. Parents remain responsible for registering their child with a recognised homeschooling curriculum, while LTL provides academic guidance, structure, accountability, and daily learning support. This option assists learners in staying on track with their curriculum requirements.', details: 'Grades 1–7 · One chosen subject per session, including test and exam revision' },
  { key: 'therapy', title: 'Educational Therapy (NILD)', note: 'Tools for learning. Room to grow.', description: 'Individualised educational therapy based on the NILD (National Institute for Learning Development) approach. This option is designed for learners who experience difficulties with areas such as attention, memory, processing, reading, writing, or mathematics. Therapy sessions focus on strengthening underlying learning skills rather than only addressing academic content.', details: 'One-on-one sessions · Grades 1–7 · One chosen subject per session, including test and exam revision' },
];
const formatTime = minutes => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const minutes = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
const starts = Array.from({ length: 15 }, (_, i) => formatTime(810 + i * 15));
const endsFor = from => from ? [minutes(from) + 30, minutes(from) + 60].filter(time => time <= 1020).map(formatTime) : [];
const emptyChoices = () => Object.fromEntries(options.map(({ key }) => [key, { selected: false, timeFrom: '', timeTo: '', curriculum: '', subjects: [] }]));

function Field({ name, label, required = false, type = 'text', multiline = false, autoComplete, maxLength = 200, ...rest }) {
  const Tag = multiline ? 'textarea' : 'input';
  return <label className="ltl-enrol-field" htmlFor={`enrol-${name}`}><span>{label}{required && <span className="ltl-enrol-required"> *</span>}</span><Tag id={`enrol-${name}`} name={name} required={required} type={multiline ? undefined : type} rows={multiline ? 3 : undefined} autoComplete={autoComplete} maxLength={maxLength} {...rest}/></label>;
}

export function EnrollPage() {
  const [choices, setChoices] = useState(emptyChoices);
  const [phones, setPhones] = useState([undefined, undefined]);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const busy = useRef(false);
  const statusRef = useRef(null);
  const successRef = useRef(null);
  function fail(message) { setStatus(message); requestAnimationFrame(() => statusRef.current?.focus()); }
  function update(key, patch) { setChoices(previous => ({ ...previous, [key]: { ...previous[key], ...patch } })); }
  function toggle(key, selected) { update(key, selected ? { selected: true } : { selected: false, timeFrom: '', timeTo: '', curriculum: '', subjects: [] }); }

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    const form = new FormData(event.currentTarget);
    const value = key => String(form.get(key) || '').trim();
    const days = form.getAll('days');
    const services = options.filter(({ key }) => choices[key].selected).map(({ key }) => key);
    if (!days.length) return fail('Please select at least one day of the week.');
    if (!services.length) return fail('Please select at least one learning option.');
    for (const key of services) {
      if (!choices[key].timeFrom || !endsFor(choices[key].timeFrom).includes(choices[key].timeTo)) return fail('Please select a valid time range for each selected learning option.');
    }
    if (choices.tutoring.selected && !choices.tutoring.subjects.length) return fail('Please select at least one tutoring subject.');
    if (choices.homeschool.selected && !choices.homeschool.curriculum.trim()) return fail('Please enter the homeschool curriculum.');
    if (!phones[0] || !isPossiblePhoneNumber(phones[0]) || (phones[1] && !isPossiblePhoneNumber(phones[1]))) return fail('Please check the parent / guardian mobile numbers.');
    const parent = index => ({ fullname: value(`parent${index}fullname`), email: value(`parent${index}email`), number: phones[index - 1] || '', address: value(`parent${index}address`) });
    if (['childFullname', 'grade', 'school', 'parent1fullname', 'parent1email'].some(key => !value(key))) return fail('Please complete all required fields.');
    const payload = {
      childFullname: value('childFullname'), grade: value('grade'), school: value('school'), birthday: value('birthday'), allergies: value('allergies'),
      parent1: parent(1), parent2: parent(2), days, services,
      tutoringSubjects: choices.tutoring.selected ? choices.tutoring.subjects : [],
      ...Object.fromEntries(options.map(({ key }) => [key, { timeFrom: choices[key].timeFrom, timeTo: choices[key].timeTo, ...(key === 'homeschool' ? { curriculum: choices[key].curriculum.trim() } : {}) }])),
      areasDifficulty: value('areasDifficulty'), learningStrengths: value('learningStrengths'), previousSupport: value('previousSupport'), socialConsent: value('socialConsent'),
    };
    busy.current = true; setSending(true); setStatus('Sending your enrolment…');
    try {
      const response = await fetch('/api/enrol', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      let result;
      try { result = await response.json(); } catch { throw new Error('The enrolment service is unavailable. Please contact LTL directly.'); }
      if (!response.ok || result.success !== true) throw new Error(result.error || 'Your enrolment could not be sent. Please try again.');
      setSuccess(true); setStatus('');
      requestAnimationFrame(() => { successRef.current?.focus(); successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    } catch (error) { fail(error.message || 'Something went wrong. Please try again.'); }
    finally { busy.current = false; setSending(false); }
  }

  if (success) return <main className="ltl-enrol ltl-wrap"><div className="ltl-enrol-success" ref={successRef} tabIndex={-1}><img src={logo} alt="Love to Learn Private Tutoring"/><span className="ltl-hand">A lovely beginning!</span><h1>Thank you for your<br /><em>enrolment enquiry.</em></h1><p>We have received your submission and will be in contact with you as soon as possible with the relevant documentation and next steps.</p><div className="ltl-actions"><Link to="/" className="ltl-button">Back to home <span aria-hidden="true"><SiteIcon name="arrow-right" /></span></Link><button type="button" className="ltl-enrol-another" onClick={() => { setChoices(emptyChoices()); setPhones([undefined, undefined]); setSuccess(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Enrol another learner</button></div></div></main>;

  return <main className="ltl-enrol" id="main-content">
    <section className="ltl-wrap ltl-enrol-intro"><span className="ltl-eyebrow">A little step towards big possibilities</span><h1>Let’s start a<br /><em>lovely learning journey.</em></h1><p>Tell us a little about your learner and the support you’re looking for.</p><span className="ltl-hand">Room to learn. Space to be you.</span></section>
    <form className="ltl-wrap ltl-enrol-form" onSubmit={submit} aria-busy={sending}>
      <p className="ltl-enrol-form-note">Fields marked <span className="ltl-enrol-required">*</span> are required.</p>
      <fieldset className="ltl-enrol-all" disabled={sending}>
        <Reveal><section className="ltl-enrol-panel"><span className="ltl-hand ltl-enrol-kicker">Meet your little learner</span><h2>Learner information</h2><div className="ltl-enrol-grid"><Field name="childFullname" label="Child’s full name" required/><Field name="grade" label="Grade" required/><Field name="school" label="School" required/><Field name="birthday" label="Birthday" type="date" max={new Date().toISOString().slice(0, 10)}/><Field name="allergies" label="Allergies" multiline maxLength={2000}/></div></section></Reveal>
        <Reveal><section className="ltl-enrol-panel"><span className="ltl-hand ltl-enrol-kicker">Keeping the family connected</span><h2>Parents / guardians’ contact details</h2>{[1, 2].map(index => <fieldset key={index} className="ltl-enrol-parent"><legend>Parent / guardian {index}{index === 2 ? ' · Optional' : ''}</legend><div className="ltl-enrol-grid"><Field name={`parent${index}fullname`} label="Full name" required={index === 1} autoComplete="name"/><Field name={`parent${index}email`} label="Email" type="email" required={index === 1} autoComplete="email" maxLength={254}/><div className="ltl-enrol-field"><label htmlFor={`parent${index}-phone`}>Mobile number{index === 1 && <span className="ltl-enrol-required"> *</span>}</label><PhoneInput id={`parent${index}-phone`} flags={flags} defaultCountry="ZA" international countryCallingCodeEditable={false} required={index === 1} value={phones[index - 1]} onChange={number => setPhones(previous => previous.map((old, i) => i === index - 1 ? number : old))} autoComplete="tel"/></div><Field name={`parent${index}address`} label="Address" multiline maxLength={2000}/></div></fieldset>)}</section></Reveal>
        <Reveal><section className="ltl-enrol-panel"><span className="ltl-hand ltl-enrol-kicker">Find your rhythm</span><h2>Learning options</h2><p>Please only complete the learning options of your choice.</p><span className="ltl-enrol-hours">Operating hours: 13:30–17:00</span><fieldset className="ltl-enrol-days"><legend>Days of the week <span className="ltl-enrol-required">*</span></legend><div>{weekdays.map(day => <label key={day} className="ltl-enrol-day"><input type="checkbox" name="days" value={day}/><span>{day}</span></label>)}</div></fieldset><div className="ltl-enrol-options">{options.map((option, index) => { const state = choices[option.key]; const ends = endsFor(state.timeFrom); return <article key={option.key} className={`ltl-enrol-option ltl-enrol-option-${option.key} ${state.selected ? 'is-selected' : ''}`}><label className="ltl-enrol-option-title"><input type="checkbox" checked={state.selected} onChange={event => toggle(option.key, event.target.checked)}/><span>{option.title}</span></label><span className="ltl-hand ltl-enrol-option-note">{option.note}</span><fieldset disabled={!state.selected || sending} className="ltl-enrol-option-fields">{option.key === 'tutoring' && <fieldset className="ltl-enrol-subjects"><legend>Subject(s)</legend>{subjects.map(subject => <label key={subject}><input type="checkbox" checked={state.subjects.includes(subject)} onChange={event => update(option.key, { subjects: event.target.checked ? [...state.subjects, subject] : state.subjects.filter(item => item !== subject) })}/><span>{subject}</span></label>)}</fieldset>}{option.key === 'homeschool' && <label className="ltl-enrol-field" htmlFor="enrol-curriculum">Curriculum <span className="ltl-enrol-required">*</span><input id="enrol-curriculum" maxLength={200} required={state.selected} value={state.curriculum} onChange={event => update(option.key, { curriculum: event.target.value })}/></label>}<div className="ltl-enrol-times"><label htmlFor={`${option.key}-from`}>From<select id={`${option.key}-from`} required={state.selected} value={state.timeFrom} onChange={event => update(option.key, { timeFrom: event.target.value, timeTo: '' })}><option value="">Select</option>{starts.map(time => <option key={time}>{time}</option>)}</select></label><label htmlFor={`${option.key}-to`}>To<select id={`${option.key}-to`} required={state.selected} value={state.timeTo} onChange={event => update(option.key, { timeTo: event.target.value })}><option value="">Select</option>{ends.map(time => <option key={time}>{time}</option>)}</select></label></div>{state.timeFrom && !ends.length && <p className="ltl-enrol-time-hint" role="status">Choose an earlier start: sessions must be 30 or 60 minutes and finish by 17:00.</p>}</fieldset><details><summary>About this learning option</summary><p>{option.description}</p><p className="ltl-enrol-service-details">{option.details}</p></details><span className="ltl-enrol-option-star" aria-hidden="true"><SiteIcon name={['pencil', 'spark', 'home', 'heart'][index]} /></span></article>; })}</div></section></Reveal>
        <Reveal><section className="ltl-enrol-panel"><span className="ltl-hand ltl-enrol-kicker">Every learner is wonderfully different</span><h2>A little more about your child</h2><Field name="areasDifficulty" label="Areas of difficulty (e.g. reading, writing, mathematics, attention, comprehension, organisation)" multiline maxLength={3000}/><Field name="learningStrengths" label="Learning strengths / interests" multiline maxLength={3000}/><Field name="previousSupport" label="Previous academic support" multiline maxLength={3000}/><fieldset className="ltl-enrol-consent"><legend>Social media consent <span className="ltl-enrol-required">*</span></legend>{['Yes', 'No'].map(answer => <label key={answer}><input type="radio" name="socialConsent" value={answer} required/><span>{answer}</span></label>)}</fieldset></section></Reveal>
        <div className="ltl-enrol-finish"><span className="ltl-hand">One little step closer.</span><p>Once this form is completed, all relevant documentation — including payment details, term dates, stationery lists, terms and conditions, and the indemnity and waiver — will be sent to you to finalise your enrolment.</p><button className="ltl-button" type="submit">{sending ? 'Sending…' : 'Submit enrolment'}<span aria-hidden="true"><SiteIcon name="arrow-right" /></span></button></div>
      </fieldset>
      <p className="ltl-enrol-status" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1} ref={statusRef}>{status}</p>
    </form>
  </main>;
}
export default EnrollPage;
