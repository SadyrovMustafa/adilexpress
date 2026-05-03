import { AdminProductForm } from "@/components/admin-product-form";
import { prisma } from "@/lib/prisma";

export default async function AdminNewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Новый товар</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Slug — адрес в каталоге (латиница), например <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">filtr-masla</code>.
      </p>
      <div className="mt-10">
        <AdminProductForm categories={categories} />
      </div>
    </div>
  );
}
