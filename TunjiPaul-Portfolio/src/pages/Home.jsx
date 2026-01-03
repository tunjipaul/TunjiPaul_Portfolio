import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contacts />
      <Footer />
    </div>
  );
}

export default Home;
