"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { brand, destinations, heroImage } from "@/lib/content";

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

const routeColor = (path) => {
  const found = destinations.find((item) => `/${item.slug}` === path);
  if (found) return found.color;
  return "#1f2b5e";
};

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M3 22 L14 5 L25 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 22 H20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="ریالیویت، صفحهٔ اصلی">
      <Mark />
      <span>ریالیویت</span>
    </Link>
  );
}

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [booting, setBooting] = useState(true);
  const [count, setCount] = useState(0);
  const [menu, setMenu] = useState(false);
  const [selection, setSelection] = useState(false);
  const [curtain, setCurtain] = useState(null);

  useEffect(() => {
    let current = 0;
    let timer;
    const step = () => {
      const jump = Math.random() > 0.72 ? 4 : Math.random() > 0.4 ? 2 : 1;
      current = Math.min(100, current + jump);
      setCount(current);
      if (current >= 100) {
        timer = setTimeout(() => setBooting(false), 420);
        return;
      }
      timer = setTimeout(step, 28 + Math.random() * 40);
    };
    timer = setTimeout(step, 180);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSelection(false);
  }, [pathname]);

  useEffect(() => {
    const locked = menu || selection || booting;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, selection, booting]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenu(false);
        setSelection(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href, color) => {
    if (!href || href === pathname) {
      setMenu(false);
      setSelection(false);
      return;
    }
    setMenu(false);
    setSelection(false);
    setCurtain({ color: color || routeColor(href), phase: "cover" });
    window.setTimeout(() => {
      router.push(href);
      setCurtain({ color: color || routeColor(href), phase: "reveal" });
      window.setTimeout(() => setCurtain(null), 760);
    }, 540);
  };

  const onClickCapture = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest("a");
    if (!anchor) return;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === pathname && !url.search) return;
    event.preventDefault();
    go(url.pathname + url.search, anchor.dataset.color);
  };

  const home = pathname === "/";
  const cards = [
    ...(home
      ? []
      : [
          {
            href: "/",
            name: "صفحهٔ اصلی",
            desc: "سرمایه‌گذاری در قبرس، مونته‌نگرو و گرجستان",
            color: "#f3f4f8",
            ink: "#1f2b5e",
            cover: heroImage,
            light: true,
          },
        ]),
    ...destinations.map((item) => ({
      href: `/${item.slug}`,
      name: item.name,
      desc: item.desc,
      color: item.color,
      ink: "#fff",
      cover: item.cover,
      light: false,
    })),
  ];

  return (
    <SiteContext.Provider value={{ openSelection: () => setSelection(true), openMenu: () => setMenu(true), go }}>
      <div onClickCapture={onClickCapture}>
      <div className={`frame${menu ? " is-dim" : ""}`}>
        {!home && (
          <header className="topbar">
            <Link href="/about">درباره</Link>
            <Logo />
            <Link href="/contact">تماس</Link>
          </header>
        )}
        {children}

        {!home && (
          <div className="dock">
            <button type="button" className="pill" onClick={() => setSelection(true)}>
              گزینش ما
            </button>
            <button type="button" className="icon-btn" aria-label="باز کردن منو" onClick={() => setMenu(true)}>
              <span />
              <span />
            </button>
          </div>
        )}
      </div>

      {menu && <div className="dim" onClick={() => setMenu(false)} />}

      <nav className={`menu-panel${menu ? " open" : ""}`} aria-hidden={!menu} aria-label="منوی اصلی">
        <button type="button" className="menu-close" onClick={() => setMenu(false)} aria-label="بستن منو">
          بستن
        </button>
        <div className="menu-links">
          <Link href="/">خانه</Link>
          <Link href="/about">درباره</Link>
          <Link href="/contact">تماس</Link>
        </div>
        <div className="menu-contact">
          <a href={brand.whatsapp} target="_blank" rel="noreferrer">
            واتساپ
          </a>
          <a href={`mailto:${brand.email}`}>ایمیل</a>
        </div>
        <button type="button" className="menu-dash" onClick={() => setMenu(false)} aria-label="بستن" />
      </nav>

      <div className={`selection${selection ? " open" : ""}`} aria-hidden={!selection}>
        <div className="selection-bar">
          <p>گزینش ما</p>
          <button type="button" onClick={() => setSelection(false)}>
            بستن
          </button>
        </div>
        <div className="selection-scroller">
          {cards.map((card, index) => (
            <a
              key={card.href}
              href={card.href}
              data-color={card.light ? "#1f2b5e" : card.color}
              className={`sel-card${card.light ? " is-light" : ""}`}
              style={{
                "--card": card.color,
                "--ink": card.ink,
                animationDelay: `${index * 70}ms`,
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.28)), url(${card.cover})`,
              }}
            >
              <span className="sel-wash" />
              <Mark />
              <span className="sel-title">{card.name}</span>
              <span className="sel-desc">{card.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {booting && (
        <div className={`loader${count >= 100 ? " done" : ""}`} role="status" aria-live="polite">
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      )}

      {curtain && <div className={`curtain ${curtain.phase}`} style={{ background: curtain.color }} />}
      </div>
    </SiteContext.Provider>
  );
}
