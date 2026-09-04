"use client";

import { useEffect, useRef } from "react";

/**
 * Мягкое появление блока при входе в кадр.
 * Контент виден всегда: маскировку (rv-armed) вешает только сам скрипт,
 * который умеет её снять; страховка через 2 с раскрывает всё при сбое.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("rv-armed");
    const guard = window.setTimeout(() => el.classList.add("rv-on"), 2000);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("rv-on");
            io.disconnect();
            window.clearTimeout(guard);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(guard);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`rv ${className}`}
      style={delay ? ({ "--rv-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
