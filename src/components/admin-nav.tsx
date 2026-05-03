import Link from "next/link";
import { logoutAction } from "@/app/actions/admin-auth";

const links = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/products", label: "Товары" },
  { href: "/admin/products/new", label: "Новый товар" },
];

export function AdminNav() {
  return (
    <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/admin" className="font-bold text-zinc-900 dark:text-white">
            Админка
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-600 hover:text-amber-700 dark:text-zinc-400 dark:hover:text-amber-400"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
            На сайт
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Выйти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
