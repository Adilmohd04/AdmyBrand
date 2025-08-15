import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Features } from "@/components/Features";
import { InteractiveCalculator } from "@/components/InteractiveCalculator";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section id="hero">
        <Hero />
      </section>
      <section id="process" className="-mt-16">
        <Process />
      </section>
      <section id="features" className="-mt-16">
        <Features />
      </section>
      <section id="calculator" className="-mt-16">
        <InteractiveCalculator />
      </section>
      <section id="pricing" className="-mt-16">
        <Pricing />
      </section>
      <section id="testimonials" className="-mt-16">
        <Testimonials />
      </section>
      <section id="faq" className="-mt-16">
        <FAQ />
      </section>
      <section id="contact" className="-mt-16">
        <ContactForm />
      </section>
      <section id="blog" className="-mt-16">
        <Blog />
      </section>
      <Footer />
    </main>
  );
}
