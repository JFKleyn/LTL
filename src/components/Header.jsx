import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/IMG_0222.webp";
import { useState, useEffect, useRef } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onOutsideClick = (event) => {
      if (header.current && !header.current.contains(event.target))
        setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onOutsideClick);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onOutsideClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const toggle = useRef(null);
  useEffect(() => {
    function escape(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header
      ref={header}
      className={`ltl-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="ltl-header-inner">
        <Link to="/" className="ltl-brand" aria-label="Love to Learn home" onClick={() => setOpen(false)}>
          <img src={logo} alt="Love to Learn" />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="ltl-menu-toggle"
          aria-expanded={open}
          aria-controls="ltl-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span
            className={`ltl-menu-lines ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </span>
        </button>
        <nav
          id="ltl-navigation"
          className={`ltl-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
          onClick={() => setOpen(false)}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link className="ltl-button" to="/enrol">
            Enrol now <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
