import { Suspense } from "react";
import ContactView from "@/components/ContactView";

export const metadata = {
  title: "تماس | ریالیویت",
  description: "برای صحبت دربارهٔ فرصت‌های سرمایه‌گذاری با ریالیویت در تماس باشید.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<main className="contact-page" />}>
      <ContactView />
    </Suspense>
  );
}
