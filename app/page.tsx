import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
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
        <Stats />
        <Results />
        <Problem />
        <Solution />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
