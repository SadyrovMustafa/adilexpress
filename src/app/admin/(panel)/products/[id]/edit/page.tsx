import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin-product-form";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Редактировать товар</h1>
      <p className="mt-2 font-mono text-sm text-zinc-500">{product.slug}</p>
      <div className="mt-10">
        <AdminProductForm
          categories={categories}
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            shortDesc: product.shortDesc,
            description: product.description,
            priceRub: product.priceRub,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId,
            featured: product.featured,
            inStock: product.inStock,
          }}
        />
      </div>
    </div>
  );
}
