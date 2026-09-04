"use client";

/**
 * Переключатель «вечер/день». Тема живёт в data-theme на <html>
 * и в localStorage (ключ eq-theme); начальное значение ставит
 * инлайн-скрипт в layout до отрисовки, поэтому вспышки нет.
 * Видимость иконок решает CSS по data-theme: состояние не нужно.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "day" ? "night" : "day";
    root.dataset.theme = next;
    try {
      localStorage.setItem("eq-theme", next);
    } catch {
      /* приватный режим: тема живёт до перезагрузки */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить оформление: вечер или день"
      title="Вечер / день"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-brass hover:text-brass ${className}`}
    >
      {/* луна: показывается в вечерней теме */}
      <svg
        className="theme-icon-night"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
      </svg>
      {/* солнце: показывается в дневной теме */}
      <svg
        className="theme-icon-day"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
      </svg>
    </button>
  );
}
