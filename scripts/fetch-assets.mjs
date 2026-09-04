/**
 * Скачивает медиа сайта (фото, видео, логотипы) из публичного
 * репозитория ассетов в public/ перед сборкой на Vercel.
 * Нужен, потому что бинарники не передаются через прямой деплой файлов.
 * Локально безвреден: пропускает уже существующие файлы.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE =
  "https://raw.githubusercontent.com/kovalsgeorg-jpg/equipage-assets/main";

const FILES = [
  "images/case-2.jpg",
  "images/case-4.jpg",
  "images/case-canape.jpg",
  "images/case-line.jpg",
  "images/case-winter.jpg",
  "images/dish-rolls.jpg",
  "images/hall-banquet.jpg",
  "images/hero-canape.jpg",
  "images/menu-seafood.jpg",
  "images/turnkey-hall.jpg",
  "images/video-barman.jpg",
  "images/video-canape.jpg",
  "images/video-desserts.jpg",
  "logo/carriage-dark-sm.png",
  "logo/carriage-dark.png",
  "logo/carriage-light-sm.png",
  "logo/carriage-light.png",
  "video/hero-team-poster.jpg",
  "video/hero-team.mp4",
  "video/hero-team.webm",
];

/** Файлы вне public/: [путь в репо ассетов, путь в проекте]. */
const EXTRA = [["src-icon.png", "src/app/icon.png"]];

const root = join(process.cwd(), "public");
const targets = [
  ...FILES.map((rel) => [rel, join(root, rel)]),
  ...EXTRA.map(([rel, dest]) => [rel, join(process.cwd(), dest)]),
];

for (const [rel, dest] of targets) {
  try {
    await access(dest);
    continue;
  } catch {
    /* нет файла: скачиваем */
  }
  const res = await fetch(`${BASE}/${rel}`);
  if (!res.ok) {
    throw new Error(`fetch-assets: ${rel} -> HTTP ${res.status}`);
  }
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`fetched ${rel}`);
}
console.log("fetch-assets: done");
