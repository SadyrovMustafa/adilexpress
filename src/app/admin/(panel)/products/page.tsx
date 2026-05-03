import Link from "next/link";
import { deleteProductAction } from "@/app/actions/admin-products";
import { formatRub } from "@/lib/money";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Товары</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Создание, правка и удаление позиций каталога.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-amber-600"
        >
          + Новый товар
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Название</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Категория</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Цена</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Хит</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  <Link href={`/product/${p.slug}`} className="hover:text-amber-700 dark:hover:text-amber-400">
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{p.category.name}</td>
                <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{formatRub(p.priceRub)}</td>
                <td className="px-4 py-3">{p.featured ? "Да" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="rounded-lg border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
                    >
                      Правка
                    </Link>
                    <form action={deleteProductAction.bind(null, p.id)}>
                      <button
                        type="submit"
                        className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                      >
                        Удалить
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 text-zinc-600 dark:text-zinc-400">Товаров пока нет — создайте первый.</p>
      ) : null}
    </div>
  );
}
