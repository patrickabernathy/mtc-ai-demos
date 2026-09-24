import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { VisitUs } from "../components/VisitUs";
import { Signup } from "../components/Signup";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-5xl mx-auto">
        <Hero />
        <Features />
        <VisitUs />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
