import { describe, expect, it } from "vitest";
import { leadSchema } from "../src/lib/lead-schema";

const validLead = {
  name: "Анна",
  phone: "+7 926 443-99-09",
  email: "anna@company.ru",
  eventType: "Фуршет",
  date: "2026-10-01",
  guests: "50",
  budget: "300 000 ₽",
  comment: "Площадка — лофт в центре",
  consent: true,
};

describe("leadSchema", () => {
  it("принимает корректную заявку", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("принимает заявку без email и необязательных полей", () => {
    const lead = { ...validLead, email: "", date: "", guests: "", budget: "", comment: "" };
    expect(leadSchema.safeParse(lead).success).toBe(true);
  });

  it("отклоняет пустое имя", () => {
    expect(leadSchema.safeParse({ ...validLead, name: "" }).success).toBe(false);
  });

  it("отклоняет телефон не по формату", () => {
    expect(leadSchema.safeParse({ ...validLead, phone: "звоните" }).success).toBe(false);
  });

  it("отклоняет некорректный email", () => {
    expect(leadSchema.safeParse({ ...validLead, email: "not-an-email" }).success).toBe(false);
  });

  it("отклоняет заявку без согласия на обработку данных", () => {
    expect(leadSchema.safeParse({ ...validLead, consent: false }).success).toBe(false);
  });

  it("отклоняет нечисловое количество гостей", () => {
    expect(leadSchema.safeParse({ ...validLead, guests: "много" }).success).toBe(false);
  });
});
