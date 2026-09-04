import Link from "next/link";
import { Container } from "./Container";
import { CarriageLogo } from "./CarriageLogo";
import { PhoneLink } from "./PhoneLink";
import { site, contacts, legal, nav } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#101208] py-14 text-[#f1ead9]">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <CarriageLogo tone="light" className="h-10 w-auto" />
              <span className="leading-none">
                <span className="block font-display text-2xl tracking-[0.08em]">
                  EQUIPAGE
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.34em] text-[#c9a86c]">
                  кейтеринг
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[15px] text-[#c9c2ae]">
              {site.slogan}. Выездной кейтеринг в Москве и области
              с {legal.since} года.
            </p>
          </div>

          <nav aria-label="Разделы сайта">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#c9a86c]">
              Разделы
            </h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#c9c2ae] hover:text-[#f1ead9]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#c9a86c]">
              Контакты
            </h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <PhoneLink className="font-medium" />
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="text-[#c9c2ae] hover:text-[#f1ead9]">
                  {contacts.email}
                </a>
              </li>
              <li className="text-[#c9c2ae]/80">{contacts.address}</li>
              <li className="text-[#c9c2ae]/80">{contacts.workHours}</li>
              {contacts.telegram ? (
                <li>
                  <a href={contacts.telegram} className="text-[#c9c2ae] hover:text-[#f1ead9]">
                    Telegram
                  </a>
                </li>
              ) : null}
              {contacts.whatsapp ? (
                <li>
                  <a href={contacts.whatsapp} className="text-[#c9c2ae] hover:text-[#f1ead9]">
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#f1ead9]/15 pt-6 text-[13px] text-[#c9c2ae]/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {legal.companyFull} · ИНН {legal.inn} · ОГРН {legal.ogrn}
          </p>
          <Link href="/privacy" className="hover:text-[#f1ead9]">
            Политика обработки персональных данных
          </Link>
        </div>
      </Container>
    </footer>
  );
}
