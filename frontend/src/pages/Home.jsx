import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Faq from "../components/Faq";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import Seo from "../seo/Seo";
import {
  PAGES,
  breadcrumbJsonLd,
  faqJsonLd,
  HOME_FAQS,
} from "../seo/site";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([{ name: "Home", path: "/" }]),
      faqJsonLd(HOME_FAQS),
    ],
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Seo
        title={PAGES.home.title}
        description={PAGES.home.description}
        path={PAGES.home.path}
        jsonLd={jsonLd}
      />
      <NavBar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
