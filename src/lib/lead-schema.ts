import { z } from "zod";

/** Схема заявки — общая для клиентской подсказки и серверной валидации. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()\-]{9,19}$/, "Телефон в формате +7 900 000-00-00"),
  email: z
    .string()
    .trim()
    .email("Почта в формате name@company.ru")
    .max(200)
    .or(z.literal("")),
  eventType: z.string().trim().min(1, "Выберите тип мероприятия").max(120),
  date: z.string().trim().max(40),
  guests: z
    .string()
    .trim()
    .regex(/^\d{0,6}$/, "Число гостей укажите цифрами"),
  budget: z.string().trim().max(120),
  comment: z.string().trim().max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Нужно согласие на обработку данных" }),
  }),
});

export type Lead = z.infer<typeof leadSchema>;

export const eventTypes = [
  "Банкет",
  "Фуршет",
  "Кофе-брейк",
  "Корпоративное питание",
  "Конференция или презентация",
  "Частное событие",
  "Доставка готовых рационов",
  "Другое",
] as const;
