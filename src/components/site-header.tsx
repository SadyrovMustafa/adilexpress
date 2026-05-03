import Link from "next/link";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-zinc-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-sm text-white">
            АЭ
          </span>
          <span className="hidden sm:inline">Адил Экспресс</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-amber-700 dark:hover:text-amber-400"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-amber-500 hover:text-amber-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-amber-500 dark:hover:text-amber-300"
          >
            Админка
          </Link>
        </nav>
      </div>
    </header>
  );
}
