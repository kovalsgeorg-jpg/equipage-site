import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  services,
  menuItems,
  gallery,
  faq,
  orderSteps,
  menuFormats,
  heroVideo,
  namedClients,
} from "../src/config/site";

const publicDir = join(__dirname, "..", "public");

describe("конфигурация контента", () => {
  it("каждая картинка из конфига существует в public/", () => {
    const images = [
      ...services.map((s) => s.image),
      ...menuItems.map((m) => m.image),
      ...gallery.map((g) => g.image),
    ];
    for (const img of images) {
      expect(existsSync(join(publicDir, img)), `нет файла ${img}`).toBe(true);
    }
  });

  it("видео первого экрана и логотипы на месте", () => {
    for (const f of [
      heroVideo.mp4,
      heroVideo.webm,
      heroVideo.poster,
      "/logo/carriage-dark-sm.png",
      "/logo/carriage-light-sm.png",
      "/logo/carriage-dark.png",
      "/llms.txt",
    ]) {
      expect(existsSync(join(publicDir, f)), `нет файла ${f}`).toBe(true);
    }
  });

  it("формат каждой позиции меню есть в списке фильтров", () => {
    const ids = new Set(menuFormats.map((f) => f.id));
    for (const item of menuItems) {
      expect(ids.has(item.format), `неизвестный формат ${item.format}`).toBe(true);
    }
  });

  it("основные блоки не пустые", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(faq.length).toBeGreaterThan(0);
    expect(orderSteps.length).toBe(5);
    expect(namedClients.length).toBeGreaterThan(0);
  });
});
