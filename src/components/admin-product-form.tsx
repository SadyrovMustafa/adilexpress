"use client";

import { useActionState } from "react";
import {
  createProductAction,
  updateProductAction,
} from "@/app/actions/admin-products";

type Category = { id: string; name: string };

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string | null;
  description: string;
  priceSom: number;
  imageUrl: string | null;
  categoryId: string;
  featured: boolean;
  inStock: boolean;
};

export function AdminProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const isEdit = Boolean(product);
  const action = isEdit
    ? updateProductAction.bind(null, product!.id)
    : createProductAction;

  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Название
          </label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Slug (латиница)
          </label>
          <input
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            defaultValue={product?.slug}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Цена, сом (KGS)
          </label>
          <input
            name="priceSom"
            type="number"
            required
            min={0}
            step={1}
            defaultValue={product?.priceSom}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Категория
          </label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          >
            <option value="">Выберите…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Кратко (под заголовком в карточке)
          </label>
          <input
            name="shortDesc"
            defaultValue={product?.shortDesc ?? ""}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Описание
          </label>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={product?.description}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            URL изображения
          </label>
          <input
            name="imageUrl"
            type="url"
            placeholder="https://…"
            defaultValue={product?.imageUrl ?? ""}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={product?.featured}
            className="size-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
          />
          Хит на главной
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            name="inStock"
            value="true"
            defaultChecked={product?.inStock ?? true}
            className="size-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
          />
          В наличии
        </label>
      </div>

      {state?.error ? (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{state.error}</p>
      ) : null}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          {pending ? "Сохранение…" : isEdit ? "Сохранить" : "Создать"}
        </button>
      </div>
    </form>
  );
}
