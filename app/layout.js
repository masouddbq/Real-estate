import { Vazirmatn } from "next/font/google";
import SiteFrame from "@/components/SiteFrame";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ریالیویت | سرمایه‌گذاری در املاک استثنایی",
  description:
    "آژانس بازاریابی املاک. فرصت‌های منتخب در قبرس، مونته‌نگرو و گرجستان. ارتقای ملک، ارتقای زندگی.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f2b5e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.className}>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
