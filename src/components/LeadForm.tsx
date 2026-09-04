"use client";

import { useId, useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { contacts } from "@/config/site";
import { leadSchema, eventTypes } from "@/lib/lead-schema";
import { reachGoal } from "@/lib/metrika";

type Status = "idle" | "sending" | "success" | "not_configured" | "error";
type Errors = Partial<Record<string, string>>;

const initial = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  date: "",
  guests: "",
  budget: "",
  comment: "",
  consent: false,
};

export function LeadForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const [key, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (msgs?.[0]) fieldErrors[key] = msgs[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus("success");
        reachGoal("lead_submit");
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      const noReceiver =
        data?.error === "not_configured" || res.status === 404 || res.status === 405;
      setStatus(noReceiver ? "not_configured" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Shell>
        <div role="status" className="rounded-2xl border border-[#ddd3bf] bg-[#fdfbf6] p-10 text-center">
          <p className="font-display text-3xl">Заявка отправлена</p>
          <p className="mx-auto mt-4 max-w-md text-[#4c4a40]">
            Спасибо! Менеджер свяжется с вами в рабочее время и пришлёт смету
            в течение 1–2 часов после уточнения деталей.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[#ddd3bf] bg-[#fdfbf6] p-6 sm:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Имя" error={errors.name} required>
            {(id) => (
              <input
                id={id}
                className="field"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                onChange={(e) => set("name", e.target.value)}
              />
            )}
          </Field>
          <Field label="Телефон" error={errors.phone} required>
            {(id) => (
              <input
                id={id}
                className="field"
                type="tel"
                autoComplete="tel"
                placeholder="+7 900 000-00-00"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                onChange={(e) => set("phone", e.target.value)}
              />
            )}
          </Field>
          <Field label="Email" error={errors.email}>
            {(id) => (
              <input
                id={id}
                className="field"
                type="email"
                autoComplete="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                onChange={(e) => set("email", e.target.value)}
              />
            )}
          </Field>
          <Field label="Тип мероприятия" error={errors.eventType} required>
            {(id) => (
              <select
                id={id}
                className="field"
                value={values.eventType}
                aria-invalid={Boolean(errors.eventType)}
                onChange={(e) => set("eventType", e.target.value)}
              >
                <option value="">Выберите формат</option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Дата события" error={errors.date}>
            {(id) => (
              <input
                id={id}
                className="field"
                type="date"
                value={values.date}
                onChange={(e) => set("date", e.target.value)}
              />
            )}
          </Field>
          <Field label="Количество гостей" error={errors.guests}>
            {(id) => (
              <input
                id={id}
                className="field"
                inputMode="numeric"
                placeholder="Например, 50"
                value={values.guests}
                aria-invalid={Boolean(errors.guests)}
                onChange={(e) => set("guests", e.target.value)}
              />
            )}
          </Field>
          <Field label="Ориентировочный бюджет" error={errors.budget} className="sm:col-span-2">
            {(id) => (
              <input
                id={id}
                className="field"
                placeholder="Например, 3 000–5 000 ₽ на гостя или общая сумма"
                value={values.budget}
                onChange={(e) => set("budget", e.target.value)}
              />
            )}
          </Field>
          <Field label="Комментарий" error={errors.comment} className="sm:col-span-2">
            {(id) => (
              <textarea
                id={id}
                className="field min-h-28"
                placeholder="Площадка, формат, пожелания к меню, аллергии"
                value={values.comment}
                onChange={(e) => set("comment", e.target.value)}
              />
            )}
          </Field>
        </div>

        <label className="mt-6 flex items-start gap-3 text-[14px] text-[#4c4a40]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#a9853c]"
            checked={values.consent}
            aria-invalid={Boolean(errors.consent)}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span>
            Соглашаюсь на обработку персональных данных согласно{" "}
            <a href="/privacy" className="underline underline-offset-2">
              политике конфиденциальности
            </a>
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2 text-[14px] text-[#a33d34]">{errors.consent}</p>
        ) : null}

        {status === "not_configured" ? (
          <p role="alert" className="mt-6 rounded-lg bg-cream-2 p-4 text-[15px]">
            Онлайн-приём заявок пока не подключён. Позвоните{" "}
            <a href={contacts.phoneHref} className="font-medium underline underline-offset-2">
              {contacts.phone}
            </a>{" "}
            или напишите на{" "}
            <a href={`mailto:${contacts.email}`} className="font-medium underline underline-offset-2">
              {contacts.email}
            </a>{" "}
            и мы ответим так же быстро.
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="mt-6 rounded-lg bg-cream-2 p-4 text-[15px]">
            Не получилось отправить заявку. Попробуйте ещё раз или позвоните{" "}
            <a href={contacts.phoneHref} className="font-medium underline underline-offset-2">
              {contacts.phone}
            </a>
            .
          </p>
        ) : null}

        <button
          type="submit"
          className="btn btn-dark mt-7 w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Отправляем…" : "Получить расчёт"}
        </button>
        <p className="mt-4 text-[13px] text-[#6d6a5c]">
          Смета бесплатна и ни к чему не обязывает. {contacts.workHours}.
        </p>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section id="lead" aria-labelledby="lead-title" className="scene-cream py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <h2 id="lead-title" className="text-4xl sm:text-5xl">
            Расскажите о событии, а мы пришлём смету и меню
          </h2>
          <p className="mt-5 max-w-md text-lg text-[#4c4a40]">
            Достаточно даты, числа гостей и формата. Смета за 1–2 часа
            в рабочее время, с точностью ±10 %.
          </p>
          <div className="mt-8 space-y-2 text-[15px]">
            <p>
              <a href={contacts.phoneHref} className="font-medium">
                {contacts.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contacts.email}`} className="underline underline-offset-2">
                {contacts.email}
              </a>
            </p>
            <p className="text-[#6d6a5c]">{contacts.workHours}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>{children}</Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-medium">
        {label}
        {required ? <span aria-hidden="true" className="text-accent-ink"> *</span> : null}
      </label>
      {children(id)}
      {error ? (
        <p className="mt-1.5 text-[13px] text-[#a33d34]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
