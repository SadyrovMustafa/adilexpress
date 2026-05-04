import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Каталог</h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Все позиции по категориям. Цены ориентировочные — уточняйте у менеджера.
      </p>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row">
        <aside className="shrink-0 lg:w-56">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Категории</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link
                href="/catalog"
                className="block rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-100"
              >
                Все товары
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/catalog/${c.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                slug: p.slug,
                name: p.name,
                shortDesc: p.shortDesc,
                priceSom: p.priceSom,
                imageUrl: p.imageUrl,
                inStock: p.inStock,
                category: { name: p.category.name, slug: p.category.slug },
              }}
            />
          ))}
        </div>
      </div>
      {products.length === 0 ? (
        <p className="mt-8 text-zinc-600 dark:text-zinc-400">В каталоге пока пусто.</p>
      ) : null}
    </div>
  );
}
