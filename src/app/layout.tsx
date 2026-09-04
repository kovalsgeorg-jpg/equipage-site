import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import { site, contacts, legal } from "@/config/site";
import { Metrika } from "@/components/Metrika";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    absolute: "EQUIPAGE кейтеринг: выездной кейтеринг в Москве с 2003 года",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}: ${site.slogan}`,
    description: site.description,
    url: site.domain,
    siteName: site.name,
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/video/hero-team-poster.jpg", width: 1920, height: 600 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "FoodEstablishment"],
      "@id": `${site.domain}/#org`,
      name: site.name,
      alternateName: site.legalBrand,
      legalName: legal.companyFull,
      url: site.domain,
      logo: `${site.domain}/logo/carriage-dark.png`,
      foundingDate: String(legal.since),
      telephone: contacts.phone,
      email: contacts.email,
      servesCuisine: "Европейская, русская",
      areaServed: "Москва и Московская область",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Москва",
        streetAddress: "Гостиничный проезд, д. 4Б",
        addressCountry: "RU",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#site`,
      url: site.domain,
      name: site.name,
      inLanguage: "ru",
      publisher: { "@id": `${site.domain}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${golos.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("eq-theme");if(t==="day"){document.documentElement.dataset.theme="day"}}catch(e){}`}
        </Script>
        {/* eslint-disable-next-line react/no-danger */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: сайт кейтеринга как вечерняя дорога экипажа к событию; отказ от светлого каталога карточек, принятого в категории.
OWN-WORLD: тёмные тона равной светлоты (графит 16180f, умбра 221a10, олива 16211a, вино 291320), латунь c9a86c как свет фонарей, крем f4efe3 включается только там, где посетитель работает (меню, форма); Cormorant Garamond + Golos, знак-карета.
STORY: гость видит живую съёмку команды, узнаёт свой сценарий, листает форматы как развороты журнала, прикидывает бюджет и оставляет заявку.
FIRST VIEWPORT: видео на весь экран, H1 в две строки с латунным словом «события», подзаголовок и две кнопки внизу слева, лента цифр под видео.
FORM: brief-pinned направление владельца (отзыв 04.09), без ролла; ключ не выдавался.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-[#22231f]"
        >
          К содержанию
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Metrika />
      </body>
    </html>
  );
}
