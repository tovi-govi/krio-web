import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WhyChoose } from "@/components/site/WhyChoose";
import { QualityCheck } from "@/components/site/QualityCheck";
import { Products } from "@/components/site/Products";
import { Sustainability } from "@/components/site/Sustainability";
import { Customers } from "@/components/site/Customers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChoose />
        <QualityCheck />
        <Products />
        <Sustainability />
        <Customers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
