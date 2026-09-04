import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { site, contacts, legal } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "Политика обработки персональных данных, EQUIPAGE кейтеринг" },
  robots: { index: false },
};

/** [ЗАМЕНИТЬ] Базовый текст политики. Перед публикацией согласовать
 *  с юристом и дополнить при необходимости. */
export default function PrivacyPage() {
  return (
    <main className="scene-cream min-h-dvh py-16">
      <Container className="max-w-3xl">
        <Link href="/" className="text-[15px] text-[#4c4a40] underline underline-offset-2">
          ← На главную
        </Link>
        <h1 className="mt-6 text-4xl sm:text-5xl">
          Политика обработки персональных данных
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[#4c4a40]">
          <p>
            Оператор персональных данных: {legal.companyFull} (ИНН {legal.inn},
            ОГРН {legal.ogrn}, адрес: {legal.legalAddress}).
          </p>
          <p>
            Отправляя форму на сайте {site.domain.replace("https://", "")}, вы
            даёте согласие на обработку указанных вами данных: имени, телефона,
            адреса электронной почты и сведений о планируемом мероприятии.
          </p>
          <p>
            Данные используются только для связи с вами и подготовки расчёта
            стоимости услуг. Мы не передаём их третьим лицам, кроме случаев,
            предусмотренных законодательством РФ.
          </p>
          <p>
            Вы можете отозвать согласие в любой момент, написав на{" "}
            <a href={`mailto:${contacts.email}`} className="underline underline-offset-2">
              {contacts.email}
            </a>
            . По этому же адресу можно запросить уточнение или удаление данных.
          </p>
        </div>
      </Container>
    </main>
  );
}
