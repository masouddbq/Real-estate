"use client";

import Link from "next/link";
import { useEffect } from "react";
import { principles } from "@/lib/content";

const terrace =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80";
const coast =
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80";

export default function AboutView() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.18 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="about">
      <section className="about-hero">
        <img src={terrace} alt="تراس یک ملک مشرف به دریا" />
        <div className="veil" />
        <div className="about-hero-copy">
          <p>دربارهٔ ریالیویت</p>
          <h1>ارتقای ملک. ارتقای زندگی.</h1>
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <h2>
          ریالیویت یک آژانس بازاریابی املاک در مقیاس جهانی است. با توسعه‌دهندگانی کار می‌کنیم که
          رویکرد تازه، تعهد به کیفیت، و همان چشم‌انداز را دارند: «ارتقای ملک، ارتقای زندگی.»
        </h2>
        <p>
          سبد ما با موقعیت ممتاز، تجربهٔ زندگی استثنایی، امکانات در سطح جهانی، تقاضای پایدار در
          طول سال، و ظرفیت رشد سرمایه در بلندمدت انتخاب می‌شود.
        </p>
      </section>

      <figure className="about-break" data-reveal>
        <img src={coast} alt="خط ساحلی" />
        <figcaption>قبرس · مونته‌نگرو · گرجستان</figcaption>
      </figure>

      <section className="principles">
        {principles.map((item) => (
          <article key={item.no} data-reveal>
            <span>{item.no}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-close" data-reveal>
        <h2>
          سرمایه‌گذار را به توسعه‌دهندهٔ قابل اعتماد وصل می‌کنیم، دسترسی زودتر به فرصت‌های
          استثنایی می‌دهیم، و تا آخرین قدم خرید کنارش می‌مانیم تا معامله با اطمینان بسته شود.
        </h2>
        <Link href="/contact" className="pill light" data-color="#1f2b5e">
          شروع گفتگو
        </Link>
      </section>
    </main>
  );
}
