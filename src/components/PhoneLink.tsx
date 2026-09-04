"use client";

import { reachGoal } from "@/lib/metrika";
import { contacts } from "@/config/site";

/** Телефонная ссылка с целью Метрики phone_click. */
export function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={contacts.phoneHref}
      className={className}
      onClick={() => reachGoal("phone_click")}
    >
      {contacts.phone}
    </a>
  );
}
