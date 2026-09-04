import { Header } from "@/components/Header";
import { VideoHero } from "@/components/VideoHero";
import { Audiences } from "@/components/Audiences";
import { Services } from "@/components/Services";
import { Pillars } from "@/components/Pillars";
import { Marquee } from "@/components/Marquee";
import { MenuSection } from "@/components/MenuSection";
import { Estimator } from "@/components/Estimator";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Standards } from "@/components/Standards";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <VideoHero />
        <Audiences />
        <Services />
        <Pillars />
        <Marquee />
        <MenuSection />
        <Estimator />
        <Process />
        <Gallery />
        <Standards />
        <Testimonials />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
