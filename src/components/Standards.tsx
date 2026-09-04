import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { standards } from "@/config/site";

export function Standards() {
  return (
    <section aria-labelledby="standards-title" data-tone="olive" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="standards-title"
            title="Что стоит за каждой подачей"
          />
        </Reveal>

        <div className="mt-12">
          {standards.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 80}>
              <div className="grid gap-3 border-t border-line-soft py-8 last:border-b md:grid-cols-[280px_1fr] md:gap-12">
                <h3 className="text-2xl text-brass">{s.title}</h3>
                <p className="max-w-2xl text-[16px] leading-relaxed text-ink-2">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
