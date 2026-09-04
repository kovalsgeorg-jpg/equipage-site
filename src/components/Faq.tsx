import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { faq } from "@/config/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" data-tone="night" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeading
            id="faq-title"
            title="Коротко о главном"
            lead="Не нашли ответа? Позвоните, менеджер подскажет по вашей ситуации."
          />
        </Reveal>

        <div>
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details className="group border-b border-line-soft py-2">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl leading-none text-brass transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-prose pb-5 text-[15px] text-ink-2">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
