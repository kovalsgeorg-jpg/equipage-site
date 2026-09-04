import Image from "next/image";

/** Фирменный знак-карета (исторический логотип компании, перекрашен
 *  в фирменные цвета). tone="dark" для светлого фона, "light" для тёмного. */
export function CarriageLogo({
  tone,
  className = "",
}: {
  tone: "dark" | "light";
  className?: string;
}) {
  return (
    <Image
      src={tone === "dark" ? "/logo/carriage-dark-sm.png" : "/logo/carriage-light-sm.png"}
      alt=""
      aria-hidden="true"
      width={480}
      height={235}
      className={className}
      priority
    />
  );
}
