import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { pillars } from "@/config/site";

/** Три вещи, за которые отвечает экипаж: стол, дорога, люди.
 *  Пять доказательств из брифа распределены по этим опорам. */
export function Pillars() {
  return (
    <section aria-labelledby="pillars-title" data-tone="olive" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 id="pillars-title" className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
            Стол, дорога и люди: за это отвечает{" "}
            <span className="text-brass">экипаж</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">
            Кейтеринг это гостеприимство. Мы посредник между вами и вашими
            гостями, и на событии наша работа не должна быть заметна: заметен
            только накрытый стол.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="border-t-2 border-brass/60 pt-6">
                <h3 className="font-display text-3xl">{p.title}</h3>
                <ul className="mt-5 space-y-4">
                  {p.points.map((point) => (
                    <li key={point.title} className="text-[15px] leading-relaxed">
                      <span className="font-medium text-ink">{point.title}.</span>{" "}
                      <span className="text-ink-2">{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
