import Hero from "./components/hero/Hero";
import Navbar from "./components/nav/Navbar";
import AboutPage from "./components/about/About";
import ContactUs from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPage />
      <ContactUs />
    </>
  );
}
