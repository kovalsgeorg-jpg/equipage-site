import Link from "next/link";
import { CarriageLogo } from "@/components/CarriageLogo";

export default function NotFound() {
  return (
    <main className="scene-cream flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <CarriageLogo tone="dark" className="h-20 w-auto" />
      <h1 className="mt-8 text-5xl">Такой страницы нет</h1>
      <p className="mt-4 max-w-md text-[#4c4a40]">
        Возможно, ссылка устарела. Всё главное на первой странице:
        услуги, меню и форма расчёта.
      </p>
      <Link href="/" className="btn btn-dark mt-8">
        На главную
      </Link>
    </main>
  );
}
