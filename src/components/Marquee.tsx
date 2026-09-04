import { namedClients } from "@/config/site";

const COPIES = 4;

/** Бегущая строка подтверждённых имён заказчиков.
 *  Набор размножается COPIES раз; сдвиг в CSS считается от --mq-copies,
 *  поэтому список можно менять, не трогая стили. */
export function Marquee() {
  if ((namedClients as readonly string[]).length === 0) return null;
  return (
    <section
      aria-label="Заказчики, чьи события мы исполняли"
      data-tone="wine"
      className="border-y border-line-soft py-10"
    >
      <p className="mx-auto mb-6 w-fit px-4 text-center text-sm uppercase tracking-[0.2em] text-ink-2">
        Названы поимённо в наших кейсах
      </p>
      <div className="mq-window" role="presentation">
        <div className="mq-track" style={{ "--mq-copies": COPIES } as React.CSSProperties}>
          {Array.from({ length: COPIES }).map((_, c) => (
            <span key={c} aria-hidden={c > 0} className="mq-set">
              {namedClients.map((name) => (
                <span key={name} className="mq-item">
                  {name}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
