import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const categories = [
  {
    slug: "zapchasti",
    name: "Запчасти",
    description: "Оригинальные и аналоги для легковых и грузовых авто.",
    sortOrder: 10,
  },
  {
    slug: "vetroviki",
    name: "Ветровики (дефлекторы окон)",
    description: "Комфорт в салоне без сквозняка, меньше шума на скорости.",
    sortOrder: 20,
  },
  {
    slug: "bryzgoviki",
    name: "Брызговики",
    description: "Защита кузова и соседей от грязи и камней.",
    sortOrder: 30,
  },
  {
    slug: "led-elektronika",
    name: "LED и электроника",
    description: "Мониторы, подсветка, дополнительный свет.",
    sortOrder: 40,
  },
  {
    slug: "aksessuary",
    name: "Аксессуары",
    description: "Коврики, органайзеры, мелочи для комфорта.",
    sortOrder: 50,
  },
];

const products: Array<{
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  priceSom: number;
  imageUrl: string | null;
  categorySlug: string;
  featured: boolean;
}> = [
  {
    slug: "filt-masla-universal",
    name: "Масляный фильтр универсальный",
    shortDesc: "Подходит для большинства популярных двигателей.",
    description:
      "Высокое качество фильтрации, корректная пропускная способность. Рекомендуем менять вместе с маслом по регламенту производителя авто.",
    priceSom: 890,
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    categorySlug: "zapchasti",
    featured: true,
  },
  {
    slug: "kolodki-perednie",
    name: "Тормозные колодки передние",
    shortDesc: "Тихая работа, стабильное торможение.",
    description:
      "Комплект передних колодок с антискрипными пластинами. Перед установкой рекомендуем проверить диски.",
    priceSom: 4200,
    imageUrl:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    categorySlug: "zapchasti",
    featured: true,
  },
  {
    slug: "vetroviki-komplekt",
    name: "Дефлекторы окон 4 шт.",
    shortDesc: "Акрил, крепление в канал стекла.",
    description:
      "Комплект ветровиков для передних и задних дверей. Уменьшают шум и попадание осадков при приоткрытом окне.",
    priceSom: 3100,
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    categorySlug: "vetroviki",
    featured: true,
  },
  {
    slug: "vetrovik-kapot",
    name: "Дефлектор капота (мухобойка)",
    shortDesc: "Защита ЛКП от сколов и насекомых.",
    description:
      "Установка на клипсах или двухсторонний скотч (в комплекте по модели). Подбирается под марку авто.",
    priceSom: 1890,
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    categorySlug: "vetroviki",
    featured: false,
  },
  {
    slug: "bryzgoviki-universal",
    name: "Брызговики универсальные 4 шт.",
    shortDesc: "Гибкий пластик, расширители арок.",
    description:
      "Универсальный комплект с крепежом. Можно подрезать под размер арки.",
    priceSom: 1450,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categorySlug: "bryzgoviki",
    featured: false,
  },
  {
    slug: "led-monitor-10",
    name: "LED-монитор на подголовник 10″",
    shortDesc: "HD, HDMI/USB, крепление на штангу.",
    description:
      "Автомобильный монитор для задних пассажиров. Поддержка файлов с флешки, вход для внешних устройств.",
    priceSom: 12900,
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    categorySlug: "led-elektronika",
    featured: true,
  },
  {
    slug: "led-lenta-interer",
    name: "LED-лента салона RGB",
    shortDesc: "Пульт, несколько режимов подсветки.",
    description:
      "Декоративная подсветка салона. Питание 12 В, установка под порогами или в ниши.",
    priceSom: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categorySlug: "led-elektronika",
    featured: false,
  },
  {
    slug: "kovrik-evro",
    name: "Коврики EVA в салон",
    shortDesc: "Ромб, легко моются, держат форму.",
    description:
      "Комплект ковриков по лекалам популярных моделей. Ячеистая структура удерживает влагу и грязь.",
    priceSom: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1507139953747-4f3c21656587?w=800&q=80",
    categorySlug: "aksessuary",
    featured: false,
  },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const catMap = new Map<string, string>();

  for (const c of categories) {
    const row = await prisma.category.create({ data: c });
    catMap.set(c.slug, row.id);
  }

  for (const p of products) {
    const categoryId = catMap.get(p.categorySlug);
    if (!categoryId) throw new Error(`Unknown category ${p.categorySlug}`);
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        shortDesc: p.shortDesc,
        description: p.description,
        priceSom: p.priceSom,
        imageUrl: p.imageUrl,
        featured: p.featured,
        categoryId,
      },
    });
  }

  console.log(
    "Seed OK:",
    categories.length,
    "categories,",
    products.length,
    "products",
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
