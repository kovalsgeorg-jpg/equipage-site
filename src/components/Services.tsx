import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { services } from "@/config/site";

/** Услуги как журнальные развороты: фото в половину экрана,
 *  чередование сторон и температур, никаких одинаковых карточек. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div data-tone="umber" className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="services-title"
              title="Привозим ресторан туда, где вы ждёте гостей"
              lead="Шесть форматов работы. У каждого свой ритм, логистика и меню: выберите близкий, остальное соберём вместе."
            />
          </Reveal>
        </Container>
      </div>

      {services.map((s, i) => (
        <article
          key={s.id}
          data-tone={i % 2 ? "night" : "umber"}
          className="border-t border-line-soft"
        >
          <Container className="grid items-stretch gap-0 lg:grid-cols-2">
            <div
              className={`kb relative min-h-[300px] overflow-hidden lg:min-h-[440px] ${
                i % 2 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className={`flex flex-col justify-center py-12 lg:py-20 ${
                i % 2 ? "lg:pr-16" : "lg:pl-16"
              }`}
            >
              <Reveal>
                <h3 className="text-3xl sm:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-2">
                  {s.description}
                </p>
                <p className="mt-3 text-[15px] text-ink-2/80">{s.scenario}</p>
                {s.price ? (
                  <p className="mt-5 font-display text-xl text-brass">{s.price}</p>
                ) : null}
                <div className="mt-7">
                  <a
                    href="#lead"
                    className="text-[15px] font-medium text-ink underline decoration-brass/50 underline-offset-8 transition-colors hover:text-brass"
                  >
                    Получить расчёт этого формата
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </article>
      ))}
    </section>
  );
}
