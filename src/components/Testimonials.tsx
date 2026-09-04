import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { contacts, testimonials } from "@/config/site";

/**
 * Отзывы. Вымышленных цитат здесь нет и быть не должно:
 * список testimonials в конфиге пуст, поэтому показывается только
 * подтверждённый рейтинг Яндекс Карт. Появятся согласованные цитаты —
 * добавьте их в config/site.ts, и блок включится сам.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" data-tone="wine" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p aria-hidden="true" className="font-display text-[96px] leading-none text-brass sm:text-[128px]">
              {contacts.yandexRating.value}
            </p>
            <h2 id="reviews-title" className="mt-2 text-4xl sm:text-5xl">
              Гостеприимство, за которое ставят пять
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink-2">
              Такой рейтинг у «Экипаж Кейтеринг» на Яндекс Картах по{" "}
              {contacts.yandexRating.count} отзывам заказчиков. Читайте их в
              первоисточнике: мы не пересказываем чужие слова.
            </p>
            <a
              href={contacts.yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-9"
            >
              Читать отзывы на Яндекс Картах
            </a>
          </div>
        </Reveal>

        {testimonials.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.author}>
                <blockquote className="h-full rounded-2xl panel border border-line-soft p-7">
                  <p className="text-[15px] leading-relaxed text-ink-2">«{t.text}»</p>
                  <footer className="mt-5 text-[14px]">
                    <cite className="not-italic font-medium text-ink">{t.author}</cite>
                    {t.event ? <span className="block text-ink-2">{t.event}</span> : null}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
