import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { AboutPage } from "./pages/about/AboutPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { EnrollPage } from "./pages/enroll/EnrollPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { PrivacyPolicyPage } from "./pages/privacy/PrivacyPolicyPage";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";

const SITE_URL = "https://ltlprivatetutoring.co.za";

const seoByPath = {
  "/": {
    title: "Love to Learn | Private Tutoring in Hillcrest & Durban",
    description: "Love to Learn offers private tutoring and educational support in Hillcrest, Durban and surrounding areas. Helping students build confidence and achieve their potential.",
  },
  "/about": {
    title: "About Love to Learn | Private Tutoring in Hillcrest",
    description: "Learn more about Love to Learn, offering private tutoring and educational support to students in Hillcrest, Durban and surrounding areas.",
  },
  "/contact": {
    title: "Contact Love to Learn | Hillcrest & Durban",
    description: "Get in touch with Love to Learn to enquire about private tutoring and educational support in Hillcrest, Durban and surrounding areas.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Love to Learn",
    description: "Read how Love to Learn Private Tutoring handles personal information submitted through our website.",
  },
  "/enrol": {
    title: "Enrol at Love to Learn | Private Tutoring in Durban",
    description: "Enquire about enrolment at Love to Learn for private tutoring and educational support in Hillcrest, Durban and surrounding areas.",
  },
};

function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function PageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const seo = seoByPath[path];
    if (!seo) {
      document.title = "Page Not Found | Love to Learn";
      setMeta("name", "robots", "noindex, follow");
      setMeta("name", "description", "This page could not be found. Return to Love to Learn.");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      return;
    }
    document.head.querySelector('meta[name="robots"]')?.remove();

    const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageSEO />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/enrol" element={<EnrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
