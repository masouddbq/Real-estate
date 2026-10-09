import Link from "next/link";

export default function NotFound() {
  return (
    <main className="missing">
      <p>۴۰۴</p>
      <h1>این صفحه در گزینش ما نیست.</h1>
      <Link href="/">بازگشت به خانه</Link>
    </main>
  );
}
