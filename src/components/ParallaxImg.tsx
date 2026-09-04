"use client";

import { useEffect, useRef } from "react";

/** Мягкий параллакс фото: картинка внутри рамки сдвигается не больше
 *  чем на 8% высоты. Отключается при prefers-reduced-motion. */
export function ParallaxImg({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = frame.current;
    const el = inner.current;
    if (!f || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = f.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.transform = `translateY(${(-progress * 8).toFixed(2)}%) scale(1.16)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
