"use client";

import Link from "next/link";
import { brand, heroImage } from "@/lib/content";
import { Logo, useSite } from "./SiteFrame";

export default function HomeStage() {
  const site = useSite();
  const half = (id) =>
    Array.from({ length: 4 }, (_, index) => <span key={`${id}-${index}`}>{brand.line}</span>);

  return (
    <main className="home">
      <header className="home-bar">
        <Link href="/about">درباره</Link>
        <Logo />
        <Link href="/contact">تماس</Link>
      </header>

      <div className="home-stage">
        <div className="marquee" dir="ltr" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-half">{half("a")}</div>
            <div className="marquee-half">{half("b")}</div>
          </div>
        </div>
        <figure className="hero-photo">
          <img src={heroImage} alt="تراس مشرف به دریا در یک ملک ساحلی" />
        </figure>
      </div>

      <div className="home-copy">
        <h1>
          در املاک استثنایی قبرس، مونته‌نگرو و گرجستان
          <br />
          سرمایه‌گذاری کنید.
        </h1>
        <button type="button" className="pill" onClick={() => site?.openSelection()}>
          شروع از ۱۰۰٬۰۰۰ یورو
        </button>
      </div>

      <footer className="home-foot">
        <div className="home-actions">
          <button type="button" className="pill" onClick={() => site?.openSelection()}>
            گزینش ما
          </button>
          <button type="button" className="icon-btn" aria-label="باز کردن منو" onClick={() => site?.openMenu()}>
            <span />
            <span />
          </button>
        </div>
        <span>
          {brand.name}® {brand.year}
        </span>
      </footer>
    </main>
  );
}
