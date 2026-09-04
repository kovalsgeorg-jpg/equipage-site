import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { audiences } from "@/config/site";

/** Три двери по типу заказчика: посетитель сразу узнаёт свой сценарий. */
export function Audiences() {
  return (
    <section aria-labelledby="aud-title" data-tone="night" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2 id="aud-title" className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            С чем вы к нам пришли?
          </h2>
        </Reveal>
        <div className="mt-10">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <a
                href={a.href}
                className="group grid gap-2 border-t border-line-soft py-7 row-hover last:border-b sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <h3 className="text-2xl text-ink transition-colors group-hover:text-brass sm:text-3xl">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] text-ink-2">{a.text}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden font-display text-3xl text-brass transition-transform group-hover:translate-x-2 sm:block"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
