import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Обзор</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Краткая статистика каталога.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Товары</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">{productCount}</p>
          <Link
            href="/admin/products"
            className="mt-4 inline-block text-sm font-medium text-amber-700 hover:underline dark:text-amber-400"
          >
            Управление →
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Категории</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">{categoryCount}</p>
          <p className="mt-4 text-sm text-zinc-500">
            Категории задаются в базе (seed). Редактор категорий можно добавить отдельно.
          </p>
        </div>
      </div>
    </div>
  );
}
