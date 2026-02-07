import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Results } from "@/components/results";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Results />
        <Problem />
        <Solution />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
