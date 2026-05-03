import { AdminLoginForm } from "@/components/admin-login-form";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-full flex-1 bg-gradient-to-b from-amber-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="inline-block text-sm font-medium text-amber-700 hover:underline dark:text-amber-400"
        >
          ← На сайт
        </Link>
        <h1 className="mt-8 text-2xl font-bold text-zinc-900 dark:text-white">Вход в админку</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Управление товарами каталога Адил Экспресс.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
