import Script from "next/script";
import { metrikaId } from "@/config/site";

/** Счётчик Яндекс Метрики. Подключается только при заданном
 *  NEXT_PUBLIC_METRIKA_ID (см. .env.example). Цели: lead_submit, phone_click. */
export function Metrika() {
  if (!metrikaId) return null;
  return (
    <Script id="ya-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
      k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
      ym(${Number(metrikaId)}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});`}
    </Script>
  );
}
