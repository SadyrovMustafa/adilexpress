"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  if (!(await isAdminSession())) {
    throw new Error("Unauthorized");
  }
}

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const shortDesc = String(formData.get("shortDesc") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim();
  const priceRub = Number(String(formData.get("priceRub") ?? "").replace(",", "."));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const featured = formData.has("featured");
  const inStock = formData.has("inStock");

  return {
    name,
    slug,
    shortDesc,
    description,
    priceRub,
    imageUrl,
    categoryId,
    featured,
    inStock,
  };
}

function validateProduct(data: ReturnType<typeof parseProductForm>): string | null {
  if (!data.name) return "Укажите название";
  if (!data.slug || !slugRe.test(data.slug)) return "Slug: только латиница, цифры и дефис";
  if (!data.description) return "Укажите описание";
  if (!Number.isFinite(data.priceRub) || data.priceRub < 0) return "Укажите цену в рублях";
  if (!data.categoryId) return "Выберите категорию";
  return null;
}

export async function createProductAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const data = parseProductForm(formData);
  const err = validateProduct(data);
  if (err) return { error: err };

  try {
    await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDesc: data.shortDesc,
        description: data.description,
        priceRub: Math.round(data.priceRub),
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        featured: data.featured,
        inStock: data.inStock,
      },
    });
  } catch (e: unknown) {
    const dup = e && typeof e === "object" && "code" in e && e.code === "P2002";
    if (dup) return { error: "Такой slug уже занят" };
    return { error: "Не удалось сохранить товар" };
  }

  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();
  const data = parseProductForm(formData);
  const err = validateProduct(data);
  if (err) return { error: err };

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        slug: data.slug,
        shortDesc: data.shortDesc,
        description: data.description,
        priceRub: Math.round(data.priceRub),
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        featured: data.featured,
        inStock: data.inStock,
      },
    });
  } catch (e: unknown) {
    const dup = e && typeof e === "object" && "code" in e && e.code === "P2002";
    if (dup) return { error: "Такой slug уже занят" };
    return { error: "Не удалось обновить товар" };
  }

  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
