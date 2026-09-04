import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { gallery } from "@/config/site";

/** Галерея-лента: горизонтальная прокрутка со scroll-snap,
 *  кадры из видео шире фотографий — ритм плёнки, а не сетка. */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" data-tone="night" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="gallery-title"
              title="Экипаж в работе"
              lead="Фотографии и кадры из съёмок наших событий: сервировка, подача, бар и площадки."
            />
            <p aria-hidden="true" className="pb-2 text-sm uppercase tracking-[0.2em] text-ink-2">
              Листайте →
            </p>
          </div>
        </Reveal>
      </Container>

      <div className="mt-12">
        <Reveal>
          <ul className="reel pl-[max(16px,calc((100vw-1200px)/2+36px))] pr-6">
            {gallery.map((g) => {
              const wide = g.image.includes("video-");
              return (
                <li
                  key={g.image}
                  className={wide ? "w-[86vw] sm:w-[640px]" : "w-[78vw] sm:w-[420px]"}
                >
                  <figure>
                    <div
                      className={`kb relative overflow-hidden rounded-xl ${
                        wide ? "aspect-[21/9]" : "aspect-[3/2]"
                      }`}
                    >
                      <Image
                        src={g.image}
                        alt={g.caption}
                        fill
                        sizes="(min-width: 640px) 640px, 90vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-[14px] text-ink-2">
                      {g.caption}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
