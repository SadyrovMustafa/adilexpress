import Image from "next/image";
import Link from "next/link";
import { formatRub } from "@/lib/money";

export type ProductCardProduct = {
  slug: string;
  name: string;
  shortDesc: string | null;
  priceRub: number;
  imageUrl: string | null;
  inStock: boolean;
  category?: { name: string; slug: string };
};

export function ProductCard({ product }: { product: ProductCardProduct }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            Нет фото
          </div>
        )}
        {!product.inStock ? (
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/80 px-2 py-0.5 text-xs text-white">
            Нет в наличии
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category ? (
          <span className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-500">
            {product.category.name}
          </span>
        ) : null}
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 font-semibold text-zinc-900 hover:text-amber-700 dark:text-zinc-100 dark:hover:text-amber-400"
        >
          {product.name}
        </Link>
        {product.shortDesc ? (
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {product.shortDesc}
          </p>
        ) : null}
        <p className="mt-auto text-lg font-bold text-zinc-900 dark:text-white">
          {formatRub(product.priceRub)}
        </p>
      </div>
    </article>
  );
}
