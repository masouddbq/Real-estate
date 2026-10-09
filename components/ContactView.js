"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { brand, destinations, goals, timelines } from "@/lib/content";

export default function ContactView() {
  const params = useSearchParams();
  const topic = params.get("topic") || "";
  const chosen = useMemo(
    () => destinations.find((item) => item.slug === topic),
    [topic]
  );
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="contact-page">
      <div className="contact-word" aria-hidden="true">
        <span>تماس</span>
      </div>

      <section className="contact-panel">
        <p className="kicker">دفتر</p>
        <h1>صحبت کنیم.</h1>
        {chosen && <p className="topic">موضوع: {chosen.name}</p>}

        {sent ? (
          <div className="sent" role="status">
            <h2>پیام شما ثبت شد.</h2>
            <p>این یک نمونهٔ نمایشی است. در نسخهٔ نهایی، پیام مستقیم به دفتر می‌رسد.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label>
              نام
              <input name="name" required autoComplete="name" placeholder="نام و نام خانوادگی" />
            </label>
            <label>
              ایمیل
              <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" dir="ltr" />
            </label>
            <label>
              تلفن
              <input name="phone" required autoComplete="tel" placeholder="۰۹۱۲۰۰۰۰۰۰۰" inputMode="tel" />
            </label>
            <label>
              هدف خرید
              <select name="goal" defaultValue={goals[0]}>
                {goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </label>
            <label>
              زمان خرید
              <select name="timeline" defaultValue={timelines[3]}>
                {timelines.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              پیام
              <textarea name="message" rows={4} placeholder="مقصد، بودجه، یا سؤال‌تان را بنویسید" />
            </label>
            <button type="submit" className="pill solid">
              ارسال
            </button>
          </form>
        )}

        <ul className="contact-meta">
          <li>
            <span>ایمیل</span>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </li>
          <li>
            <span>واتساپ</span>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer">
              گفتگو در واتساپ
            </a>
          </li>
          <li>
            <span>تلفن</span>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
