import { metrikaId } from "@/config/site";

type YmFn = (id: number, action: string, goal: string) => void;

/** Отправка цели в Яндекс Метрику. Молча ничего не делает,
 *  пока счётчик не подключён (metrikaId пуст). */
export function reachGoal(goal: "lead_submit" | "phone_click") {
  if (!metrikaId) return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym === "function") {
    ym(Number(metrikaId), "reachGoal", goal);
  }
}
