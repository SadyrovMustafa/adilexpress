import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryCatalogPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: { orderBy: { name: "asc" } },
    },
  });

  if (!category) notFound();

  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{category.name}</h1>
      {category.description ? (
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">{category.description}</p>
      ) : null}

      <div className="mt-10 flex flex-col gap-10 lg:flex-row">
        <aside className="shrink-0 lg:w-56">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Категории</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link
                href="/catalog"
                className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Все товары
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/catalog/${c.slug}`}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    c.slug === slug
                      ? "bg-amber-100 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-100"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {category.products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                slug: p.slug,
                name: p.name,
                shortDesc: p.shortDesc,
                priceRub: p.priceRub,
                imageUrl: p.imageUrl,
                inStock: p.inStock,
                category: { name: category.name, slug: category.slug },
              }}
            />
          ))}
        </div>
      </div>
      {category.products.length === 0 ? (
        <p className="mt-8 text-zinc-600 dark:text-zinc-400">В этой категории пока нет товаров.</p>
      ) : null}
    </div>
  );
}
