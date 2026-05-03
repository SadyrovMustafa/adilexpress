import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatRub } from "@/lib/money";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/catalog" className="hover:text-amber-700 dark:hover:text-amber-400">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalog/${product.category.slug}`}
          className="hover:text-amber-700 dark:hover:text-amber-400"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">Нет фото</div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-amber-700 dark:text-amber-500">
            {product.category.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white">
            {formatRub(product.priceRub)}
          </p>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {product.inStock ? "В наличии" : "Нет в наличии — уточняйте срок поставки"}
          </p>

          {product.shortDesc ? (
            <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">{product.shortDesc}</p>
          ) : null}

          <div className="mt-8 space-y-4 text-zinc-600 dark:text-zinc-400">
            {product.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600"
            >
              Заказать / уточнить
            </Link>
            <Link
              href={`/catalog/${product.category.slug}`}
              className="inline-flex rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:border-amber-400 dark:border-zinc-600 dark:text-zinc-100"
            >
              Другие товары категории
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
