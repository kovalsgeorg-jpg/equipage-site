"use client";

import { useEffect, useState } from "react";

/** Липкая мини-CTA на мобильном: появляется после первого экрана,
 *  прячется, когда форма заявки уже в кадре. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lead = document.getElementById("lead");
    let pastHero = false;
    let leadVisible = false;

    const apply = () => setShow(pastHero && !leadVisible);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.9;
      apply();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let io: IntersectionObserver | undefined;
    if (lead) {
      io = new IntersectionObserver((entries) => {
        leadVisible = entries.some((e) => e.isIntersecting);
        apply();
      });
      io.observe(lead);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-night/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href="#lead" className="btn btn-brass w-full" tabIndex={show ? 0 : -1}>
        Получить смету за 1–2 часа
      </a>
    </div>
  );
}
