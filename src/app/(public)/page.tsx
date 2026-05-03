import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      orderBy: { updatedAt: "desc" },
      take: 6,
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-500">
            Карго · автотовары
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Адил Экспресс — всё для вашего авто
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Запчасти, ветровики и дефлекторы, брызговики, LED-мониторы и электроника, аксессуары в салон —
            подберём и доставим. Работаем как классическая карго-служба с упором на автотовары.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-amber-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Категории</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/catalog/${c.slug}`}
                className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="font-semibold text-zinc-900 dark:text-white">{c.name}</span>
                {c.description ? (
                  <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{c.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Хиты и акции</h2>
          <Link href="/catalog" className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-400">
            Весь каталог
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                slug: p.slug,
                name: p.name,
                shortDesc: p.shortDesc,
                priceRub: p.priceRub,
                imageUrl: p.imageUrl,
                inStock: p.inStock,
                category: { name: p.category.name, slug: p.category.slug },
              }}
            />
          ))}
        </div>
        {featured.length === 0 ? (
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Товары скоро появятся.</p>
        ) : null}
      </section>
    </div>
  );
}
